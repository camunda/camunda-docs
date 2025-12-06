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

## Configuration

To use Microsoft Entra, complete the following steps:

1. [Ensure Entra prerequisites](#ensure-entra-prerequisites)
1. [Create applications in Entra](#create-applications-in-entra)
1. [Create secrets](#create-secrets)
1. [Configure components using OIDC](#configure-components-using-oidc)

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
1. (Optional) In **Token configuration**, [add the optional claim](https://learn.microsoft.com/en-us/entra/identity-platform/optional-claims?tabs=appui) `preferred_username`. This lets you map a Camunda user ID to your users’ email addresses.
   If you do not configure `preferred_username`, update later steps in this guide to use a different claim that uniquely identifies your users.

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
  --from-literal=identity-postgresql-admin-password=CHANGE_ME \
  --from-literal=identity-postgresql-user-password=CHANGE_ME \
  --from-literal=webmodeler-postgresql-admin-password=CHANGE_ME \
  --from-literal=webmodeler-postgresql-user-password=CHANGE_ME
```

Unlike the OIDC client secrets, these passwords initialize the component databases.
You can choose any values.

This secret includes the following keys:

- `identity-postgresql-admin-password`: Password for the administrative PostgreSQL account used by Management Identity (`postgres`).
- `identity-postgresql-user-password`: Password for the non-privileged PostgreSQL account used by Management Identity (`bn_keycloak`).
- `literal=webmodeler-postgresql-admin-password`: Password for the administrative PostgreSQL account used by Web Modeler (`postgres`).
- `webmodeler-postgresql-user-password` Password for the non-privileged PostgreSQL account used by Web Modeler (`web-modeler`).

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
```

Replace `<OC_URL>` with the base URL of the Orchestration Cluster as it will be reachable from your users’ browsers.
For local deployment, this is `http://localhost:8080`.

`usernameClaim` defines which claim in the access token identifies the user.
`clientIdClaim` defines which claim identifies the calling client.
By default:

- `preferred_username` carries the user’s email address.
- `azp` carries the client ID in Entra.

You can adjust these values if your organization uses different claim mappings.
For more information, see the [Orchestration Cluster OIDC configuration guide](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md#step-1-configure-the-oidc-client-id-claim).

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
        redirectUrl: "<IDENTITY_URL>"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "identity-client-secret"

identity:
  enabled: true

identityPostgresql:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    secretKeys:
      adminPasswordKey: "identity-postgresql-admin-password"
      userPasswordKey: "identity-postgresql-admin-password"
```

Replace `<IDENTITY_URL>` with the base URL of Management Identity as it will be reachable from your users' browser. For local deployment, use `http://localhost:8084`.

- `initialClaimName` defines which claim in the access token identifies the initial administrative user.
- `initialClaimValue` defines the value of that claim that grants administrative access to Management Identity.

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

webModelerPostgresql:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    secretKeys:
      adminPasswordKey: "webmodeler-postgresql-admin-password"
      userPasswordKey: "webmodeler-postgresql-user-password"
```

Replace `<WEB_MODELER_URL>` with the base URL of Web Modeler as it will be reachable from your users' browser. For local deployment, use `http://localhost:8070`.

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

The following example shows a full configuration to enable Microsoft Entra:

```yaml
global:
  elasticsearch:
    enabled: true
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
        redirectUrl: "<IDENTITY_URL>"
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

identityPostgresql:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    secretKeys:
      adminPasswordKey: "identity-postgresql-admin-password"
      userPasswordKey: "identity-postgresql-admin-password"

optimize:
  enabled: true

webModeler:
  enabled: true
  restapi:
    mail:
      fromAddress: noreply@example.com

webModelerPostgresql:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    secretKeys:
      adminPasswordKey: "webmodeler-postgresql-admin-password"
      userPasswordKey: "webmodeler-postgresql-user-password"

console:
  enabled: true

elasticsearch:
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
kubectl port-forward svc/camunda-web-modeler-webapp 8070:80
kubectl port-forward svc/camunda-web-modeler-websockets 8085:80

# Console
kubectl port-forward svc/camunda-console 8087:80
```

Once port forwarding is active, access each component through `http://localhost:<port>`.
For example:

- Orchestration Cluster: `http://localhost:8080` (redirects you to Entra for login)
- Management Identity: `http://localhost:8084`
- Console: `http://localhost:8087`

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
