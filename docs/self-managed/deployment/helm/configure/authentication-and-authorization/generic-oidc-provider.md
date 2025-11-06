---
id: generic-oidc-provider
sidebar_label: Generic OIDC provider
title: Set up the Helm chart with any third-party OIDC provider
description: "Learn how to set up the Helm Chart so that it connects to a third-party OIDC provider"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

In this guide, we step through the configuration required to connect Camunda to a generic OIDC provider. See also our specific guides for [Keycloak](external-keycloak.md) and [Microsoft Entra](./microsoft-entra.md)

## Prerequisites

- Information about your OIDC provider's configuration, including:
  - The issuer URL
  - Authorization URL
  - Token endpoint
  - JWKS endpoint
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

<h3>Steps</h3>

1. In your OIDC provider, create an application for each of the components you want to connect. The expected redirect URI of the component you are configuring an app for can be found in [component-specific configuration](#component-specific-configuration).
   :::note
   Redirect URIs serve as an approved list of destinations across identity providers. Only the URLs specified in the redirect URIs configuration will be permitted as valid redirection targets for authentication responses. This security measure ensures that tokens and authorization codes are only sent to pre-approved locations, preventing potential unauthorized access or token theft.
   :::
2. For all Components, ensure the appropriate application type is used:
   - **Operate, Tasklist, Optimize, Identity, Web Modeler API:** Web applications requiring confidential access/a confidential client
   - **Console, Web Modeler UI:** Single-page applications requiring public access/a public client
3. Make a note of the following values for each application you create:
   - Client ID
   - Client secret
   - Audience
4. Set the following environment variables or Helm values for the component you are configuring an app for:

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
      authUrl: <AUTH_URL_ENDPOINT>
      # this is used for container to container communication
      publicIssuerUrl: <ISSUER_URL>
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

You can also [store the client secrets in a Kubernetes secret](/self-managed/deployment/helm/install/quick-install.md#create-identity-secrets) and reference this in the Helm values.

</TabItem>
</Tabs>

:::note
Once set, you cannot update your initial claim name and value using environment or Helm values. You must change these values directly in the database.
:::

<h3>Additional considerations</h3>

For authentication, the Camunda components use the scopes `email`, `openid`, `offline_access`, and `profile`.

:::tip Optional scopes
The `offline_access` scope is optional.
If your organization restricts this scope for security reasons, you can adjust the scopes with:

```
CAMUNDA_IDENTITY_AUTH_SCOPES="openid profile email"
```

This configuration allows login without the `offline_access` scope.
:::

### Component-specific configuration

| Component   | Redirect URI                                                                                                                           | Notes/Limitations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Identity    | **Microsoft Entra ID:** <br/> `https://<IDENTITY_URL>/auth/login-callback` <br/><br/> **Helm:** <br/> `https://<IDENTITY_URL>`         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Operate     | **Microsoft Entra ID:** <br/> `https://<OPERATE_URL>/identity-callback` <br/><br/> **Helm:** <br/> `https://<OPERATE_URL>`             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Optimize    | **Microsoft Entra ID:** <br/> `https://<OPTIMIZE_URL>/api/authentication/callback` <br/><br/> **Helm:** <br/> `https://<OPTIMIZE_URL>` | There is a fallback if you use the existing ENV vars to configure your authentication provider, if you use a custom `yaml`, you need to update your properties to match the new values in this guide.<br/><br/>When using an OIDC provider, the following Optimize features are not currently available: <br/>- The user permissions tab in collections<br/>- The `Alerts` tab in collections<br/>- Digests<br/>- Accessible user names for Owners of resources (the `sub` claim value is displayed instead).                                                                                                                                                                                                                                                |
| Tasklist    | **Microsoft Entra ID:** <br/> `https://<TASKLIST_URL>/identity-callback` <br/><br/> **Helm:** <br/> `https://<TASKLIST_URL>`           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Web Modeler | **Microsoft Entra ID:** <br/> `https://<WEB_MODELER_URL>/login-callback` <br/><br/> **Helm:** <br/> `https://<WEB_MODELER_URL>`        | Web Modeler requires two clients: one for the UI, and one for the API. <br/><br/> Required configuration variables for webapp:<br/> `OAUTH2_CLIENT_ID=[ui-client-id]`<br/> `OAUTH2_JWKS_URL=[provider-jwks-url]`<br/> `OAUTH2_TOKEN_AUDIENCE=[ui-audience]`<br/> `OAUTH2_TOKEN_ISSUER=[provider-issuer]`<br/> `OAUTH2_TYPE=[provider-type]`<br/><br/> Required configuration variables for restapi:<br/> `CAMUNDA_IDENTITY_BASEURL=[identity-base-url]`<br/> `CAMUNDA_IDENTITY_TYPE=[provider-type]`<br/> `CAMUNDA_MODELER_SECURITY_JWT_AUDIENCE_INTERNAL_API=[ui-audience]`<br/> `CAMUNDA_MODELER_SECURITY_JWT_AUDIENCE_PUBLIC_API=[api-audience]`<br/> `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI=[provider-issuer]`                            |
| Console     | **Microsoft Entra ID:** <br/> `https://<CONSOLE_URL>` <br/><br/> **Helm:** <br/> `https://<CONSOLE_URL>`                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Zeebe       | no redirect URI                                                                                                                        | Instead, include `tokenScope:"<Azure-AppRegistration-ClientID> /.default "`. This refers to the Helm value `global.identity.auth.zeebe.tokenScope`, which should be set to the displayed value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Connectors  |                                                                                                                                        | Connectors act as a client in the OIDC flow. <br/><br/> For outbound-only mode (when `CAMUNDA_CONNECTOR_POLLING_ENABLED` is `false`), only Zeebe client properties are required: <br/> `ZEEBE_CLIENT_ID=[client-id]`<br/> `ZEEBE_CLIENT_SECRET=[client-secret]`<br/> `ZEEBE_AUTHORIZATION_SERVER_URL=[provider-issuer]`<br/> `ZEEBE_TOKEN_AUDIENCE=[Zeebe audience]`<br/> `ZEEBE_TOKEN_SCOPE=[Zeebe scope]` (optional)<br/><br/> For inbound mode, Operate client properties are required:<br/> `CAMUNDA_IDENTITY_TYPE=[provider-type]`<br/> `CAMUNDA_IDENTITY_AUDIENCE=[Operate audience]`<br/> `CAMUNDA_IDENTITY_CLIENT_ID=[client-id]`<br/> `CAMUNDA_IDENTITY_CLIENT_SECRET=[client-secret]`<br/> `CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=[provider-issuer]` |
