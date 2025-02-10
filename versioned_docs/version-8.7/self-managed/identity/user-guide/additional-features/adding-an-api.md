---
id: adding-an-api
title: "Adding an API"
sidebar_label: "Adding an API"
description: "In this guide we will show you how to use Identity to create an API."
---

In this guide we will show you how to use Identity to create an API. An API refers to a service that provides resources which can control
access via permissions. In [Identity](/self-managed/identity/what-is-identity.md), we use APIs to attach [permissions](/self-managed/identity/user-guide/roles/add-assign-permission.md). Once they have been created, the
components in the Camunda 8 stack are able to allow or deny users certain functionality.

:::caution Write access needed
To add an API, you need to have write access to Identity.
Read our [guide on managing user access](/self-managed/identity/user-guide/authorizations/managing-user-access.md) to learn more.
:::

1. Log in to the Identity UI and navigate to the **API** tab:

![add-api-tab](../img/add-api-tab.png)

2. Click the **Add API** button located on the top right of the table and a modal will open.

3. We are now able to fill out the details of the API. For this guide, we will use a set of example values. When you have inserted the details, click **Add**:

![add-api-modal-2](../img/add-api-modal-2.png)

On confirmation, the modal will close, the table will update, and your new API will be shown. Click on your new API to view the details.

![add-api-refreshed-table](../img/add-api-refreshed-table.png)
