---
id: connect-to-an-oidc-provider
title: "Connect to an OpenID Connect provider"
sidebar_label: "To enable a smoother integration with your existing systems, connect to an OpenID Connect provider"
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

<Tabs groupId="authPlatform" defaultValue="generic"
values={[{label: 'Generic', value: 'generic' },{label: 'Microsoft Entra ID', value: 'microsoftEntraId' }]} >
<TabItem value="generic">

### Steps

1. In your OIDC provider, create an application for each of the components you want to connect. The expected redirect URI of the component you are configuring an app for can be found in [component-specific configuration](#component-specific-configuration).
2. Make a note of the following values for each application you create:
   - Client ID
   - Client secret
   - Audience
3. Set the following environment variables for the component you are configuring an app for:

```
   CAMUNDA_IDENTITY_TYPE=GENERIC
   CAMUNDA_IDENTITY_ISSUER=<URL_OF_ISSUER>
   CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=<URL_OF_ISSUER> // this is used for container to container communication
   CAMUNDA_IDENTITY_CLIENT_ID=<Client ID from step 2>
   CAMUNDA_IDENTITY_CLIENT_SECRET=<Client secret from step 2>
   CAMUNDA_IDENTITY_AUDIENCE=<Audience from step 2>
```

### Additional considerations

For authentication, the Camunda components use the scopes `email`, `openid`, and `offline_access`.

:::note
Web Modeler does not yet support authentication with a generic OIDC provider.
:::

</TabItem>
<TabItem value="microsoftEntraId">

### Steps

1. Access the Entra ID admin area
   and [register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).
   After registering the app, the **Overview** page will contain a Client ID; make a note of this value as it will be
   required later on.

2. Within the app registered in Step
   1, [configure a platform](https://learn.microsoft.com/en-gb/entra/identity-platform/quickstart-register-app#configure-platform-settings)
   of type `web`. The expected redirect URI of the component you are configuring an app for can be found
   in [component-specific configuration](#component-specific-configuration).

3. Once you have registered a platform for your app a client secret needs to be created, to do this,
   see [adding a client secret](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#add-a-client-secret).
   Make a note of the value of the client secret as it will be required later on.

4. Set the following environment variables for the component you are configuring an app for:

```
   CAMUNDA_IDENTITY_TYPE=MICROSOFT
   CAMUNDA_IDENTITY_ISSUER=<URL_OF_ISSUER>
   CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=<URL_OF_ISSUER> // this is used for container to container communication
   CAMUNDA_IDENTITY_CLIENT_ID=<Client ID from step 1>
   CAMUNDA_IDENTITY_CLIENT_SECRET=<Client secret from step 3>
   CAMUNDA_IDENTITY_AUDIENCE=<Audience of your application>
```

### Additional considerations

For authentication, the Camunda components use the scopes `email`, `openid`, `offline_access`,
and `<CLIENT_UUID>/.default`. To ensure your users are able to successfully authenticate with Entra ID, you must
ensure that either there is
an [admin consent flow configured](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)
or grant consent on behalf of your users using
the [admin consent](https://learn.microsoft.com/en-gb/entra/identity/enterprise-apps/user-admin-consent-overview#admin-consent)
process.

To successfully authenticate wth Entra ID, you should use the `v2.0` API. This means that
the `CAMUNDA_IDENTITY_ISSUER_BACKEND_URL` value should end with `/v2.0`.

</TabItem>
</Tabs>

### Component-specific configuration

| Component   | Redirect URI                                       | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Operate     | https://<OPERATE_URL>/identity-callback            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Optimize    | https://<OPTIMIZE_URL>/api/authentication/callback | There is a fallback if you use the existing ENV vars to configure your authentication provider, if you use a custom `yaml`, you need to update your properties to match the new values in this guide.<br/><br/>When using an OIDC provider, the following features are not currently available: User permissions tab in collections, digests, `Alerts` tab in collections.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Tasklist    | https://<TASKLIST_URL>/identity-callback           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Web Modeler | https://<WEB_MODELER_URL>/login-callback           | Using Microsoft Entra ID as the OIDC provider currently disables all checks of the permissions claim both for using Web Modeler via the UI and via the public API. Required configuration variables for webapp:<br/><br/> OAUTH2_CLIENT_ID=[client-id]<br/>OAUTH2_JWKS_URL=[provider-jwks-url]<br/>OAUTH2_TOKEN_AUDIENCE=[client-audience]<br/>OAUTH2_TOKEN_ISSUER=[provider-issuer]<br/>OAUTH2_TYPE=MICROSOFT<br/><br/> Required configuration variables for restapi:<br/>CAMUNDA_IDENTITY_BASE_URL=[identity-base-url]<br/>CAMUNDA_IDENTITY_TYPE=MICROSOFT<br/>CAMUNDA_MODELER_SECURITY_JWT_AUDIENCE_INTERNAL_API=[client-audience]<br/>CAMUNDA_MODELER_SECURITY_JWT_AUDIENCE_PUBLIC_API=[publicapi-audience]<br/>SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI=[provider-issuer] |
