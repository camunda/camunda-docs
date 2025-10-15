---
id: microsoft-entra
sidebar_label: Microsoft Entra
title: Helm chart setup with an external Microsoft Entra tenant
description: "Learn how to set up the Helm Chart so that it connects to a Microsoft Entra tenant"
---

This guide shows you how you can set up the Helm Chart against a Microsoft Entra tenant, configuring all components with dedicated OIDC/OAuth clients.

## Prerequisites

To use this guide, make sure you are have the following:

- Access to a Microsoft Entra tenant with the ability to create applications and app registrations
- The ID of your tenant
- Knowledge of the structure and claims of access tokens in Entra

## Configuration

To use Microsoft Entra, you need to perform the following steps:

1. [Create applications in Entra](#create-applications-in-entra)
1. [Create secrets](#create-secrets)
1. [Configure components using OIDC](#configure-components-using-oidc)

Jump to the [full configuration example](#full-configuration-example) to see it all at once.

### Create applications in Entra

As a prerequisite to configuring Camunda, create the following app registrations matching the Camunda components:

Application type _Web_:

- Management Identity (in the following code examples referred to as `<mgmt-identity-app>`)
- Orchestration Cluster (`<oc-app>`)
- Optimize (`<optimize-app>`)
- Web Modeler API (`<web-modeler-api-app>`)

Application type _Single-page application_:

- Console (`<console-app>`)
- Web Modeler UI (`<web-modeler-ui-app>`)

For **each** of the components above, follow these steps:

1. Within the Entra ID admin center, [register the application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
2. Navigate to the new application's **Overview** page, and make note of the **Client ID**.
3. Within the new app registration, [configure a platform](https://learn.microsoft.com/en-gb/entra/identity-platform/quickstart-register-app#configure-platform-settings) for the appropriate component:
   - **Web**: Management Identity, Orchestration Cluster, Optimize, Web Modeler API
   - **Single-page application**: Console, Web Modeler UI
4. Add the Camunda component's redirect URI that you can find in [the table below](#redirect-uris-per-camunda-component).
   :::note
   Redirect URIs serve as an approved list of destinations across identity providers. Only the URLs specified in the redirect URIs configuration will be permitted as valid redirection targets for authentication responses. This security measure ensures that tokens and authorization codes are only sent to pre-approved locations, preventing potential unauthorized access or token theft.
   :::
5. If it is an app registration of type _Web_, [create a new client secret](https://learn.microsoft.com/en-gb/entra/identity-platform/quickstart-register-app?tabs=client-secret#add-credentials), and note the new secret's value for later use. The secret ID is not needed, only the secret value is required.
6. Enable Entra's `v2.0` API by navigating to [the app registration's mainfest](https://learn.microsoft.com/en-us/entra/identity-platform/reference-microsoft-graph-app-manifest#configure-the-app-manifest-in-the-microsoft-entra-admin-center) and setting the [requestedAccessTokenVersion](https://learn.microsoft.com/en-us/entra/identity-platform/reference-microsoft-graph-app-manifest#api-attribute) property under `api:` to `2`:
   ```json
   api: {
     ...
     "requestedAccessTokenVersion": 2,
     ...
   }
   ```
7. Optional: Navigate to the app registration's **Token configuration** section and [configure an optional claim](https://learn.microsoft.com/en-us/entra/identity-platform/optional-claims?tabs=appui) for `preferred_username`. This enables you to map a user ID in Camunda to your users' email addresses. If you choose to not configure the `preferred_username` claim, make sure to replace it in the following sections of this guide with another claim that appropriately identifies your users.

#### Redirect URIs per Camunda component

| Component             | Redirect URI for the Entra app registration  | Redirect URI for local deployment                   |
| --------------------- | -------------------------------------------- | --------------------------------------------------- |
| Management Identity   | `<IDENTITY_URL>/auth/login-callback`         | `http://localhost:8084/auth/login-callback`         |
| Orchestration Cluster | `<OC_URL>/sso-callback`                      | `http://localhost:8080/sso-callback`                |
| Optimize              | `<OPTIMIZE_URL>/api/authentication/callback` | `http://localhost:8083/api/authentication/callback` |
| Web Modeler UI        | `<WEB_MODELER_URL>/login-callback`           | `http://localhost:8070/login-callback`              |
| Console               | `<CONSOLE_URL>/`                             | `http://localhost:8087/`                            |

Replace the components' `*_URL` placeholders with the base URLs that they will be accessible from your users' browsers. If you want to expose the services on localhost (as described in the rest of this guide), you can directly use the URIs for local deployment on the right side.

### Create secrets

Create two secrets in your Kubernetes namespace.

First, a secret that contains all your OIDC client secrets:

```
kubectl create secret generic entra-credentials \
  --from-literal=identity-client-secret="<mgmt-identity-app-secret>" \
  --from-literal=orchestration-cluster-client-secret="<oc-app-secret>" \
  --from-literal=optimize-client-secret="<optimize-application-secret>" \
  --from-literal=webmodeler-api-client-secret="<web-modeler-api-app-secret>"
```

:::info
Note how here we are changing the naming from _application secret_ to _client secret_. While in Microsoft Entra, the term of choice is _application_, in the Camunda components we use the OIDC/OAuth standard term _client_.
:::

:::info
The secret key `webmodeler-api-client-secret` is not used throughout the rest of this guide. The Web Modeler API client is for your own use if you want to access the [Web Modeler API](/apis-tools/web-modeler-api/authentication.md) programmatically.
:::

Next, create a secret with the remaining credentials for the Camunda Helm Chart:

```
kubectl create secret generic camunda-credentials \
  --from-literal=identity-postgresql-admin-password=CHANGE_ME \
  --from-literal=identity-postgresql-user-password=CHANGE_ME \
  --from-literal=webmodeler-postgresql-admin-password=CHANGE_ME \
  --from-literal=webmodeler-postgresql-user-password=CHANGE_ME
```

Note that unlike the OIDC client secrets, the passwords here will preconfigure the respective components. That means, you can freely choose the values to initialize access.

This secret includes the following keys:

- `identity-postgresql-admin-password`: The password for the administrative account of the PostgreSQL instance used by Management Identity (username `postgres`).
- `identity-postgresql-user-password`: The password non-privileged user account of the PostgreSQL instance used by Management Identity (username `bn_keycloak`).
- `literal=webmodeler-postgresql-admin-password`: The password for the administrative account of the PostgreSQL instance used by Web Modeler (username `postgres`).
- `webmodeler-postgresql-user-password` The password non-privileged user account of the PostgreSQL instance used by Web Modeler (username `web-modeler`).

### Configure components using OIDC

With the OIDC clients and the cluster secrets in place, you can move on to configuring the OAuth and OIDC connections for the components. You can skip those components that you do not need. Keep in mind that Orchestration Cluster and Connectors are enabled by default, so you will have to disable them explicitly in that case.

#### Global configuration

Start with the following global configuration that provides defaults for all components:

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

In the URLs, replace `<tenant id>` with the ID of your Microsoft Entra tenant. We will use this convention throughout the rest of this guide.

#### Configure Orchestration Cluster

Add the following to configure the Orchestration Cluster:

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

Replace `<OC_URL>` with the base URL of Web Modeler as it will be reachable from your users' browser. In our local deployment, this is `http://localhost:8080.

The value `orchestration.security.authentication.oidc.usernameClaim` determines which claim of an access token carries the identifier of a user. Likewise, `clientIdClaim` carries the same value for a client. `preferred_username` carries by default the email address of the accessing user. `azp` carries the client's ID in Entra. You can change those values if you would like to use different claims. See [the Orchestration Cluster OIDC configuration guide](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md#step-1-configure-the-oidc-client-id-claim) for details on these settings.

#### Configure Connectors

Add the following to configure Connectors:

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

Add the following to configure Management Identity:

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

Replace `<IDENTITY_URL>` with the base URL of Management Identity as it will be reachable from your users' browser. In our local deployment, this is `http://localhost:8084.

The value `global.identity.auth.identity.initialClaimName` determines which claim of an access token carries the identifier of your initial administrative user. On the same level, the value `initialClaimValue` determines the value of that claim that when matched grants administrative access to Management Identity.

:::tip
If you are _not_ enabling Optimize, add the following environment variable so that Management Identity starts successfully:

```
identity:
  env:
    - name: CAMUNDA_IDENTITY_AUDIENCE # redundant with global.identity.auth.identity.audience; needed to get the audience value in the optimize config in the embedded application.yaml of Management Identity right when Optimize is disabled...
      value: "<mgmt-identity-app-id>"
```

:::

#### Configure Optimize

Add the following to configure Optimize:

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

Replace `<OPTIMIZE_URL>` with the base URL of Optimize as it will be reachable from your users' browser. In our local deployment, this is `http://localhost:8083.

#### Configure Web Modeler

Add the following to configure Web Modeler:

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

Replace `<WEB_MODELER_URL>` with the base URL of Web Modeler as it will be reachable from your users' browser. In our local deployment, this is `http://localhost:8070.

You can replace the value of `webModeler.restapi.mail.fromAddress` with a value that fits your scenario. This is the email address that Web Modeler declares in the emails it sends. For more details on how you can configure the Web Modeler email connection, see [the corresponding documentation](../enable-additional-components.md#web-modeler).

#### Configure Console

Add the following to configure Console:

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

Full configuration file to enable Microsoft Entra:

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
```

### Connect to the cluster

Running this configuration, you can use the following port-forwarding instructions to access the APIs and UIs from localhost:

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

Once port forwarding is in place, you can then access the corresponding component via `http://localhost:<port>`, for example `http://localhost:8080` for the Orchestration Cluster UI. It will redirect you to Entra for login.

## Grant access to components

After deployment, specifically for the following components you will have to configure additional access:

To grant a user access to the Web Modeler UI:

- [Create a mapping rule in Management Identity](/self-managed/components/management-identity/mapping-rules.md#add-a-mapping-rule) for the `Web Modeler` role that matches the user's access token

To grant a client access to the Web Modeler API:

- [Create a role in Management Identity](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md#add-a-role) for the Web Modeler API
- [Assign the Web Modeler API permissions](/self-managed/components/management-identity/access-management/manage-permissions.md#manage-role-permissions) to the new role in Management Identity
- [Create a mapping rule in Management Identity](/self-managed/components/management-identity/mapping-rules.md#add-a-mapping-rule) for the new role that matches the client's access token

To grant a user access to Optimize:

- [Create a mapping rule in Management Identity](/self-managed/components/management-identity/mapping-rules.md#add-a-mapping-rule) for the `Optimize` role that matches the user's access token

:::info
When using an OIDC provider, the following Optimize features are not currently available:

- The user permissions tab in collections
- The `Alerts` tab in collections
- Digests
- Accessible user names for Owners of resources (the `sub` claim value is displayed instead).
  :::
