---
id: connect-to-an-oidc-provider
title: "Connect Management Identity to an identity provider"
sidebar_label: Connect to an identity provider
description: "To enable a smoother integration with your existing systems, connect to an OpenID Connect provider"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import TickImg from '/static/img/icon-list-tick.png';
import CrossImg from '/static/img/icon-list-cross.png';

Connect Management Identity to an OpenID Connect (OIDC) authentication provider for integration with your existing system.

:::note

- A full list of supported and unsupported features when using an OIDC provider is available in the [OIDC features table](#supported-and-unsupported-oidc-features).
- To connect to a Keycloak authentication provider, see [connect to an existing Keycloak instance](/self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak.md).

:::

## Prerequisites

- Information about your OIDC provider's configuration, including the issuer URL.
- Ability to create applications in your OIDC provider.
- Ability to access the following information about the applications you have created in your OIDC provider:
  - Client ID
  - Client secrets
  - Audience
- A [claim name and value](/self-managed/components/management-identity/miscellaneous/configuration-variables.md#oidc-configuration) to use for initial access.

:::note
The steps below are a general approach for the Camunda components; it is important you reference the [component-specific
configuration](#component-specific-configuration) to ensure the components are configured correctly.
:::

## Configuration

<Tabs groupId="authPlatform" defaultValue="generic" queryString values={[{label: 'Generic', value: 'generic' },{label: 'Microsoft Entra ID', value: 'microsoftEntraId' }]} >
<TabItem value="generic">

<h3>Steps</h3>

1. Identify what management and modeling components you need to use in Camunda 8: [Web Modeler](../../modeler/web-modeler/overview.md), [Console](../../console/overview.md), [Optimize](../../optimize/overview.md).
2. In your OIDC provider, **create an application for each of the management and modeling components you want to connect**. Web Modeler requires two applications: one for the UI, and one for the API.
   - The expected redirect URI of the component you are configuring an app for can be found in [component-specific configuration](#component-specific-configuration).
     :::note
     Redirect URIs serve as an approved list of destinations across identity providers. Only the URLs specified in the redirect URIs configuration will be permitted as valid redirection targets for authentication responses. This security measure ensures that tokens and authorization codes are only sent to pre-approved locations, preventing potential unauthorized access or token theft.
     :::
3. For each management and modeling components, ensure the appropriate application type is used:
   - Web applications requiring confidential access/a confidential client:
     - **Optimize**
     - **Management Identity**
     - **Web Modeler API**
   - Web applications requiring confidential access/a confidential client:
     - **Console**
     - **Web Modeler UI**
4. Make a note of the following values for each application you create:
   - Client ID
   - Client secret
   - Audience
5. Set the following environment variables or Helm values for the component you are configuring an app for:

:::note
You can connect to your OIDC provider through either environment variables or Helm values. Ensure only one configuration option is used.
:::

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Environment variables', value: 'env' },{label: 'Helm values', value: 'helm' }]} >
<TabItem value="env">

```
   CAMUNDA_IDENTITY_TYPE=GENERIC
   CAMUNDA_IDENTITY_BASE_URL=<IDENTITY_URL>
   CAMUNDA_IDENTITY_ISSUER=<URL_OF_ISSUER>
   CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=<URL_OF_ISSUER> // this is used for container to container communication
   CAMUNDA_IDENTITY_CLIENT_ID=<Client ID from Step 3>
   CAMUNDA_IDENTITY_CLIENT_SECRET=<Client secret from Step 3>
   CAMUNDA_IDENTITY_AUDIENCE=<Audience from Step 3>
   IDENTITY_INITIAL_CLAIM_NAME=<Initial claim name  if not using the default "oid">
   IDENTITY_INITIAL_CLAIM_VALUE=<Initial claim value>
   SPRING_PROFILES_ACTIVE=oidc
```

</TabItem>
<TabItem value="helm">

```yaml
global:
  identity:
    auth:
      issuer: <URL_OF_ISSUER>
      # this is used for container to container communication
      issuerBackendUrl: <URL_OF_ISSUER>
      tokenUrl: <TOKEN_URL_ENDPOINT>
      jwksUrl: <JWKS_URL>
      type: "GENERIC"
      identity:
        clientId: <Client ID from Step 3>
        existingSecret: <Client secret from Step 3>
        audience: <Audience from Step 3>
        initialClaimName: <Initial claim name if not using the default "oid">
        initialClaimValue: <Initial claim value>
      operate:
        clientId: <Client ID from Step 3>
        audience: <Audience from Step 3>
        existingSecret: <Client secret from Step 3>
      tasklist:
        clientId: <Client ID from Step 3>
        audience: <Audience from Step 3>
        existingSecret: <Client secret from Step 3>
      optimize:
        clientId: <Client ID from Step 3>
        audience: <Audience from Step 3>
        existingSecret: <Client secret from Step 3>
      zeebe:
        clientId: <Client ID from Step 3>
        audience: <Audience from Step 3>
        existingSecret: <Client secret from Step 3>
      webModeler:
        clientId: <Client ID of Web Modeler's UI from Step 3>
        clientApiAudience: <Audience of Web Modeler's UI from Step 3>
        publicApiAudience: <Audience of Web Modeler's API from Step 3>
      console:
        clientId: <Client ID from Step 3>
        audience: <Audience from Step 3>
```

You can also [store the client secrets in a Kubernetes secret](/self-managed/installation-methods/helm/install.md#create-identity-secrets) and reference this in the Helm values.

</TabItem>
</Tabs>

:::note
Once set, you cannot update your initial claim name and value using environment variables or Helm values. You must change these values directly in the database.
:::

<h3>Additional considerations</h3>

For authentication, the Camunda components use the scopes `email`, `openid`, `offline_access`, and `profile`.

</TabItem>
<TabItem value="microsoftEntraId">

<h3>Steps</h3>

:::note
Ensure you register a new application for each component.
:::

1. Identify what management and modeling components you need to use in Camunda 8: [Web Modeler](../../modeler/web-modeler/overview.md), [Console](../../console/overview.md), [Optimize](../../optimize/overview.md).
2. Within the Entra ID admin center, [register a new application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) for **each component you would like to connect**. Web Modeler requires two applications: one for the UI, and one for the API.
3. Navigate to the new application's **Overview** page, and make note of the **Client ID**. This will also be used as the audience ID.
4. Within your new application, [configure a platform](https://learn.microsoft.com/en-gb/entra/identity-platform/quickstart-register-app#configure-platform-settings) for the appropriate component:
   - **Web**:
     - Optimize
     - Management Identity
     - Web Modeler API
   - **Single-page application**:
     - Console
     - Web Modeler UI
5. Add your component's **Microsoft Entra ID** redirect URI, found under [Component-specific configuration](#component-specific-configuration).
   :::note
   Redirect URIs serve as an approved list of destinations across identity providers. Only the URLs specified in the redirect URIs configuration will be permitted as valid redirection targets for authentication responses. This security measure ensures that tokens and authorization codes are only sent to pre-approved locations, preventing potential unauthorized access or token theft.
   :::
6. [Create a new client secret](https://learn.microsoft.com/en-gb/entra/identity-platform/quickstart-register-app?tabs=client-secret#add-credentials), and note the new secret's value for later use. The secret ID is not needed, only the secret value is required.
7. Set the following environment variables or Helm values for the component you are configuring an app for:

:::note
You can connect to your OIDC provider through either environment variables or Helm values. Ensure only one configuration option is used.
:::

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Environment variables', value: 'env' },{label: 'Helm values', value: 'helm' }]} >
<TabItem value="env">

```
    CAMUNDA_IDENTITY_TYPE=MICROSOFT
    CAMUNDA_IDENTITY_BASE_URL=<IDENTITY_URL>
    CAMUNDA_IDENTITY_ISSUER=https://login.microsoftonline.com/<Microsoft Entra tenant ID>/v2.0
    CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=https://login.microsoftonline.com/<Microsoft Entra tenant ID>/v2.0
    CAMUNDA_IDENTITY_CLIENT_ID=<Client ID from Step 2>
    CAMUNDA_IDENTITY_CLIENT_SECRET=<Client secret from Step 5>
    CAMUNDA_IDENTITY_AUDIENCE=<Client ID from Step 2>
    IDENTITY_INITIAL_CLAIM_NAME=<Initial claim name if not using the default "oid">
    IDENTITY_INITIAL_CLAIM_VALUE=<Initial claim value>
    SPRING_PROFILES_ACTIVE=oidc
```

</TabItem>
<TabItem value="helm">

```yaml
global:
  identity:
    auth:
      issuer: https://login.microsoftonline.com/<Microsoft Entra tenant ID>/v2.0
      # this is used for container to container communication
      issuerBackendUrl: https://login.microsoftonline.com/<Microsoft Entra tenant ID>/v2.0
      tokenUrl: https://login.microsoftonline.com/<Microsoft Entra tenant ID>/oauth2/v2.0/token
      jwksUrl: https://login.microsoftonline.com/<Microsoft Entra tenant ID>/discovery/v2.0/keys
      type: "MICROSOFT"
      publicIssuerUrl: https://login.microsoftonline.com/<Microsoft Entra tenant ID>/v2.0
      identity:
        clientId: <Client ID from Step 2>
        existingSecret: <Client secret from Step 5>
        audience: <Audience from Step 2>
        # This is the object ID of the first user. A role mapping in Identity will automatically be generated for this user.
        initialClaimValue: <Initial claim value>
        redirectUrl: <See the Helm value in the table below>
      operate:
        clientId: <Client ID from Step 2>
        audience: <Client ID from Step 2>
        existingSecret: <Client secret from Step 5>
        redirectUrl: <See the Helm value in the table below>
      tasklist:
        clientId: <Client ID from Step 2>
        audience: <Client ID from Step 2>
        existingSecret: <Client secret from Step 5>
        redirectUrl: <See the Helm value in the table below>
      optimize:
        clientId: <Client ID from Step 2>
        audience: <Client ID from Step 2>
        existingSecret: <Client secret from Step 5>
        redirectUrl: <See the Helm value in the table below>
      zeebe:
        clientId: <Client ID from Step 2>
        audience: <Client ID from Step 2>
        existingSecret: <Client secret from Step 5>
        tokenScope: "<Client ID from Step 2>/.default"
      webModeler:
        clientId: <Client ID of Web Modeler's UI from Step 2>
        clientApiAudience: <Client ID of Web Modeler's UI from Step 2>
        publicApiAudience: <Client ID of Web Modeler's API from Step 2>
        redirectUrl: <See the Helm value in the table below>
      console:
        clientId: <Client ID from Step 2>
        audience: <Client ID from Step 2>
        redirectUrl: <See the Helm value in the table below>
        wellKnown: <Found in the "Endpoints" section of the app registrations page>
      connectors:
        clientId: <Client ID from Step 2>
        existingSecret: <Client secret from Step 5>
```

</TabItem>
</Tabs>

:::danger
Once set, your initial claim name and value cannot be updated using environment variables or Helm values, and must be changed directly in the database.
:::

<h3>Additional considerations</h3>

Due to technical limitations regarding [third party content](https://openid.net/specs/openid-connect-frontchannel-1_0.html#ThirdPartyContent), front channel single sign out is not supported. This means that when a user logs out of one component, they will not be logged out of the other components.

For authentication, the management and modeling components use the scopes `email`, `openid`, `offline_access`, `profile`,
and `<CLIENT_UUID>/.default`. To ensure your users are able to successfully authenticate with Entra ID, you must ensure that either there is an [admin consent flow configured](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow) or grant consent on behalf of your users using the [admin consent](https://learn.microsoft.com/en-gb/entra/identity/enterprise-apps/user-admin-consent-overview#admin-consent) process.

The client should be configured to support `grant_type`:

- To **create** an M2M token, the `client_credentials` grant type is required. The response contains an access token.
- To **renew** a token using a refresh token, the `refresh_token` grant type is required.
- To **create** a token via authorization flow, the `authorization_code` grant type is required. The response contains both access and refresh tokens.

To successfully authenticate with Entra ID, you should use the `v2.0` API. This means that
the `CAMUNDA_IDENTITY_ISSUER_BACKEND_URL` value should end with `/v2.0`.

Follow the [Microsoft Entra instructions](https://learn.microsoft.com/en-us/entra/identity-platform/reference-microsoft-graph-app-manifest#configure-the-app-manifest-in-the-microsoft-entra-admin-center) to configure the app manifest, and set the [requestedAccessTokenVersion](https://learn.microsoft.com/en-us/entra/identity-platform/reference-microsoft-graph-app-manifest#api-attribute) under `Api:` to `2`:

```json
    "requestedAccessTokenVersion": 2,
```

</TabItem>
</Tabs>

### Component-specific configuration

| Component           | Redirect URI                                                                                                                           | Notes/Limitations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Management Identity | **Microsoft Entra ID:** <br/> `https://<IDENTITY_URL>/auth/login-callback` <br/><br/> **Helm:** <br/> `https://<IDENTITY_URL>`         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Optimize            | **Microsoft Entra ID:** <br/> `https://<OPTIMIZE_URL>/api/authentication/callback` <br/><br/> **Helm:** <br/> `https://<OPTIMIZE_URL>` | There is a fallback if you use the existing environment variables to configure your authentication provider. If you use a custom `yaml`, update your properties to match the new values in this guide.<br/><br/>When using an OIDC provider, the following Optimize features are not currently available: <br/>- The **User permissions** tab in collections<br/>- The **Alerts** tab in collections<br/>- Digests<br/>- Accessible usernames for owners of resources (the `sub` claim value is displayed instead).                                                                                                                                                                                                                                                |
| Web Modeler         | **Microsoft Entra ID:** <br/> `https://<WEB_MODELER_URL>/login-callback` <br/><br/> **Helm:** <br/> `https://<WEB_MODELER_URL>`        | Web Modeler requires two clients: one for the UI, and one for the API. <br/><br/> Required configuration variables for the `webapp` component:<br/> `OAUTH2_CLIENT_ID=[ui-client-id]`<br/> `OAUTH2_JWKS_URL=[provider-jwks-url]`<br/> `OAUTH2_TOKEN_AUDIENCE=[ui-audience]`<br/> `OAUTH2_TOKEN_ISSUER=[provider-issuer]`<br/> `OAUTH2_TYPE=[provider-type]`<br/><br/> Required configuration variables for the `restapi` component:<br/> `CAMUNDA_IDENTITY_BASEURL=[identity-base-url]`<br/> `CAMUNDA_IDENTITY_TYPE=[provider-type]`<br/> `CAMUNDA_MODELER_SECURITY_JWT_AUDIENCE_INTERNAL_API=[ui-audience]`<br/> `CAMUNDA_MODELER_SECURITY_JWT_AUDIENCE_PUBLIC_API=[api-audience]`<br/> `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI=[provider-issuer]`. |
| Console             | **Microsoft Entra ID:** <br/> `https://<CONSOLE_URL>` <br/><br/> **Helm:** <br/> `https://<CONSOLE_URL>`                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Connectors          |                                                                                                                                        | Connectors act as a client in the OIDC flow. <br/><br/> For outbound-only mode (when `CAMUNDA_CONNECTOR_POLLING_ENABLED` is `false`), only Zeebe client properties are required: <br/> `ZEEBE_CLIENT_ID=[client-id]`<br/> `ZEEBE_CLIENT_SECRET=[client-secret]`<br/> `ZEEBE_AUTHORIZATION_SERVER_URL=[provider-issuer]`<br/> `ZEEBE_TOKEN_AUDIENCE=[Zeebe audience]`<br/> `ZEEBE_TOKEN_SCOPE=[Zeebe scope]` (optional)<br/><br/> For inbound mode, Operate client properties are required:<br/> `CAMUNDA_IDENTITY_TYPE=[provider-type]`<br/> `CAMUNDA_IDENTITY_AUDIENCE=[Operate audience]`<br/> `CAMUNDA_IDENTITY_CLIENT_ID=[client-id]`<br/> `CAMUNDA_IDENTITY_CLIENT_SECRET=[client-secret]`<br/> `CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=[provider-issuer]`       |

## Supported and unsupported OIDC features

When using [Management Identity](/self-managed/components/management-identity/overview.md) with an OIDC provider, not all features of authentication and authorization are available. The following table lists OIDC supported and unsupported features.

| Feature name                                             | Description                                                                                                                                                                                                                                                                                                                          |                              Availability                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------: |
| Single sign-on (SSO)                                     | Redirects users to the identity provider for authentication, and enables seamless login across applications. <br/><br/> Zeebe, Operate, Tasklist, Optimize, Identity, and Connectors use an identity provider-issued JWT. Web Modeler and Console use PCKE (Proof Key for Code Exchange) to connect to the Camunda Identity service. |  <img src={TickImg} class="table-tick" alt="Available" width="15px"/>   |
| Authentication flows (Authorization code flow with PKCE) | Securely handles user login using the recommended authorization code flow with PKCE (Proof Key for Code Exchange) for security. <br/><br/> Web Modeler and Console use PCKE, but do not directly connect to the identity provider with OIDC. Web Modeler and Console use PCKE to connect to the Camunda Identity service.            | <img src={CrossImg} class="table-tick" alt="Unavailable" width="15px"/> |
| ID token handling                                        | Validates and extracts user identity details from the ID token after authentication.                                                                                                                                                                                                                                                 |  <img src={TickImg} class="table-tick" alt="Available" width="15px"/>   |
| Access token management                                  | Uses access tokens issued by the identity provider to securely access protected APIs.                                                                                                                                                                                                                                                |  <img src={TickImg} class="table-tick" alt="Available" width="15px"/>   |
| Session management                                       | Ensures users remain logged in across sessions and applications or automatically re-authenticate when needed.                                                                                                                                                                                                                        |  <img src={TickImg} class="table-tick" alt="Available" width="15px"/>   |
| Logout handling (RP-initiated logout)                    | Triggers user logout from the application and notifies the identity provider to sign out users across all connected systems.                                                                                                                                                                                                         |  <img src={TickImg} class="table-tick" alt="Available" width="15px"/>   |
| Role and group synchronization                           | Maps user roles and permissions from the identity provider into the client application for access control.                                                                                                                                                                                                                           | <img src={CrossImg} class="table-tick" alt="Unavailable" width="15px"/> |
| User profile management                                  | Fetches user details from the UserInfo endpoint after authentication to personalize the user experience.                                                                                                                                                                                                                             | <img src={CrossImg} class="table-tick" alt="Unavailable" width="15px"/> |

To request a missing feature, please [contact us](/reference/contact.md).
