---
id: connect-to-an-oidc-provider
title: "Connect to an OpenID Connect provider"
description: "To enable a smoother integration with your existing systems, connect to an OpenID Connect provider"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

To enable a smoother integration with your existing systems, Camunda supports connecting to an OpenID Connect (OIDC)
authentication provider.

In this guide, we step through the configuration required to connect Camunda to your
authentication provider.

:::note
To connect to a Keycloak authentication provider, see [using an existing Keycloak](using-existing-keycloak.md).
:::

## Prerequisites

- Information about your OIDC provider's configuration, including the issuer URL.
- Ability to create applications in your OIDC provider.
- Ability to access the following information about the applications you have created in your OIDC provider:
  - Client ID
  - Client secrets
  - Audience

:::note
The steps below are a general approach for the Camunda components; it is important you reference the [component-specific
configuration](#component-specific-configuration) to ensure the components are configured correctly.
:::

## Configuration

<Tabs groupId="authPlatform" defaultValue="generic" queryString values={[{label: 'Generic', value: 'generic' },{label: 'Microsoft Entra ID', value: 'microsoftEntraId' }]} >
<TabItem value="generic">

### Steps

1. In your OIDC provider, create an application for each of the components you want to connect. The expected redirect URI of the component you are configuring an app for can be found in [component-specific configuration](#component-specific-configuration).
2. Make a note of the following values for each application you create:
   - Client ID
   - Client secret
   - Audience
3. Set the following environment variables for the component you are configuring an app for:

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Environment variables', value: 'env' },{label: 'Helm values', value: 'helm' }]} >
<TabItem value="env">

```
   CAMUNDA_IDENTITY_TYPE=GENERIC
   CAMUNDA_IDENTITY_ISSUER=<URL_OF_ISSUER>
   CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=<URL_OF_ISSUER> // this is used for container to container communication
   CAMUNDA_IDENTITY_CLIENT_ID=<Client ID from step 2>
   CAMUNDA_IDENTITY_CLIENT_SECRET=<Client secret from step 2>
   CAMUNDA_IDENTITY_AUDIENCE=<Audience from step 2>
```

</TabItem>
<TabItem value="helm">

```
global:
  identity:
    auth:
      issuer: <URL_OF_ISSUER>
      # this is used for container to container communication
      issuerBackendUrl: <URL_OF_ISSUER>
      tokenUrl: <TOKEN_URL_ENDPOINT>
      jwksUrl: <JWKS_URL>
      type: "GENERIC"
      operate:
        clientId: <Client ID from step 2>
        audience: <Audience from step 2>
        existingSecret: <Client secret from step 2>
      tasklist:
        clientId: <Client ID from step 2>
        audience: <Audience from step 2>
        existingSecret: <Client secret from step 2>
      optimize:
        clientId: <Client ID from step 2>
        audience: <Audience from step 2>
        existingSecret: <Client secret from step 2>
      zeebe:
        clientId: <Client ID from step 2>
        audience: <Audience from step 2>
        existingSecret: <Client secret from step 2>
      webModeler:
        clientId: <Client ID from step 2>
        clientApiAudience: <Audience from step 2>
        publicApiAudience: <Audience for using Web Modeler's API. For security reasons, use a different value than for clientApiAudience>
```

</TabItem>
</Tabs>

### Additional considerations

For authentication, the Camunda components use the scopes `email`, `openid`, `offline_access`, and `profile`.

:::note
The Connectors do not yet support authentication with a generic OIDC provider.

When using OIDC, set `connectors.inbound.mode: disabled` [in your Connectors Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#connectors-parameters).
:::

</TabItem>
<TabItem value="microsoftEntraId">

### Steps

1. Access the Entra ID admin area
   and [register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).
   After registering the app, the **Overview** page will contain a **Client ID**; make a note of this value as it will be
   required later on.

2. Within the app registered in Step
   1, [configure a platform](https://learn.microsoft.com/en-gb/entra/identity-platform/quickstart-register-app#configure-platform-settings)
   of type `web`. The expected redirect URI of the component you are configuring an app for can be found
   in [component-specific configuration](#component-specific-configuration).

3. Once you have registered a platform for your app a client secret needs to be created. To do this, see [adding a client secret](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#add-a-client-secret). Make a note of the value of the client secret as it will be required later on.

4. Set the following environment variables for the component you are configuring an app for:

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Environment variables', value: 'env' },{label: 'Helm values', value: 'helm' }]} >
<TabItem value="env">

```
   CAMUNDA_IDENTITY_TYPE=MICROSOFT
   CAMUNDA_IDENTITY_ISSUER=<URL_OF_ISSUER>
   CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=<URL_OF_ISSUER> // this is used for container to container communication
   CAMUNDA_IDENTITY_CLIENT_ID=<Client ID from step 1>
   CAMUNDA_IDENTITY_CLIENT_SECRET=<Client secret from step 3>
   CAMUNDA_IDENTITY_AUDIENCE=<Audience of your application>
```

</TabItem>
<TabItem value="helm">

```
global:
  identity:
    auth:
      issuer: <URL_OF_ISSUER>
      # this is used for container to container communication
      issuerBackendUrl: <URL_OF_ISSUER>
      tokenUrl: <TOKEN_URL_ENDPOINT>
      jwksUrl: <JWKS_URL>
      type: "MICROSOFT"
      operate:
        clientId: <Client ID from step 1>
        audience: <Audience of your application>
        existingSecret: <Client secret from step 3>
      tasklist:
        clientId: <Client ID from step 1>
        audience: <Audience of your application>
        existingSecret: <Client secret from step 3>
      optimize:
        clientId: <Client ID from step 1>
        audience: <Audience of your application>
        existingSecret: <Client secret from step 3>
      zeebe:
        clientId: <Client ID from step 1>
        audience: <Audience of your application>
        existingSecret: <Client secret from step 3>
        tokenScope: "<Client ID from step 1>/.default"
      webModeler:
        clientId: <Client ID from step 1>
        clientApiAudience: <Audience for your application>
        publicApiAudience: <Audience for using Web Modeler's API. For security reasons, use a different value than for clientApiAudience>
```

</TabItem>
</Tabs>

### Additional considerations

For authentication, the Camunda components use the scopes `email`, `openid`, `offline_access`, `profile`,
and `<CLIENT_UUID>/.default`. To ensure your users are able to successfully authenticate with Entra ID, you must
ensure that either there is
an [admin consent flow configured](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)
or grant consent on behalf of your users using
the [admin consent](https://learn.microsoft.com/en-gb/entra/identity/enterprise-apps/user-admin-consent-overview#admin-consent)
process.

To successfully authenticate wth Entra ID, you should use the `v2.0` API. This means that
the `CAMUNDA_IDENTITY_ISSUER_BACKEND_URL` value should end with `/v2.0`.

:::note
Connectors do not yet support authentication with Microsoft Entra ID as the OIDC provider. When using OIDC, set `connectors.inbound.mode: disabled` [in your Connectors Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#connectors-parameters).
:::

</TabItem>
</Tabs>

### Component-specific configuration

| Component   | Redirect URI                         | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operate     | https:///identity-callback           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Optimize    | https:///api/authentication/callback | There is a fallback if you use the existing ENV vars to configure your authentication provider, if you use a custom `yaml`, you need to update your properties to match the new values in this guide. When using an OIDC provider, the following features are not currently available: User permissions tab in collections, digests, `Alerts` tab in collections.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Tasklist    | https:///identity-callback           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Web Modeler | https:///login-callback              | Using a different OIDC provider than Keycloak currently disables all checks of the permissions claim both for using Web Modeler via the UI and via the public API. Required configuration variables for webapp: `OAUTH2_CLIENT_ID=[client-id]` `OAUTH2_JWKS_URL=[provider-jwks-url]` `OAUTH2_TOKEN_AUDIENCE=[client-audience]` `OAUTH2_TOKEN_ISSUER=[provider-issuer]` `OAUTH2_TYPE=[provider-type]` Required configuration variables for restapi: `CAMUNDA_IDENTITY_BASEURL=[identity-base-url]` `CAMUNDA_IDENTITY_TYPE=[provider-type]` `CAMUNDA_MODELER_SECURITY_JWT_AUDIENCE_INTERNAL_API=[client-audience]` `CAMUNDA_MODELER_SECURITY_JWT_AUDIENCE_PUBLIC_API=[publicapi-audience]` (for security reasons, use a different value here than for `CAMUNDA_MODELER_SECURITY_JWT_AUDIENCE_INTERNAL_API`) `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI=[provider-issuer]` |
| Zeebe       | no redirect URI                      | Instead, include `tokenScope:"<Azure-AppRegistration-ClientID> /.default "`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
