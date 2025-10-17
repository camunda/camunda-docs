---
id: connect-to-an-existing-keycloak
title: "Connect to an existing Keycloak instance"
sidebar_label: "Connect to an existing Keycloak instance"
description: "Learn how to connect Management Identity to your existing Keycloak instance."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide describes how to connect Management Identity to your existing Keycloak instance.

## Prerequisites

- Access to your [Keycloak Admin Console](https://www.keycloak.org/docs/latest/server_admin/#using-the-admin-console)
- A basic understanding of [administering realms and clients](https://www.keycloak.org/docs/latest/server_admin/#assembly-managing-clients_server_administration_guide) in Keycloak

:::note
Clients in Camunda 8 SaaS and applications in Camunda 8 Self-Managed provide a similar purpose. One key difference is that for Camunda 8 SaaS, you can set up specific [client connection credentials](/components/console/manage-clusters/manage-api-clients.md#create-a-client), whereas in Management Identity, an application is created with credentials automatically assigned.
:::

## Steps

:::caution Keycloak URLs
As of the 8.5.3 release, Management Identity uses the Keycloak frontend URL instead of the backend URL. This change may affect you if you have blocked the Keycloak frontend URL from other services (including Camunda applications), and can potentially impact Management Identity's functionality.

To avoid connectivity issues, ensure your Keycloak frontend URL is accessible by adjusting your network, firewall, or security settings as needed. This adjustment is crucial to maintain the integration with Keycloak and ensure compatibility.
:::

To connect Management Identity to an existing Keycloak instance, take the following steps for your Camunda installation.

### Prepare an existing Keycloak realm

Management Identity can either create a Keycloak realm called `camunda-platform` with all settings from scratch, or it can use an already existing Keycloak realm. If you would like to use an existing Keycloak realm, prepare following the steps below. Otherwise you can skip this section.

1. Log in to your Keycloak Admin Console.
2. Select the realm you would like to connect Management Identity to. In our example, this is **camunda-platform**.
   ![keycloak-admin-realm-select](../img/keycloak-admin-realm-select.png)
   :::warning
   Management Identity only supports Keycloak realms where realm name and realm ID are the same value. That is not the case for realms created through the Keycloak UI (where the ID becomes a generated value). You can specifyf both name and ID when you use [Keycloak's JSON import feature](https://www.keycloak.org/server/importExport).
   :::
3. Select **Clients** in the navigation menu, and click the **Create** button to create a new client.
4. Enter a client ID and click **Next**.
   :::note What client ID should I use?
   By default, Management Identity uses the Client ID `camunda-identity`, so we recommend using this too. If you choose a different client ID, this will need to be set in the Management Identity application [environment variables](/self-managed/components/management-identity/miscellaneous/configuration-variables.md).
   :::
   ![keycloak-admin-client-add-1](../img/keycloak-admin-client-add-1.png)
5. Toggle **Client authentication** to `on`, select **Service accounts roles** and click **Next**.
   ![keycloak-admin-client-add-2](../img/keycloak-admin-client-add-2.png)
6. Enter the URL of where your Management Identity instance will be hosted in the **Root URL** field and click **Save** to create the client.
   ![keycloak-admin-client-add-3](../img/keycloak-admin-client-add-3.png)
7. On the page for the created client navigate to the **Service account roles** tab in the top navigation.
   ![keycloak-admin-client-update-1](../img/keycloak-admin-client-update-1.png)
8. Click **Assign role** and change the filter to `Filter by clients`.
   ![keycloak-admin-client-update-2](../img/keycloak-admin-client-update-2.png)
9. Select the `manage-clients`, `manage-realm`, and `manage-users` role from the list and click **Assign**.
   :::note Why does Management Identity need these roles?
   Management Identity is designed to allow users to manage the various entities related to Camunda. To achieve this, it requires specific access to the realm.
   :::
10. Navigate to the **Credentials** tab and copy the client secret.

### Configure and start the application

Configure the Management Identity application through environment variables as follows:

1. Set `IDENTITY_CLIENT_ID` [environment variable](/self-managed/components/management-identity/miscellaneous/configuration-variables.md) to the ID of the client you have created (or `camunda-identity` if you are letting Management Identity create everything).
1. Set `KEYCLOAK_REALM` [environment variable](/self-managed/components/management-identity/miscellaneous/configuration-variables.md) to the realm you want to use (or `camunda-platform` if you are letting Management Identity create everything).
1. Set `KEYCLOAK_SETUP_USER` to the name of an administrative Keycloak user.
1. Set `KEYCLOAK_SETUP_PASSWORD` to the administrative Keycloak user's password.
   :::tip
   If you are using a specific realm, you need to set additional variables to use the intended realm.
   See the [environment variables](/self-managed/components/management-identity/miscellaneous/configuration-variables.md) page for details of Keycloak-specific variables to consider.
   :::
1. Start Management Identity.

:::note What does Management Identity create when starting?
Management Identity creates a base set of configurations required to function successfully. To understand more about what is created and why, see [the starting configuration](/self-managed/components/management-identity/miscellaneous/starting-configuration.md).
:::

:::tip Helm chart setup
If you would like to run a full Camunda cluster with an existing Keycloak instance, have a look at [our Helm chart setup guide for this scenario](/self-managed/deployment/helm/configure/authentication-and-authorization/external-keycloak.md#create-a-secret).
:::

## Considerations

When connecting Management Identity to a shared realm, accurately determining what clients should and should not be displayed in the UI is not possible. Therefore, the clients in the realm you connect Management Identity to will be shown in the UI and can have their secrets viewed and updated. Users with access to Management Identity should be considered as having administrator-level access to the system.
