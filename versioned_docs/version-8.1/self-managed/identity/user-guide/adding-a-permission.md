---
id: adding-a-permission
title: "Adding a permission"
sidebar_label: "Adding a permission"
---

In this guide we will show you how to use Identity to create a permission.

:::tip Want to learn more about permissions?
Head over to our documentation on [permissions](/self-managed/concepts/access-control/apis.md) to find out more.
:::

:::caution Write access needed
To add a permission, you need to have write access to Identity.
Read our [guide on managing user access](managing-user-access.md) to learn more.
:::

To create a permission using Identity, take the following steps:

1. Log in to the Identity UI and navigate to the **API** tab:

![add-permission-api-tab](img/add-api-tab.png)

2. Click on the API that you would like to create a permission for. This will open the details page.

3. Click on the **Permissions** tab beneath the API name.

![add-permission-tab](img/add-permission-tab.png)

4. Click the **Add Permission** button located on the top right of the table and a modal will open:

![add-permission-modal-1](img/add-permission-modal-1.png)

5. We are now able to fill out the details of the permission. For this guide, we will use a set of example values. When you have inserted the details, click **Add**:

![add-permission-modal-2](img/add-permission-modal-2.png)

:::note Not sure what permissions to add?
Each component within the cloud stack has support for specific permissions. We recommend checking the [documentation for the required component](../../../components/components-overview.md) to find out the list of permissions it supports.
:::

On confirmation, the modal will close, the table will update, and your new permission will be shown:

![add-permission-refreshed-table](img/add-permission-refreshed-table.png)
