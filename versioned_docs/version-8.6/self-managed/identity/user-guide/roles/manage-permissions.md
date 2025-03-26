---
id: manage-permissions
title: Manage permissions
sidebar_label: "Manage permissions"
description: "Use Identity to manage permissions for a role"
---

Permissions allow you to control the level of access a user or an application has to a particular component. Traditionally, this is often described as being able to provide "read" or "write" access.

Permissions are assigned to [APIs](/self-managed/identity/user-guide/additional-features/adding-an-api.md) and can be grouped to form
[roles](/self-managed/identity/user-guide/roles/manage-roles.md).

:::note
You can create permissions for granular access control over your APIs. Permissions granted to a user or M2M application are added to the `permissions.{audience}` claim of the access token.
:::

## Preset permissions

The preset permissions for Camunda components are:

| Component   | Permissions                                                                                           | Descriptions                                                                                                                                                                                                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connectors  | `read:*`                                                                                              | Read access to all APIs                                                                                                                                                                                                                                                                                                    |
| Console     | `write:*`                                                                                             | Write access to all pages                                                                                                                                                                                                                                                                                                  |
| Identity    | `read` <br/> `read:users` <br/> `write`                                                               | Read access to all pages <br/> Access only the **Users** page and related subpages <br/> Write access to all pages                                                                                                                                                                                                         |
| Operate     | `read:*` <br/> `write:*`                                                                              | Read access to all APIs <br/> Write access to all APIs                                                                                                                                                                                                                                                                     |
| Optimize    | `write:*`                                                                                             | Write access to all APIs                                                                                                                                                                                                                                                                                                   |
| Tasklist    | `read:*` <br/> `write:*`                                                                              | Read access to all APIs <br/> Write access to all APIs                                                                                                                                                                                                                                                                     |
| Web Modeler | `write:*` <br/><br/> `admin:*` <br/><br/> `create:*` <br/> `read:*` <br/> `update:*` <br/> `delete:*` | Access to UI <br/><br/> Elevated access to UI (see [super-user mode](../../../../components/modeler/web-modeler/collaboration.md#super-user-mode) and [publishing Connector templates](../../../../components/connectors/manage-connector-templates.md#publish-a-connector-template)) <br/><br/> CRUD access to public API |
| Zeebe       | `write:*`                                                                                             | Write access to all APIs                                                                                                                                                                                                                                                                                                   |

:::caution Write access needed
To assign a permission to a role and assign a role to a user, you need to have write access to Identity.
Read our [guide on managing user access](/self-managed/identity/user-guide/authorizations/managing-user-access.md) to learn more.
:::

## Add and assign a permission to a role

:::note
Identity does not check permission definitions for typos or misspelled words.
:::

### Add a permission

To create a permission using Identity, take the following steps:

1. Navigate to the **APIs** tab:

2. Click the API you would like to create a permission for. This will open the details page.

3. Click the **Permissions** tab beneath the API name.

4. Click **Add permission** located on the top right of the table and a modal will open.

5. Fill out the [definition](#preset-permissions) and description of the permission. When you have inserted the details, click **Add**.

On confirmation, the modal will close, the table will update, and your new permission will be shown.

### Assign a permission to a role

To assign a permission to a role, take the following steps:

1. Navigate to the **Roles** tab, click the role, and select **Permissions > Assign permissions**.

2. Select the API which contains the permission(s) you want to assign.

3. Select the permission(s) you would like to assign and click **Add**.

On confirmation, the modal will close, the table will update, and your assigned permission will be shown.

### Delete a permission from a role

To delete a permission from a role, take the following steps:

1. Navigate to the **Roles** tab. Click the role you would like to delete permissions from.

2. Navigate to the **Permissions** tab.

3. Click the trash icon next to the permission you want to remove.

On confirmation, the modal will close, the table will update, and the assigned permission will be removed from the role.
