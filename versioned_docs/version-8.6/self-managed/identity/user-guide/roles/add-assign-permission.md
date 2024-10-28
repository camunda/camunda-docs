---
id: add-assign-permission
title: Add and assign a permission to a role
sidebar_label: "Add and assign a permission"
description: "Use Identity to add and assign a permission to a role."
---

Permissions allow you to control the level of access a user or an application has to a particular component. Traditionally, this is often described as being able to provide "read" or "write" access.

Permissions are assigned to [APIs](/self-managed/identity/user-guide/additional-features/adding-an-api.md) and can be grouped to form
[roles](/self-managed/identity/user-guide/roles/add-assign-role.md).

:::note
You can create permissions for granular access control over your APIs. Permissions granted to a user or M2M application are added to the `permissions.{audience}` claim of the access token.
:::

The preset permissions for Camunda components are:

| Component   | Permissions                                                                                           | Descriptions                                                                                                                                                                                                                                                                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connectors  | `read:*`                                                                                              | Read access to all APIs                                                                                                                                                                                                                                                                                                                            |
| Console     | `write:*`                                                                                             | Write access to all pages                                                                                                                                                                                                                                                                                                                          |
| Identity    | `read` <br/> `read:users` <br/> `write`                                                               | Read access to all pages <br/> Access only the **Users** page and related subpages <br/> Write access to all pages                                                                                                                                                                                                                                 |
| Operate     | `read:*` <br/> `write:*`                                                                              | Read access to all APIs <br/> Write access to all APIs                                                                                                                                                                                                                                                                                             |
| Optimize    | `write:*`                                                                                             | Write access to all APIs                                                                                                                                                                                                                                                                                                                           |
| Tasklist    | `read:*` <br/> `write:*`                                                                              | Read access to all APIs <br/> Write access to all APIs                                                                                                                                                                                                                                                                                             |
| Web Modeler | `write:*` <br/><br/> `admin:*` <br/><br/> `create:*` <br/> `read:*` <br/> `update:*` <br/> `delete:*` | Access to internal API <br/><br/> Elevated Access to the Internal API (see [super-user mode](../../../../components/modeler/web-modeler/collaboration.md#super-user-mode) and [publishing Connector templates](../../../../components/connectors/manage-connector-templates.md#publish-a-connector-template)) <br/><br/> CRUD access to public API |
| Zeebe       | `write:*`                                                                                             | Write access to all APIs                                                                                                                                                                                                                                                                                                                           |

In this guide, we will show you how to use Identity to add and assign a permission to a role.

:::caution Write access needed
To assign a permission to a role and assign a role to a user, you need to have write access to Identity.
Read our [guide on managing user access](/self-managed/identity/user-guide/authorizations/managing-user-access.md) to learn more.
:::

## Add and assigning a permission to a role

### Add a permission

To create a permission using Identity, take the following steps:

1. Log in to the Identity UI and navigate to the **API** tab:

![add-permission-api-tab](../img/add-api-tab.png)

2. Click the API you would like to create a permission for. This will open the details page.

3. Click the **Permissions** tab beneath the API name.

4. Click **Add Permission** located on the top right of the table and a modal will open.

5. We are now able to fill out the details of the permission. For this guide, we will use a set of example values. When you have inserted the details, click **Add**:

![add-permission-modal-2](../img/add-permission-modal-2.png)

On confirmation, the modal will close, the table will update, and your new permission will be shown:

![add-permission-refreshed-table](../img/add-permission-refreshed-table.png)

### Assign a permission to a role

To assign a permission to a role using Identity, take the following steps:

1. Log in to the Identity UI and navigate to the **Roles** tab, select **Permissions > Assign Permission**:

![assign-a-permission-tab](../img/assign-a-permission-tab.png)

2. Select the API which contains the permission you want to assign.

3. Select the permission you would like to assign and click **Add**.

On confirmation, the modal will close, the table will update, and your assigned permission will be shown:

![assign-a-permission-refreshed-table](../img/assign-a-permission-refreshed-table.png)
