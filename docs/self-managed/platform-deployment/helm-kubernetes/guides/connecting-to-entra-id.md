---
id: connecting-to-entra-id
title: "Connecting to Entra ID"
description: "Learn how to connect your Camunda Self-Managed deployment to Entra ID."
---

:::note
The following components support Entra ID authentication: Operate
:::

This guide will walk you through the steps to connect your Camunda Self-Managed deployment to Entra ID.

### Prerequisites

- Ability to create applications in Entra ID

:::note
You should use the following steps to create an application in Entra ID for each of the components you want to connect
to Entra ID.
:::

### Steps

1. Access the Entra ID admin area
   and [register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).
   After registering the app the Overview page will contain a Client ID, make a note of this value as it will be
   required later on.

2. Within the app registered in step
   1, [configure a platform](https://learn.microsoft.com/en-gb/entra/identity-platform/quickstart-register-app#configure-platform-settings)
   of type `web`. The expected redirect URI of the component you are configuring an app for can be found in the table
   below:

3. Once you have registered a platform for you app a [client secret should be added](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#add-a-client-secret). Make a note of the value of the client secret as it will be required later on.

4. Using the client ID from step 1 and the client secret from step 3, set the environment variable `CAMUNDA_IDENTITY_CLIENT_ID` and `CAMUNDA_IDENTITY_CLIENT_SECRET` respectively for the component you are configuring an app for.

| Component | Redirect URI                              |
| --------- | ----------------------------------------- |
| Operate   | https://<OPERATE_URL>/auth/login-callback |
