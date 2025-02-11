---
id: microsoft-o365-mail
title: Microsoft 365 Connector
sidebar_label: Microsoft 365
description: Send and read Microsoft 365 emails from your BPMN process.
---

The **Microsoft 365 Connector** is an outbound Connector that allows you to connect your BPMN service with [Microsoft 365](https://outlook.office.com/mail/) mail to send, read e-mails, and manage folders.

## Prerequisites

- To use the **Microsoft 365 Connector**, you must have a [Microsoft 365](https://outlook.office.com/mail/) mail instance.
- You might also need to have sufficient access rights at [Microsoft Entra](https://entra.microsoft.com) to create a new app;
  set [Microsoft Graph](https://developer.microsoft.com/en-us/graph) permissions and assign an app to u user.

Learn more about [creating, configuring, and authorizing Microsoft App](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

:::note
Use Camunda secrets to avoid exposing your Microsoft credentials as plain text.
Refer to our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create a Microsoft 365 Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Access control

Each operation requires permissions to be assigned by a system administrator. Learn more about [Microsoft permissions](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview).

### Bearer token authentication

If you own a bearer token, in the **Authentication** section select a **Bearer token** in the **Type** field.
Enter a bearer token in the field **Bearer token**. Use [Camunda secrets](/components/console/manage-clusters/manage-secrets.md) to avoid exposing sensitive credentials.

:::note
Default TTL for bearer tokens is 3600 seconds. Therefore, this approach might not work for long-living and/or repetitive processes.
:::

### OAuth2 client credentials flow authentication

:::note
In the client credential flow, an application gets access to all accounts associated with the organization.
For example, if an app has permissions `Mail.Read`, it will be able to read emails of all users.
:::

To proceed with this step, you'll need the following data:

- OAuth 2.0 token endpoint
- Client ID (Application ID)
- Client secret; can be created on your application page

The app must be assigned to a user.

If you own a bearer token, in the **Authentication** section select a **OAuth 2.0** in the **Type** field.
Enter the above data into the respective fields.

Learn more about [creating, configuring, and authorizing Microsoft App](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

## Select operation to execute

Select the desired operation from the **Operations** section.

### Get user folders

Related Microsoft Graph API: [user: list mailFolders](https://learn.microsoft.com/en-us/graph/api/user-list-mailfolders)

1. Enter user's email or system UUID to fetch all their folders in the **User ID** field.
2. You can also pass [OData parameters](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http) in the **Query parameters** field.

For example, if you wish to pass an OData `$top` URL parameter, execute the following:

```json
{
  "$top": 10
}
```

### Create mail folder for a user

Related Microsoft Graph API: [user: create mailFolder](https://learn.microsoft.com/en-us/graph/api/user-post-mailfolders)

1. Enter user's email or system UUID to fetch all their folders in the **User ID** field.
2. In the **Request** section, enter a **Folder display name** string value.

### Get user messages

Related Microsoft Graph API: [user: list messages](https://learn.microsoft.com/en-us/graph/api/user-list-messages)

1. Enter user's email or system UUID to fetch all their folders in the **User ID** field.
2. You can also pass [OData parameters](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http) in the **Query parameters** field.

For example, if you wish to pass an OData `$top` URL parameter, execute the following:

```json
{
  "$top": 10
}
```

### Send mail on behalf of a user

Related Microsoft Graph API: [user: sendMail](https://learn.microsoft.com/en-us/graph/api/user-sendmail)

1. Enter user's email or system UUID to fetch all their folders in the **User ID** field.
2. In the **Request** section, enter a **Subject** string value.
3. Select **Body content type** from the dropdown.
4. Enter desired content in the field **Body content**.
5. Pass an array of emails into the **To recipients** field, for example `["myuser1@mycompany.com", "myuser2@mycompany.com"]`.
6. (Optional) Pass an array of emails into the **CC recipients** field, for example `["myuser3@mycompany.com", "myuser4@mycompany.com"]`.

## Handle Connector response

The **Microsoft 365 Connector** is a protocol Connector, meaning it is built on top of the **HTTP REST Connector**, therefore
[handling response is still applicable](/components/connectors/protocol/rest.md#response).
