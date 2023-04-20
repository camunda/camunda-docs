---
id: getting-started-with-roles
title: Getting started with roles
sidebar_label: "Getting started with roles"
---

In this guide we will show you how to use Identity to create a role, assign a permission to a role, and assign a role to a user.

:::tip Want to learn more about roles?
Head over to [Concepts - roles](/self-managed/concepts/access-control/roles.md) to find out more.
:::

:::caution Write access needed
To add a role, assign a permission to a role, and assign a role to a user, you need to have write access to Identity.
Read our [guide on managing user access](managing-user-access.md) to learn more.
:::

## Add a role

1. Log in to the Identity UI and navigate to the **Roles** tab:

![add-role-tab](../img/add-role-tab.png)

2. Click the **Add Role** button located on the top right of the table and a modal will open.

3. We are now able to fill out the details of the role. For this guide, we will use a set of example values. When you have inserted the details, click **Add**:

![add-role-modal-2](../img/add-role-modal-2.png)

On confirmation, the modal will close, the table will update, and your new role will be shown. Click on your new role to view the details:

![add-role-details](../img/add-role-details.png)

## Add and assigning a permission to a role

In this guide we will show you how to use Identity to add a permission, and assign a permission to a role.

### Add a permission

:::tip Want to learn more about permissions?
Head over to our documentation on [permissions](/self-managed/concepts/access-control/apis.md) to find out more.
:::

To create a permission using Identity, take the following steps:

1. Log in to the Identity UI and navigate to the **API** tab:

![add-permission-api-tab](../img/add-api-tab.png)

2. Click on the API that you would like to create a permission for. This will open the details page.

3. Click on the **Permissions** tab beneath the API name.

4. Click the **Add Permission** button located on the top right of the table and a modal will open.

5. We are now able to fill out the details of the permission. For this guide, we will use a set of example values. When you have inserted the details, click **Add**:

![add-permission-modal-2](../img/add-permission-modal-2.png)

:::note Not sure what permissions to add?
Each component within the cloud stack has support for specific permissions. We recommend checking the [documentation for the required component](../../../components/components-overview.md) to find out the list of permissions it supports.
:::

On confirmation, the modal will close, the table will update, and your new permission will be shown:

![add-permission-refreshed-table](../img/add-permission-refreshed-table.png)

### Assign a permission to a role

To assign a permission to a role using Identity, take the following steps:

1. Log in to the Identity UI and navigate to the **Roles** tab, select **Permissions**, and click on **Assign Permission**:

![assign-a-permission-tab](../img/assign-a-permission-tab.png)

2. Select the API which contains the permission you want to assign.

3. Select the permission you would like to assign and click **Add**.

On confirmation, the modal will close, the table will update, and your assigned permission will be shown:

![assign-a-permission-refreshed-table](../img/assign-a-permission-refreshed-table.png)

## Assign a role to a user

To assign a role to a user using Identity, take the following steps:

1. Log in to the Identity UI and navigate to the **Users** tab:

![assign-a-role-tab](../img/assign-a-role-tab.png)

2. Click on the user you want to assign a role to to view their details.

3. Click on **Assigned Roles** to view the roles currently assigned to the user.

4. Click the **Assign Role** button located on the top right of the table and a modal will open.

5. Select the role you want to assign to the user and click **Add**.

On confirmation, the modal will close, the table will update, and the newly assigned role will be shown:

![assign-a-role-refreshed-table](../img/assign-a-role-refreshed-table.png)
