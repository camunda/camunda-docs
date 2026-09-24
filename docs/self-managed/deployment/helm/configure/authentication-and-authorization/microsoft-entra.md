---
id: microsoft-entra
sidebar_label: Microsoft Entra
title: Set up the Helm chart with an external Microsoft Entra tenant
description: Learn how to connect the Camunda Helm chart to a Microsoft Entra tenant.
---

This guide shows you how to configure the Helm chart to use a Microsoft Entra tenant, with each Camunda component using a dedicated OIDC or OAuth client.

## Prerequisites

Before you begin, ensure you have:

- Access to a Microsoft Entra tenant with permission to create applications and app registrations
- The ID of your tenant
- An understanding of the structure and claims of access tokens in Entra
- When you connect Management Identity to an OIDC provider, you need a database regardless of feature flags. This guide uses the chart's bundled PostgreSQL instance (`identityPostgresql`), so you don't need a separate database. To use an external database, see [use external PostgreSQL](/self-managed/deployment/helm/configure/database/using-existing-postgres.md).

## Configuration

To use Microsoft Entra, complete the following steps:

1. [Ensure Entra prerequisites](#ensure-entra-prerequisites)
1. [Create applications in Entra](#create-applications-in-entra)
1. [Create secrets](#create-secrets)
1. [Configure components using OIDC](#configure-components-using-oidc)
1. [Configure machine-to-machine (M2M) API access](#configure-machine-to-machine-m2m-api-access)

See the [full configuration example](#full-configuration-example) for the complete setup.

### Ensure Entra prerequisites

For authentication, the Camunda components use the following scopes:
`email`, `openid`, `offline_access`, `profile`, and `<CLIENT_UUID>/.default`.

:::tip Optional scopes
The `offline_access` scope is optional.

If this scope is included, your OIDC provider issues a refresh token to Camunda components on user login. The components use the refresh token to renew the user's access token when it expires, so that sessions remain active without requiring the user to log in again.

If `offline_access` is not included, users will be redirected to the OIDC provider for re-authentication whenever their access token expires. For more information, see the [OpenID Connect Core specification](https://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess).
:::

To allow users to successfully authenticate with Entra ID, you must either configure an [admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow) or grant consent on behalf of your users using [admin consent](https://learn.microsoft.com/en-gb/entra/identity/enterprise-apps/user-admin-consent-overview#admin-consent).

The applications you configure in this guide must support the following `grant_type` values:

- To create an M2M token: `client_credentials` (response contains an access token)
- To renew a token using a refresh token: `refresh_token`
- To create a token via authorization code flow: `authorization_code` (response contains access and refresh tokens)

These grant types are enabled by default, but they may be restricted by custom policies in your organization.

### Create applications in Entra

Before configuring Camunda, create the following app registrations that map to Camunda components.

Application type **Web**:

- Management Identity (`<mgmt-identity-app>`)
- Orchestration Cluster (`<oc-app>`)
- Optimize (`<optimize-app>`)
- Web Modeler API (`<web-modeler-api-app>`)

Application type **Single-page application**:

- Console (`<console-app>`)
- Web Modeler UI (`<web-modeler-ui-app>`)

Register these as six separate applications. Camunda uses each application's client ID as that component's audience, so two components sharing a registration also share an audience, and a token issued for one is accepted by the other. Entra issues the same tenant-scoped `iss` claim for every application in your tenant, which makes the audience the only value that distinguishes one component from another.

For **each** of the components above:

1. In the Entra ID admin center, [register the application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).
1. On the application's **Overview** page, note the **Client ID**.
1. In the app registration, [configure a platform](https://learn.microsoft.com/en-gb/entra/identity-platform/quickstart-register-app#configure-platform-settings) that matches the component:
   - **Web**: Management Identity, Orchestration Cluster, Optimize, Web Modeler API
   - **Single-page application**: Console, Web Modeler UI
1. Add the component's redirect URI from [the table below](#redirect-uris-per-camunda-component).

   :::note
   Redirect URIs are an allowlist. Only the URIs you define are permitted as redirection targets after authentication. This ensures that tokens and authorization codes are only sent to approved destinations.
   :::

1. For app registrations of type **Web**, [create a new client secret](https://learn.microsoft.com/en-gb/entra/identity-platform/quickstart-register-app?tabs=client-secret#add-credentials), and record the secret **value**. You do not need the secret ID.
1. Enable the Entra `v2.0` API by opening the application's [manifest](https://learn.microsoft.com/en-us/entra/identity-platform/reference-microsoft-graph-app-manifest#configure-the-app-manifest-in-the-microsoft-entra-admin-center) and setting the [`requestedAccessTokenVersion`](https://learn.microsoft.com/en-us/entra/identity-platform/reference-microsoft-graph-app-manifest#api-attribute) property under `api` to `2`:
   ```json
   api: {
     ...
     "requestedAccessTokenVersion": 2,
     ...
   }
   ```
1. In **Token configuration**, [add the optional claim](https://learn.microsoft.com/en-us/entra/identity-platform/optional-claims?tabs=appui) `preferred_username` to **both** the access token and the ID token. Entra labels this claim optional, but Camunda requires it.

   Management Identity reads user claims directly from the access token rather than from a userinfo call. If `preferred_username` is missing from the access token, Management Identity finds no matching claim and grants no roles. The user authenticates successfully, then immediately sees a `403 unauthorized` error, and users appear in Operate and Tasklist with an opaque identifier instead of their name.

   To use a different claim that uniquely identifies your users, see [Configure Management Identity](#configure-management-identity). Whichever claim you choose, add it as an optional claim on both token types, since Entra doesn't include it by default.

#### Redirect URIs per Camunda component

| Component             | Redirect URI for the Entra app registration  | Redirect URI for local deployment                   |
| --------------------- | -------------------------------------------- | --------------------------------------------------- |
| Management Identity   | `<IDENTITY_URL>/auth/login-callback`         | `http://localhost:8084/auth/login-callback`         |
| Orchestration Cluster | `<OC_URL>/sso-callback`                      | `http://localhost:8080/sso-callback`                |
| Optimize              | `<OPTIMIZE_URL>/api/authentication/callback` | `http://localhost:8083/api/authentication/callback` |
| Web Modeler UI        | `<WEB_MODELER_URL>/login-callback`           | `http://localhost:8070/login-callback`              |
| Console               | `<CONSOLE_URL>/`                             | `http://localhost:8087/`                            |

Replace each `*_URL` placeholder with the base URL (in the format `<protocol>://<host/ip>:<port>/<context-path>`) that will be accessible from your users’ browsers.
If you plan to expose the services only on `localhost` (as described later in this guide), you can use the URIs in the local deployment column directly.

### Create secrets

Create two secrets in your Kubernetes namespace.

First, create a secret that contains all OIDC client secrets:

```
kubectl create secret generic entra-credentials \
  --from-literal=identity-client-secret="<mgmt-identity-app-secret>" \
  --from-literal=orchestration-cluster-client-secret="<oc-app-secret>" \
  --from-literal=optimize-client-secret="<optimize-application-secret>" \
  --from-literal=webmodeler-api-client-secret="<web-modeler-api-app-secret>"
```

:::info
In Microsoft Entra, the term _application secret_ is used.
In Camunda configuration, this value is referred to as a _client secret_ to align with OIDC/OAuth standards.
:::

:::info
The secret key `webmodeler-api-client-secret` is not used elsewhere in this guide. This client is intended for your own use if you want to access the [Web Modeler API](/apis-tools/web-modeler-api/authentication.md) programmatically.
:::

Next, create a secret with the remaining credentials for the Camunda Helm chart:

```
kubectl create secret generic camunda-credentials \
  --from-literal=identity-postgresql-password=CHANGE_ME \
  --from-literal=webmodeler-postgresql-password=CHANGE_ME
```

Unlike the OIDC client secrets, these passwords authenticate each component against its external PostgreSQL database, so each value must match the password of the database user you created.

This secret includes the following keys:

- `identity-postgresql-password`: Password for the PostgreSQL user that Management Identity connects as.
- `webmodeler-postgresql-password`: Password for the PostgreSQL user that Web Modeler connects as.

Management Identity and Web Modeler each require an externally managed PostgreSQL database. Create the `management-identity` and `web-modeler` databases, along with their users, before you deploy. See [Use external PostgreSQL](../database/using-existing-postgres.md).

For additional options on how to create and reference Kubernetes secrets (for example using YAML manifests or consolidated secrets), see [External Kubernetes secrets](/self-managed/deployment/helm/configure/secret-management.md#method-2-external-kubernetes-secrets-recommended-for-all-versions).

### Configure components using OIDC

With the OIDC clients and cluster secrets in place, configure OAuth and OIDC for the components. You can skip components you don’t plan to run. Keep in mind that the Orchestration Cluster and Connectors are enabled by default, so you must explicitly disable them if not needed.

#### Global configuration

Start with the following global configuration, which provides defaults for all components:

```yaml
global:
  identity:
    auth:
      enabled: true
      issuer: https://login.microsoftonline.com/<tenant id>/v2.0
      issuerBackendUrl: https://login.microsoftonline.com/<tenant id>/v2.0
      authUrl: https://login.microsoftonline.com/<tenant id>/oauth2/v2.0/authorize
      tokenUrl: https://login.microsoftonline.com/<tenant id>/oauth2/v2.0/token
      jwksUrl: https://login.microsoftonline.com/<tenant id>/discovery/v2.0/keys
      type: "MICROSOFT"
  security:
    authentication:
      method: oidc
```

Replace `<tenant id>` with your Microsoft Entra tenant ID.
You’ll use this convention throughout the rest of this guide.

#### Configure Orchestration Cluster

Add the following configuration for the Orchestration Cluster:

```yaml
orchestration:
  security:
    authentication:
      oidc:
        clientId: "<oc-app-id>"
        audience: "<oc-app-id>"
        usernameClaim: preferred_username
        clientIdClaim: azp
        preferUsernameClaim: true
        redirectUrl: "<OC_URL>"
        scope:
          - openid
          - profile
          - offline_access
          - "<oc-app-id>/.default"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "orchestration-cluster-client-secret"
    initialization:
      defaultRoles:
        admin:
          users:
            - "<the email address of your initial admin user>"
        connectors:
          clients:
            - "<oc-app-id>"
  env:
    - name: CAMUNDA_SECURITY_AUTHENTICATION_OIDC_USER_INFO_ENABLED
      value: "false"
    - name: SERVER_MAX_HTTP_REQUEST_HEADER_SIZE
      value: "65536"
```

Replace `<OC_URL>` with the base URL of the Orchestration Cluster as it will be reachable from your users’ browsers.
For local deployment, this is `http://localhost:8080`.

The two environment variables above are both required with Entra. Neither has a dedicated Helm value, so both are passed through `orchestration.env` as Spring Boot properties (`camunda.security.authentication.oidc.user-info-enabled` and `server.max-http-request-header-size`).

`CAMUNDA_SECURITY_AUTHENTICATION_OIDC_USER_INFO_ENABLED` must be `false`. By default, the Orchestration Cluster calls the OIDC userinfo endpoint after authentication to augment token claims. Entra hosts its userinfo endpoint on Microsoft Graph (`graph.microsoft.com/oidc/userinfo`) rather than on the authorization server, and it requires a Graph API access token instead of the OIDC access token Camunda holds, so the call fails. Setting this variable to `false` tells the Orchestration Cluster to rely on the claims already present in the token. This is also Microsoft's recommendation, since the ID token is a superset of what userinfo returns.

`SERVER_MAX_HTTP_REQUEST_HEADER_SIZE` raises the maximum header size to 64 KB. Microsoft's authorization codes are longer than those issued by most other providers. Combined with session cookies from an existing session, the total HTTP header size can exceed Tomcat's 8 KB default, which causes a plain Tomcat HTTP 400 error page before Spring Security processes the request. See [Request header is too large](./troubleshooting-oidc.md#request-header-is-too-large) if you hit this after deploying.

`usernameClaim` defines which claim in the access token identifies the user.
`clientIdClaim` defines which claim identifies the calling client.
By default:

- `preferred_username` carries the user’s email address.
- `azp` carries the client ID in Entra.

You can adjust these values if your organization uses different claim mappings.
For more information, see the [Orchestration Cluster OIDC configuration guide](/self-managed/components/orchestration-cluster/admin/connect-external-identity-provider.md#step-1-configure-the-oidc-client-id-claim).

:::note Username display in Web Modeler (Helm)
With Helm defaults, usernames are typically resolved from `preferred_username`. If you want Web Modeler to use the `name` claim instead (for example, to show display names), set `CAMUNDA_MODELER_OAUTH2_TOKEN_USERNAMECLAIM=name` for the Web Modeler `restapi` environment.

See [Identity/Keycloak configuration](/self-managed/components/hub/configuration/properties.md#identity--keycloak-1).
:::

#### Configure Connectors

Add the following configuration for Connectors:

```yaml
connectors:
  security:
    authentication:
      oidc:
        clientId: "<oc-app-id>"
        audience: "<oc-app-id>"
        tokenScope: "<oc-app-id>/.default"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "orchestration-cluster-client-secret"
```

#### Configure Management Identity

Add the following configuration for Management Identity:

```yaml
global:
  identity:
    auth:
      identity:
        clientId: "<mgmt-identity-app-id>"
        audience: "<mgmt-identity-app-id>"
        initialClaimName: preferred_username
        initialClaimValue: "<the email address of your initial admin user>"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "identity-client-secret"

identity:
  enabled: true
  externalDatabase:
    enabled: true
    host: "<postgres-host>"
    port: 5432
    database: "management-identity"
    username: "<postgres-username>"
    secret:
      existingSecret: "camunda-credentials"
      existingSecretKey: "identity-postgresql-password"
```

Replace `<IDENTITY_URL>` with the base URL of Management Identity as it will be reachable from your users' browser. For local deployment, use `http://localhost:8084`.

Management Identity requires an externally managed PostgreSQL database. Create the `management-identity` database before deploying, and store its password in the `camunda-credentials` secret. For the full parameter list, see [Use external PostgreSQL](../database/using-existing-postgres.md).

- `initialClaimName` defines which claim in the access token identifies the initial administrative user.
- `initialClaimValue` defines the value of that claim that grants administrative access to Management Identity.

Choose the claim based on whether you value readability or stability:

| Claim                | Trade-off                                                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `preferred_username` | The user's UPN. Readable and self-documenting, which makes it easy to work with during initial setup. Requires the optional claim to be added. |
| `oid`                | The user's Entra Object ID. Always present without optional claim configuration, and unchanged if the user's email address changes.            |

Because `initialClaimValue` is applied only on first startup and can't be updated through Helm afterward, `oid` is the more stable choice for production.

:::danger
Once configured, the initial claim name and value cannot be changed using environment variables or Helm values.
To update them, modify the Identity PostgreSQL database directly.
:::

:::tip
If Optimize is not enabled, add the following environment variable to ensure Management Identity starts successfully:

```
identity:
  env:
    - name: CAMUNDA_IDENTITY_AUDIENCE
      value: "<mgmt-identity-app-id>"
```

:::

#### Configure Optimize

Add the following configuration for Optimize:

```yaml
global:
  identity:
    auth:
      optimize:
        clientId: "<optimize-app-id>"
        audience: "<optimize-app-id>"
        redirectUrl: "<OPTIMIZE_URL>"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "optimize-client-secret"

optimize:
  enabled: true
```

Replace `<OPTIMIZE_URL>` with the base URL of Optimize as it will be reachable from your users' browser. For local deployment, use `http://localhost:8083`.

#### Configure Web Modeler

Add the following configuration for Web Modeler:

:::note
If you want Web Modeler to resolve usernames from the `name` claim instead of `preferred_username`, add `CAMUNDA_MODELER_OAUTH2_TOKEN_USERNAMECLAIM=name` to the Web Modeler `restapi` environment configuration.
:::

```yaml
global:
  identity:
    auth:
      webModeler:
        clientId: "<web-modeler-ui-app-id>"
        clientApiAudience: "<web-modeler-ui-app-id>"
        publicApiAudience: "<web-modeler-api-app-id>"
        redirectUrl: "<WEB_MODELER_URL>"

webModeler:
  enabled: true
  restapi:
    mail:
      fromAddress: noreply@example.com

camundaHub:
  restapi:
    externalDatabase:
      url: "jdbc:postgresql://<postgres-host>:5432/web-modeler"
      username: "<postgres-username>"
      secret:
        existingSecret: "camunda-credentials"
        existingSecretKey: "webmodeler-postgresql-password"
```

Replace `<WEB_MODELER_URL>` with the base URL of Web Modeler as it will be reachable from your users' browser. For local deployment, use `http://localhost:8070`.

Web Modeler requires an externally managed PostgreSQL database, configured under `camundaHub.restapi.externalDatabase`. Create the `web-modeler` database before deploying. For the full parameter list, see [Use external PostgreSQL](../database/using-existing-postgres.md).

You can update `webModeler.restapi.mail.fromAddress` with an address suitable for your environment.
This address appears as the sender in emails sent by Web Modeler.
For more details on configuring email delivery, see the [Web Modeler section in Enable additional Camunda components](../enable-additional-components.md#web-modeler).

#### Configure Console

Add the following configuration for Console:

```yaml
global:
  identity:
    auth:
      console:
        clientId: "<console-app-id>"
        audience: "<console-app-id>"
        redirectUrl: "http://localhost:8087"

console:
  enabled: true
```

### Full configuration example

The following example shows a full configuration to enable Microsoft Entra with an externally managed Elasticsearch cluster. Replace `<elasticsearch-host>` with the hostname of your cluster.

```yaml
global:
  identity:
    auth:
      enabled: true
      issuer: https://login.microsoftonline.com/<tenant id>/v2.0
      issuerBackendUrl: https://login.microsoftonline.com/<tenant id>/v2.0
      authUrl: https://login.microsoftonline.com/<tenant id>/oauth2/v2.0/authorize
      tokenUrl: https://login.microsoftonline.com/<tenant id>/oauth2/v2.0/token
      jwksUrl: https://login.microsoftonline.com/<tenant id>/discovery/v2.0/keys
      type: "MICROSOFT"
      identity:
        clientId: "<mgmt-identity-app-id>"
        audience: "<mgmt-identity-app-id>"
        initialClaimName: preferred_username
        initialClaimValue: "<the email address of your initial admin user>"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "identity-client-secret"
      optimize:
        clientId: "<optimize-app-id>"
        audience: "<optimize-app-id>"
        redirectUrl: "<OPTIMIZE_URL>"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "optimize-client-secret"
      webModeler:
        clientId: "<web-modeler-ui-app-id>"
        clientApiAudience: "<web-modeler-ui-app-id>"
        publicApiAudience: "<web-modeler-api-app-id>"
        redirectUrl: "<WEB_MODELER_URL>"
      console:
        clientId: "<console-app-id>"
        audience: "<console-app-id>"
        redirectUrl: "http://localhost:8087"
  security:
    authentication:
      method: oidc

orchestration:
  data:
    secondaryStorage:
      type: elasticsearch
      elasticsearch:
        url: "https://<elasticsearch-host>:9200"
  security:
    authentication:
      oidc:
        clientId: "<oc-app-id>"
        audience: "<oc-app-id>"
        usernameClaim: preferred_username
        clientIdClaim: azp
        preferUsernameClaim: true
        redirectUrl: "<OC_URL>"
        scope:
          - openid
          - profile
          - offline_access
          - "<oc-app-id>/.default"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "orchestration-cluster-client-secret"
    initialization:
      defaultRoles:
        admin:
          users:
            - "<the email address of your initial admin user>"
        connectors:
          clients:
            - "<oc-app-id>"
  env:
    - name: CAMUNDA_SECURITY_AUTHENTICATION_OIDC_USER_INFO_ENABLED
      value: "false"
    - name: SERVER_MAX_HTTP_REQUEST_HEADER_SIZE
      value: "65536"

connectors:
  security:
    authentication:
      oidc:
        clientId: "<oc-app-id>"
        audience: "<oc-app-id>"
        tokenScope: "<oc-app-id>/.default"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "orchestration-cluster-client-secret"

identity:
  enabled: true
  externalDatabase:
    enabled: true
    host: "<postgres-host>"
    port: 5432
    database: "management-identity"
    username: "<postgres-username>"
    secret:
      existingSecret: "camunda-credentials"
      existingSecretKey: "identity-postgresql-password"

optimize:
  enabled: true
  database:
    elasticsearch:
      enabled: true
      external: true
      url:
        protocol: https
        host: "<elasticsearch-host>"
        port: 9200

webModeler:
  enabled: true
  restapi:
    mail:
      fromAddress: noreply@example.com

camundaHub:
  restapi:
    externalDatabase:
      url: "jdbc:postgresql://<postgres-host>:5432/web-modeler"
      username: "<postgres-username>"
      secret:
        existingSecret: "camunda-credentials"
        existingSecretKey: "webmodeler-postgresql-password"

console:
  enabled: true
```

### Connect to the cluster

After applying this configuration, use the following `kubectl port-forward` commands to access the APIs and UIs from your localhost:

```bash
# Management Identity
kubectl port-forward svc/camunda-identity 8084:80

# Orchestration Cluster
kubectl port-forward svc/camunda-zeebe-gateway 8080:8080
kubectl port-forward svc/camunda-zeebe-gateway 26500:26500

# Connectors
kubectl port-forward svc/camunda-connectors 8086:8080

# Optimize
kubectl port-forward svc/camunda-optimize 8083:80

# Web Modeler
kubectl port-forward svc/camunda-web-modeler-restapi 8070:80
kubectl port-forward svc/camunda-web-modeler-websockets 8085:80

# Console
kubectl port-forward svc/camunda-console 8087:80
```

Once port forwarding is active, access each component through `http://localhost:<port>`.
For example:

- Orchestration Cluster: `http://localhost:8080` (redirects you to Entra for login)
- Management Identity: `http://localhost:8084`
- Console: `http://localhost:8087`

## Configure machine-to-machine (M2M) API access

Job workers, Connectors, and other applications that call the Orchestration Cluster REST or gRPC API without a user present use the OAuth client credentials grant instead of interactive login.

In this section, you register a dedicated Entra application for M2M access and configure a Camunda client to use it.

For the general, provider-agnostic explanation of this flow, see [machine-to-machine (M2M) API access](/self-managed/components/orchestration-cluster/admin/connect-external-identity-provider.md#machine-to-machine-m2m-api-access).

### Register an M2M application in Entra

1. In the Entra ID admin center, [register a new application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) for your job worker or Connector. You do not need to configure a redirect URI or a platform type, since this application never redirects a user's browser.
1. On the application's **Overview** page, note the **Client ID**. This value is your M2M client's `clientId`.
1. [Create a new client secret](https://learn.microsoft.com/en-gb/entra/identity-platform/quickstart-register-app?tabs=client-secret#add-credentials) and record the secret **value**.
1. Confirm the application supports the `client_credentials` grant type. This is enabled by default; see [Ensure Entra prerequisites](#ensure-entra-prerequisites).
1. Grant the application access to the Orchestration Cluster API. Reuse the `<oc-app-id>/.default` scope from the Orchestration Cluster app registration, or [expose an API permission](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-expose-web-apis) specific to your M2M client and grant admin consent for it.

### Configure the Camunda client

Configure your job worker, Connector runtime, or custom application to request tokens from Entra using client credentials. Camunda clients (the Java client, the Spring Boot starter, and the Connector runtime) read these settings from `CAMUNDA_CLIENT_AUTH_*` environment variables or the equivalent `camunda.client.auth.*` properties:

```
CAMUNDA_CLIENT_AUTH_METHOD=oidc
CAMUNDA_CLIENT_AUTH_CLIENTID=<m2m-app-id>
CAMUNDA_CLIENT_AUTH_CLIENTSECRET=<m2m-app-secret>
CAMUNDA_CLIENT_AUTH_TOKENURL=https://login.microsoftonline.com/<tenant id>/oauth2/v2.0/token
CAMUNDA_CLIENT_AUTH_AUDIENCE=<oc-app-id>
CAMUNDA_CLIENT_AUTH_SCOPE=<oc-app-id>/.default
```

```yaml
camunda:
  client:
    auth:
      method: oidc
      client-id: <m2m-app-id>
      client-secret: <m2m-app-secret>
      token-url: https://login.microsoftonline.com/<tenant id>/oauth2/v2.0/token
      audience: <oc-app-id>
      scope: <oc-app-id>/.default
```

Replace `<oc-app-id>` with the Orchestration Cluster application's client ID from [Create applications in Entra](#create-applications-in-entra), and `<tenant id>` with your Microsoft Entra tenant ID.

:::note
For the client credentials flow, request the `<oc-app-id>/.default` scope. This tells Entra to issue a token for the statically configured application permissions on the API rather than the delegated permissions used during interactive login.
:::

The Orchestration Cluster identifies this client using the `azp` claim, configured as `clientIdClaim: azp` in [Configure Orchestration Cluster](#configure-orchestration-cluster). By default, requests from this client can only retrieve the cluster topology. To grant it access to other APIs, [configure authorizations](/components/concepts/access-control/authorizations.md) for its client ID.

## Troubleshooting

For issues common to any OIDC provider (invalid redirect URI, audience mismatch, missing claims, pods not starting), see [Troubleshoot OIDC authentication](./troubleshooting-oidc.md). The following are specific to Microsoft Entra:

**`AADSTS700016: Application not found in the directory`**
The `clientId` in your Helm values doesn't match a registered application in your tenant. Verify each `clientId` exactly matches the **Application (client) ID** on the app registration's **Overview** page, and that the app is registered in the tenant identified by your `<tenant id>`.

**`AADSTS50011: Redirect URI mismatch`**
The redirect URI Camunda sent doesn't match any URI registered for that app. Verify `redirectUrl` in your Helm configuration exactly matches the redirect URI configured in Entra, including the path suffix, for example `/auth/login-callback` or `/sso-callback`.

**`401` with `jwt issuer invalid` or `"The iss claim is not valid"`**
The app registration is issuing v1.0 tokens (issuer `https://sts.windows.net/...`) instead of v2.0 tokens (issuer `https://login.microsoftonline.com/.../v2.0`). Confirm `api.requestedAccessTokenVersion` is set to `2` in the app's manifest (see [Create applications in Entra](#create-applications-in-entra)). This applies to all app registrations, including single-page applications.

**Service-to-service `401` with `clientId claim could not be found`**
If Connectors or another machine-to-machine caller gets this error, verify `clientIdClaim: azp` is set for the Orchestration Cluster. The bare-GUID scope format (`<oc-app-id>/.default`) causes Entra to issue v2.0 tokens, which carry the calling client's ID in `azp` rather than the `appid` claim used by v1.0 tokens.

## Grant access to components

After deployment, you must configure access for the following components.

To grant a user access to the Web Modeler UI:

- [Create a mapping rule in Management Identity](/self-managed/components/management-identity/mapping-rules.md#add-a-mapping-rule) for the `Web Modeler` role that matches the user’s access token.

To grant a client access to the Web Modeler API:

- [Create a role in Management Identity](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md#add-a-role) for the Web Modeler API.
- [Assign Web Modeler API permissions](/self-managed/components/management-identity/access-management/manage-permissions.md#manage-role-permissions) to that role in Management Identity.
- [Create a mapping rule in Management Identity](/self-managed/components/management-identity/mapping-rules.md#add-a-mapping-rule) for that role that matches the client’s access token.

To grant a user access to Optimize:

- [Create a mapping rule in Management Identity](/self-managed/components/management-identity/mapping-rules.md#add-a-mapping-rule) for the `Optimize` role that matches the user’s access token.

:::info
When using an OIDC provider, the following Optimize features are not currently available:

- The **User permissions** tab in collections
- The **Alerts** tab in collections
- Digests
- Accessible user names for resource owners (the value of the `sub` claim is displayed instead).
  :::
