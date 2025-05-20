---
id: applications
title: "Applications"
sidebar_label: "Applications"
---

In Identity, an Application represents an entity that can request Identity to authenticate a user or a service.

For Camunda 8 to work, a set of Applications are preconfigured. These preconfigured applications are:

- Connectors
- Identity
- Operate
- Optimize
- Tasklist
- Web Modeler
- Zeebe

As a user of Identity, you can add your own Applications. An example use-case would be to provide a service with M2M access to a Camunda API.

## Types of applications

Aligning with the [OAuth 2.0 standard](https://oauth.net/2/client-types/), we distinguish _confidental_, and _public_ clients. We further categorize applications by usage pattern, introducing the _M2M_ application type in Identity, where systems communicate using _confidental_ clients without direct user interaction:

- Confidential
- Machine-to-machine (M2M)
- Public

A type is selected when [creating the application](#add-an-application) based on
its ability to securely store and use secrets, as well as the mode of authentication it uses.

| Type         | Secret | User login flow | M2M authentication |
| ------------ | ------ | --------------- | ------------------ |
| Confidential | Yes    | Yes             | Yes                |
| M2M          | Yes    | No              | Yes                |
| Public       | No     | Yes             | No                 |

:::note
See more details on OAuth client types [here](https://oauth.net/2/client-types/), and more information specifically on confidential and public applications [here](https://auth0.com/docs/get-started/applications/confidential-and-public-applications).
:::

## Managing applications

### Add an application

1. Log in to the Identity UI and navigate to the **Applications** tab:

![add-application-tab](../img/add-application-tab.png)

2. Click the **Add application** button located on the top right of the table and a modal will open.

3. Fill in a name for your application. For this guide we will use a set of example values.
   Select the type of your application based on our [guide](/self-managed/identity/application-user-group-role-management/applications.md#types-of-applications).
   Depending on the selected type, you might need to enter at least one redirect URI. When you have inserted the required
   details, click **Add**:

![add-application-modal-2](../img/add-application-modal-2.png)

On confirmation, the modal will close, the list will update, and your new application will be shown. Click on your new application to view the details. This includes your generated client ID
and client secret depending on the selected [type](/self-managed/identity/application-user-group-role-management/applications.md#types-of-applications).

![add-application-refreshed-table](../img/add-application-refreshed-table.png)

## Permissions

You can control the access an application has by [assigning permissions](/self-managed/identity/access-management/manage-permissions.md#assigning-a-permission-an-application) to an application. Please find an [overview of available permissions here](/self-managed/identity/access-management/access-management-overview.md).
