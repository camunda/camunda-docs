---
id: adding-a-permission
title: "Guide: Adding a permission"
sidebar_label: "Adding a permission"
---

In this guide we will show you how to use Identity to create a permission.

:::tip Want to learn more about permissions?
Head over to [Concepts - permissions](/self-managed/concepts/access-control/apis.md) to find out more.
:::

Firstly, log in to the Identity UI and navigate to the "API" tab:

![add-permission-api-tab](img/add-api-tab.png)

Once here, click on the API that you would like to create a permission for, this will open the details page. 
Click on the "Permissions" tab beneath the API name.

![add-permission-tab](img/add-permission-tab.png)

Once here, click on the "Add Permission" button located on the top right of the table and a modal will open:

![add-permission-modal-1](img/add-permission-modal-1.png)

We are now able to fill out the details of the permission, for this guide we will use a set of example values.
When you are happy with the details, click "Add":

![add-permission-modal-2](img/add-permission-modal-2.png)

:::note Not sure what permissions to add?
Each component within the cloud stack has support for specific permissions, we recommend checking the documentation
for the required component to find out the list of permissions it supports.
:::

On confirmation, the modal will close and the table will update and your new permission will be shown:

![add-permission-refreshed-table](img/add-permission-refreshed-table.png)