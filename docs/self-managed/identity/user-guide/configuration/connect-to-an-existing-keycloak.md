---
id: connect-to-an-existing-keycloak
title: "Connect to an existing Keycloak instance"
sidebar_label: "Connect to an existing Keycloak instance"
description: "Learn how to connect Identity to your existing Keycloak instance."
---

In this guide, we'll demonstrate how to connect Identity to your existing Keycloak instance.

### Prerequisites

- Access to your [Keycloak Admin Console](https://www.keycloak.org/docs/22.0.1/server_admin/#using-the-admin-console)
- A basic understanding of [administering realms and clients](https://www.keycloak.org/docs/22.0.1/server_admin/#assembly-managing-clients_server_administration_guide) in Keycloak.

### Steps

To connect Identity to an existing Keycloak instance, take the following steps:

1. Log in to your Keycloak Admin Console.
2. Select the realm you would like to connect Identity to. In our example, this is **camunda-platform**.
   ![keycloak-admin-realm-select](../img/keycloak-admin-realm-select.png)
3. Select **Clients** in the navigation menu, and click the **Create** button to create a new client.
4. Enter a client ID and click **Next**.
   :::note What client ID should I use?
   By default, Identity uses the Client ID `camunda-identity`, so we recommend using this too. If you choose a different client ID, this will need to be set in the Identity application [environment variables](/docs/self-managed/identity/deployment/configuration-variables.md).
   :::
   ![keycloak-admin-client-add-1](../img/keycloak-admin-client-add-1.png)
5. Toggle **Client authentication** to `on`, select **Service accounts roles** and click **Next**.
   ![keycloak-admin-client-add-2](../img/keycloak-admin-client-add-2.png)
6. Enter the URL of where your Identity instance will be hosted in the **Root URL** field and click **Save** to create the client.
   ![keycloak-admin-client-add-3](../img/keycloak-admin-client-add-3.png)
7. On the page for the created client navigate to the **Service account roles** tab in the top navigation.
   ![keycloak-admin-client-update-1](../img/keycloak-admin-client-update-1.png)
8. Click **Assign role** and change the filter to `Filter by clients`.
   ![keycloak-admin-client-update-2](../img/keycloak-admin-client-update-2.png)
9. Select the `manage-clients`, `manage-realm`, and `manage-users` role from the list and click **Assign**.
   :::note Why does Identity need these roles?
   Identity is designed to allow users to manage the various entities related to Camunda. To achieve this, it requires specific access to the realm.
   :::
10. Navigate to the **Credentials** tab and copy the client secret.
11. Set the `IDENTITY_CLIENT_SECRET` [environment variable](/docs/self-managed/identity/deployment/configuration-variables.md) with the value from **Step 9**.
12. Set the `KEYCLOAK_REALM` [environment variable](/docs/self-managed/identity/deployment/configuration-variables.md) to the realm you selected in **Step 2**.
    :::tip
    If you are using a specific realm, you need to set additional variables to use the intended realm.
    See the [environment variables](/docs/self-managed/identity/deployment/configuration-variables.md) page for details of Keycloak-specific variables to consider.
    :::
13. Start Identity.

:::note What does Identity create when starting?
Identity creates a base set of configurations required to function successfully. To understand more about what is created and why, see [the starting configuration](/docs/self-managed/identity/deployment/starting-configuration.md).
:::

### Considerations

When connecting Identity to a shared realm, accurately determining what clients should and should not be displayed in the Identity UI is not possible. Therefore, the clients in the realm you connect Identity to will be shown in the Identity UI and can
have their secrets viewed and updated. Users with access to Identity should be considered as having administrator-level access to the system.
