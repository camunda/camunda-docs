---
id: connect-to-an-existing-keycloak
title: "Connect to an existing Keycloak instance"
sidebar_label: "Connect to an existing Keycloak instance"
---

In this guide, we will show you how you can connect the Identity component to your existing Keycloak instance.

### Prerequisites

- Access to your Keycloak Admin Console
- A basic understanding of administering realms and clients in Keycloak

To connect Identity to an existing Keycloak instance, take the following steps:

1. Login to your Keycloak Admin Console

2. Hover over the current selected realm name, in our example **Master**, and select the realm you would like to connect Identity to, in our example it is **Test Realm**

![keycloak-admin-realm-select](img/keycloak-admin-realm-select.png)

3. Click on **Clients** in the left navigation bar and then click **Create**

![keycloak-admin-client-list](img/keycloak-admin-client-list.png)

4. Enter the client ID and the URL of where your Identity instance will be hosted then click **Save**
   :::note What client ID should I use?
   By default, Identity uses the Client ID `camunda-identity` so we would recommend using this too. If you choose a different client ID this will need to be set in the Identity application [environment variables](/docs/self-managed/identity/deployment/configuration-variables.md).
   :::

![keycloak-admin-client-add](img/keycloak-admin-client-add.png)

5. On the page for the client created, set the **Access Type** to `confidential` and **Service Accounts Enabled** to `ON`

![keycloak-admin-update-client-1](img/keycloak-admin-update-client-1.png)

6. Scroll to the bottom of the page, click **Save** and return to the top of the page

7. Click on the **Service Account Roles** tab in the top navigation

![keycloak-admin-update-client-2](img/keycloak-admin-update-client-2.png)

8. Select the `realm-management` client from the **Client Roles** dropdown

![keycloak-admin-update-client-3](img/keycloak-admin-update-client-3.png)

9. Assign the `manage-clients`, `manage-realm`, and `manage-users` role from the **Available Roles** list

![keycloak-admin-update-client-4](img/keycloak-admin-update-client-4.png)

:::note Why does Identity need these roles?
Identity is designed to allow users to manage the various entities related to the Camunda platform. To achieve this it requires specific access to the realm.
:::

10. Click on the **Credentials** tab and copy the client secret

![keycloak-admin-copy-client-credentials.png](img/keycloak-admin-copy-client-credentials.png)

11. Set the `IDENTITY_CLIENT_SECRET` [environment variable](/docs/self-managed/identity/deployment/configuration-variables.md) with the value from step 9.

12. Start the Identity application

:::note What does Identity create when starting?
The Identity application creates a base set of configuration required to function successfully, to understand more about what is created and why please see [the starting configuration](/docs/self-managed/identity/deployment/starting-configuration.md).
:::
