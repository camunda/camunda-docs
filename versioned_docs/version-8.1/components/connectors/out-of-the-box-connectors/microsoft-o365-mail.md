---
id: microsoft-o365-mail
title: Microsoft Office 365 Mail Connector
sidebar_label: O365 Mail Connector
description: Send and read O365 mails from your BPMN process
---

The **Microsoft Office 365 Mail Connector** is an outbound Connector that allows you to connect your BPMN service with [O365 Mail](https://outlook.office.com/mail/) to send, read e-mails, and manage folders.

## Prerequisites

To use the **Microsoft Office 365 Mail Connector**, you must have a [O365 Mail](https://outlook.office.com/mail/) instance.
You might also need to have sufficient access rights at [Microsoft Entra](https://entra.microsoft.com) to create a new app,
set [Microsoft Graph](https://developer.microsoft.com/en-us/graph) permissions, and assign an app to u user.

You can learn more about creating, configuring, and authorizing Microsoft App [here](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

:::note
It is highly recommended not to expose your Microsoft credentials as plain text. Instead, use Camunda secrets.
Refer to our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create a Microsoft Office 365 Mail Connector task

To use the **Microsoft Office 365 Mail Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide to using Connectors](/components/connectors/use-connectors/index.md) to learn more.

## Access control

Each operation requires permissions to be assigned by a system administrator. Learn more about [Microsoft permissions](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview).

### Bearer token authentication

If you own a bearer token, in the **Authentication** section select a **Bearer token** in the **Type** field.
Enter a bearer token in the field **Bearer token**. It is recommended to use Camunda secrets.

Please, keep in mind that default TTL for bearer tokens is 3600 seconds thus this approach might not work for long-living
and/or repetitive processes.

### OAuth2 client credentials flow authentication

To be able to proceed with this step, you'll need the following data:

- OAuth 2.0 token endpoint
- Client ID, AKA Application ID
- Client secret, can be created at your application page

The app needs to be assigned to a user.

If you own a bearer token, in the **Authentication** section select a **OAuth 2.0** in the **Type** field.
Enter above data into respective fields.

You can learn more about creating, configuring, and authorizing Microsoft App [here](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

## Select operation to execute

Select desired operation from the **Operations** section.

### Get user's folders

Related Microsoft Graph API: [user: list mailFolders](https://learn.microsoft.com/en-us/graph/api/user-list-mailfolders)

1. Enter user's email or system UUID, to fetch all their folders in the **User ID** field.
2. You can also pass [OData parameters](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http) in the **Query parameters** field.

For example, if you wish to pass an OData `$top` URL parameter, simply do:

```json
{
  "$top": 10
}
```

### Create mail folder for a user

Related Microsoft Graph API: [user: create mailFolder](https://learn.microsoft.com/en-us/graph/api/user-post-mailfolders)

1. Enter user's email or system UUID, to fetch all their folders in the **User ID** field.
2. In the **Request** section, enter a **Folder display name** string value.

### Get user's messages

Related Microsoft Graph API: [user: list messages](https://learn.microsoft.com/en-us/graph/api/user-list-messages)

1. Enter user's email or system UUID, to fetch all their folders in the **User ID** field.
2. You can also pass [OData parameters](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http) in the **Query parameters** field.

For example, if you wish to pass an OData `$top` URL parameter, simply do:

```json
{
  "$top": 10
}
```

### Send mail on behalf of a user

Related Microsoft Graph API: [user: sendMail](https://learn.microsoft.com/en-us/graph/api/user-sendmail)

1. Enter user's email or system UUID, to fetch all their folders in the **User ID** field.
2. In the **Request** section, enter a **Subject** string value.
3. Select **Body content type** from a dropdown.
4. Enter desired content in the field **Body content**.
5. Pass an array of emails into the **To recipients** field, for example `["myuser1@mycompany.com", "myuser2@mycompany.com"]`
6. Optionally pass an array of emails into the **CC recipients** field, for example `["myuser3@mycompany.com", "myuser4@mycompany.com"]`

## Handle Connector response

The **Microsoft Office 365 Mail Connector** is a protocol Connector, meaning it is built on top of the **HTTP REST Connector**, therefore
handling response is still applicable [as described](/components/connectors/protocol/rest.md#response).
