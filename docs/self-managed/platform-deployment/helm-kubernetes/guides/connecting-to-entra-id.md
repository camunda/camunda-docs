---
id: connecting-to-entra-id
title: "Connecting to Entra ID (Azure AD)"
description: "Learn how to connect your Camunda Self-Managed deployment to Entra ID (Azure AD)."
---

:::note
The following components support Entra ID authentication: Operate
:::

This guide will walk you through the steps to connect your Camunda Self-Managed deployment to Entra ID (Azure AD).

## Prerequisites

- Ability to create applications in Entra ID

:::note
You should use the following steps to create an application in Entra ID for each of the components you want to connect
to Entra ID.
:::

## Steps

1. Access the Entra ID admin area
   and [register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).
   After registering the app, the **Overview** page will contain a Client ID; make a note of this value as it will be
   required later on.

2. Within the app registered in step
   1, [configure a platform](https://learn.microsoft.com/en-gb/entra/identity-platform/quickstart-register-app#configure-platform-settings)
   of type `web`. The expected redirect URI of the component you are configuring an app for can be found in [component-specific configuration](#component-specific-configuration).

3. Once you have registered a platform for your app a client secret needs to be created, to do this see [adding a client secret](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#add-a-client-secret). Make a note of the value of the client secret as it will be required later on.

4. Set the following environment variables for the component you are configuring an app for:

```
   CAMUNDA_IDENTITY_TYPE=AZUREAD
   CAMUNDA_IDENTITY_ISSUER=<ENTRA_ID_ISSUER>
   CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=<ENTRA_ID_ISSUER> // this is used for container to container communication
   CAMUNDA_IDENTITY_CLIENT_ID=<Client ID from step 1>
   CAMUNDA_IDENTITY_CLIENT_SECRET=<Client secret from step 3>
   CAMUNDA_IDENTITY_AUDIENCE=<Client ID from step 1>
```

## Additional considerations

For authentication, the Camunda components use the scopes `email`, `openid`, `offline_access`, and `<CLIENT_UUID>/.default`. To ensure that your users are able to successfully authenticate with Entra ID, you must ensure that either there is an [admin consent flow configured](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow) or grant consent on behalf of your users using the [admin consent](https://learn.microsoft.com/en-gb/entra/identity/enterprise-apps/user-admin-consent-overview#admin-consent) process.

### Component-specific configuration

| Component | Redirect URI                              |
| --------- | ----------------------------------------- |
| Operate   | https://<OPERATE_URL>/auth/login-callback |
