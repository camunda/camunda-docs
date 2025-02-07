---
id: microsoft-teams
title: Microsoft Teams Connector
sidebar_label: Microsoft Teams
description: Work with Microsoft Teams from your BPMN process using the Microsoft Teams Connector. Learn about authentication, conversation type and method, and more.
---

The **Microsoft Teams Connector** is an outbound Connector that allows you to connect your BPMN process with [Microsoft Teams](https://www.microsoft.com/microsoft-teams/) to manage interactions.

## Prerequisites

To use the **Microsoft Teams Connector**, you need to have a [Microsoft Teams](https://www.microsoft.com/microsoft-teams/) account and
relevant [permissions](https://support.microsoft.com/en-us/office/manage-team-settings-92d238e6-0ae2-447e-af90-40b1052c4547)
or the registered application in the [Azure Active Directory](https://aad.portal.azure.com/) (visit [how to register the app](https://learn.microsoft.com/en-us/graph/auth-register-app-v2) for more information) alongside
the relevant [Microsoft Graph API permissions](https://learn.microsoft.com/en-us/graph/permissions-reference).

:::note
Use Camunda secrets to store credentials so you don't expose sensitive information directly from the process. See [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create a Microsoft Teams Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Microsoft Teams Connector executable

To work with Microsoft Teams, choose the required connection type in the **Authentication** section and complete the
mandatory fields highlighted in red in the Connector properties panel on the right side of the screen.

:::note
All the mandatory and non-mandatory fields depending on the authentication selection you choose are covered in the
upcoming sections.
:::

## Authentication

Choose among the available Microsoft Teams Connectors according to your authentication requirements.
The Microsoft Teams Connector uses the [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/overview). Visit the [Microsoft Graph auth overview](https://learn.microsoft.com/en-us/graph/auth/) for more information on the Microsoft Graph API authentication.

First, you must have a user account with Microsoft Teams with the necessary permissions. See more at
in [Microsoft Teams overview](https://learn.microsoft.com/microsoftteams/teams-overview). If you don't have administration roles and permissions, ask your Microsoft Teams administrator to add required permissions to work with the **Microsoft Teams Connector**.

Next, you will choose the type of connection.

### Bearer Token type authentication

For a **Bearer Token** type authentication, take the following steps:

1. Click the **Bearer Token** connection type in the **Authentication** section.
2. Set **Bearer Token** to `Bearer Token`.

Visit [Microsoft Teams Access Token](https://learn.microsoft.com/azure/active-directory/develop/access-tokens) for more information.

#### Options to obtain an access token

- Via the Graph Explorer:

  1.  Visit [developer.microsoft.com/graph/graph-explorer](https://developer.microsoft.com/graph/graph-explorer).
  2.  Log in with your Microsoft account.
  3.  Click the **Access Token** tab and copy the bearer token.

- Register your app with the Microsoft identity platform and send a POST request to the `/token` identity platform endpoint to acquire an access token.
  - [How to register your app](https://learn.microsoft.com/en-us/graph/auth-register-app-v2)
  - [How to get access on behalf of a user](https://learn.microsoft.com/en-us/graph/auth-v2-user)
  - [How to get access without a user](https://learn.microsoft.com/en-us/graph/auth-v2-service)

### Refresh Token type authentication

For a **Refresh Token** type authentication, take the following steps:

1. Click the **Refresh token** connection type in the **Authentication** section.
2. Set **Refresh token** to `Refresh Token`. Read more on [how to get a refresh token](https://learn.microsoft.com/en-us/graph/auth-v2-user).
3. Set **Tenant ID** to `Tenant ID`. Your Microsoft Teams tenant ID is a unique identifier. Read more on [how to find a tenant ID](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-to-find-tenant).
4. Set the **Client ID** field: the application ID that the [Azure app registration portal](https://go.microsoft.com/fwlink/?linkid=2083908) assigned to your app.
5. Set the **Secret ID** field: the client secret that you created in the app registration portal for your app.

### Client credentials type authentication

For a **Client credentials** type authentication, take the following steps:

1. Click the **Client credentials** connection type in the **Authentication** section.
2. Set **Tenant ID** to `Tenant ID`. Your Microsoft Teams tenant ID is a unique identifier. See more on [how to find a tenant ID](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-to-find-tenant).
3. Set the **Client ID** field: the application ID that the [Azure app registration portal](https://go.microsoft.com/fwlink/?linkid=2083908) assigned to your app.
4. Set the **Secret ID** field: the client secret that you created in the app registration portal for your app.

:::note
With **Client credentials** type authentication, some methods of the **Microsoft Teams Connector** may not be available. Find more details in the [chat methods table](#chat-methods) and [channel methods table](#channel-methods).
:::

## Conversation type and method

In the **Operation** section, choose a conversation type of either **Chat** or **Channel**. Then, choose one of the suggested methods.

For example, if you want to send a message in a Microsoft Teams channel, choose the conversation type **Channel** and method **Send message in channel**.

## Data section

### Chat conversation type

#### Properties

|    Property     |                                                                     Methods                                                                     | Required |      Type       |                                                                                      Description                                                                                      |
| :-------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :------: | :-------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     Chat ID     | Get chat by ID <br/> List chat members <br/> Send message in chat <br/> List messages in chat <br/> Get message in chat <br/> List chat members |   Yes    |     string      |                                                                                Microsoft Teams chat ID                                                                                |
|     Content     |                                                              Send message in chat                                                               |   Yes    |      text       |                                                                           Content that will be sent to chat                                                                           |
|  Content Type   |                                                              Send message in chat                                                               |   Yes    |    dropdown     |                                                                             Content type of body message                                                                              |
|    Chat type    |                                                                Create a new chat                                                                |   Yes    |    dropdown     |                                                 Click **one on one** to create a one-on-one chat or **group** to create a group chat.                                                 |
|      Topic      |                                                                Create a new chat                                                                |    No    |     string      |                                                                                     Topic of chat                                                                                     |
|     Members     |                                                                Create a new chat                                                                |   Yes    | FEEL expression |                                                               See [members property](#members-property) to learn more.                                                                |
|       Top       |                                                              List messages in chat                                                              |    No    |     numbers     |                                                      Controls the number of items per response; maximum allowed top value is 50.                                                      |
|    Order by     |                                                              List messages in chat                                                              |   Yes    |    dropdown     |                                                              Can order by 'lastModifiedDateTime' and 'createdDateTime'.                                                               |
| Expand response |                                                                 Get chat by ID                                                                  |   Yes    |    dropdown     |                                                                                        Choose                                                                                         |
|     Filter      |                                                              List messages in chat                                                              |    No    |     string      | Sets the date range filter for the lastModifiedDateTime and createdDateTime properties. [Learn more about filtering](https://learn.microsoft.com/en-us/graph/filter-query-parameter). |
|   Message ID    |                                                               Get message in chat                                                               |   Yes    |     string      |                                                                            Microsoft Teams chat message ID                                                                            |

##### Expand response

For method **Get chat by ID**, you can get more information in the response by using the dropdown property **Expand response**. You can choose one of the following values:

- select **With chat members**, to get information about chat members.
- select **With last message preview**, to get last message in chat. **Note:** This function doesn't work with [client credentials type authentication](#client-credentials-type-authentication), make sure that you use another authentication type.
- select **Without expand**, to get main information about chat.

##### Members property

The **members** property must contain a list of members:

|     Property      |     Type     | Required                               |
| :---------------: | :----------: | -------------------------------------- |
|      userId       |    string    | Yes, if 'userPrincipalName' is not set |
| userPrincipalName |    string    | Yes, if 'userId' is not set            |
|       roles       | string array | Yes                                    |

```json
[
  {
    "userId": "abc01234-0c7f-012c-9876-&812dsfw2",
    "roles": ["owner"]
  },
  {
    "principalName": "john.dou@mail.com",
    "roles": ["owner"]
  }
]
```

#### Chat methods

|        Method         | Use [protected APIs](https://learn.microsoft.com/en-us/graph/teams-protected-apis) | Available for [client credentials type authentication](#client-credentials-type-authentication) |                                            Link to method documentation with required permissions and return value                                             |
| :-------------------: | :--------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   Create a new chat   |                                       false                                        |                                              true                                               |          [https://learn.microsoft.com/en-us/graph/api/chat-post](https://learn.microsoft.com/en-us/graph/api/chat-post?view=graph-rest-1.0&tabs=http)          |
|    Get chat by ID     |                                       false                                        |                                              true                                               |           [https://learn.microsoft.com/en-us/graph/api/chat-get](https://learn.microsoft.com/en-us/graph/api/chat-get?view=graph-rest-1.0&tabs=http)           |
|      List chats       |                                       false                                        |                                              true                                               |          [https://learn.microsoft.com/en-us/graph/api/chat-list](https://learn.microsoft.com/en-us/graph/api/chat-list?view=graph-rest-1.0&tabs=http)          |
|   List chat members   |                                       false                                        |                                              false                                              |  [https://learn.microsoft.com/en-us/graph/api/chat-list-members](https://learn.microsoft.com/en-us/graph/api/chat-list-members?view=graph-rest-1.0&tabs=http)  |
| Send message in chat  |                                       false                                        |                                              false                                              | [https://learn.microsoft.com/en-us/graph/api/chat-post-messages](https://learn.microsoft.com/en-us/graph/api/chat-post-messages?view=graph-rest-1.0&tabs=http) |
|  Get message in chat  |                                       false                                        |                                              true                                               |    [https://learn.microsoft.com/en-us/graph/api/chatmessage-get](https://learn.microsoft.com/en-us/graph/api/chatmessage-get?view=graph-rest-1.0&tabs=http)    |
| List messages in chat |                                        true                                        |                                              true                                               | [https://learn.microsoft.com/en-us/graph/api/chat-list-messages](https://learn.microsoft.com/en-us/graph/api/chat-list-messages?view=graph-rest-1.0&tabs=http) |

### Channel conversation type

#### Properties

|        Property         |                                                                                        Methods                                                                                         | Required |   Type   |                                                      Description                                                       |
| :---------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------: | :------: | :--------------------------------------------------------------------------------------------------------------------: |
|        Group ID         | Create channel <br/> Get channel <br/> List channels <br/> Send message to channel <br/> Get channel message <br/> List channel messages <br/> List message replies <br/> List members |   Yes    |  string  |                                                Microsoft Teams group ID                                                |
|       Channel ID        |           Get channel <br/> List channels <br/> Send message to channel <br/> Get channel message <br/> List channel messages <br/> List message replies <br/> List members            |   Yes    |  string  |                                               Microsoft Teams channel ID                                               |
|      Display name       |                                                                                     Create channel                                                                                     |    No    |  string  |                                     Displayed name of new Microsoft Teams channel                                      |
|       Description       |                                                                                     Create channel                                                                                     |    No    |   text   |                                       Description of new Microsoft Teams channel                                       |
| Channel membership type |                                                                                     Create channel                                                                                     |   Yes    | dropdown | See [teams-channels-overview](https://learn.microsoft.com/microsoftteams/teams-channels-overview) for more information |
|          Owner          |                                                                Create channel (if Channel membership type != STANDARD)                                                                 |   Yes    |  string  |                        Channel owner; Microsoft Teams user ID or Microsoft Teams principal name                        |
|         Filter          |                                                                                     List channels                                                                                      |    No    |  string  |    The search filter. [Learn more about filtering](https://learn.microsoft.com/en-us/graph/filter-query-parameter)     |
|         Content         |                                                                                Send message to channel                                                                                 |   Yes    |   text   |                                           Content that will be sent to chat                                            |
|      Content Type       |                                                                                Send message to channel                                                                                 |   Yes    | dropdown |                                              Content type of body message                                              |
|       Message ID        |                                                                                  Get channel message                                                                                   |   Yes    |  string  |                                        Message ID of Microsoft Teams in channel                                        |
|           Top           |                                                                                 List channel messages                                                                                  |    No    | numbers  |                                       Controls the number of items per response                                        |
|      With replies       |                                                                                 List channel messages                                                                                  |   Yes    | boolean  |        Choose **FALSE** for get messages without replies<br/>Choose **FALSE** for get messages without replies         |
|       Message ID        |                                                                                  List message replies                                                                                  |   Yes    |  string  |                                           Microsoft Teams channel message ID                                           |

#### Channel methods

|         Method          | Use [protected APIs](https://learn.microsoft.com/en-us/graph/teams-protected-apis) | Available for [client credentials type authentication](#client-credentials-type-authentication) | Link to method documentation with required permissions and return value                                                                                                    |
| :---------------------: | :--------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     Create channel      |                                       false                                        |                                              true                                               | [https://learn.microsoft.com/en-us/graph/api/channel-post](https://learn.microsoft.com/en-us/graph/api/channel-post?view=graph-rest-1.0&tabs=http)                         |
|       Get channel       |                                       false                                        |                                              true                                               | [https://learn.microsoft.com/en-us/graph/api/channel-get](https://learn.microsoft.com/en-us/graph/api/channel-get?view=graph-rest-1.0&tabs=http)                           |
|      List channels      |                                       false                                        |                                              true                                               | [https://learn.microsoft.com/en-us/graph/api/channel-list](https://learn.microsoft.com/en-us/graph/api/channel-list?view=graph-rest-1.0&tabs=http)                         |
| Send message to channel |                                       false                                        |                                              false                                              | [https://learn.microsoft.com/en-us/graph/api/channel-post-messages](https://learn.microsoft.com/en-us/graph/api/channel-post-messages?view=graph-rest-1.0&tabs=http)       |
|   Get channel message   |                                        true                                        |                                              true                                               | [https://learn.microsoft.com/en-us/graph/api/chatmessage-get](https://learn.microsoft.com/en-us/graph/api/chatmessage-get?view=graph-rest-1.0&tabs=http)                   |
|  List channel messages  |                                        true                                        |                                              true                                               | [https://learn.microsoft.com/en-us/graph/api/channel-list-messages](https://learn.microsoft.com/en-us/graph/api/channel-list-messages?view=graph-rest-1.0&tabs=http)       |
|  List message replies   |                                        true                                        |                                              true                                               | [https://learn.microsoft.com/en-us/graph/api/chatmessage-list-replies](https://learn.microsoft.com/en-us/graph/api/chatmessage-list-replies?view=graph-rest-1.0&tabs=http) |
|      List members       |                                       false                                        |                                              true                                               | [https://learn.microsoft.com/en-us/graph/api/channel-list-members](https://learn.microsoft.com/en-us/graph/api/channel-list-members?view=graph-rest-1.0&tabs=http)         |

## Microsoft Teams Connector response

The **Microsoft Teams Connector** returns the Microsoft Graph API response in `result` wrapper:

```json
{
  "result": {
    "chatType": "ONE_ON_ONE",
    "createdDateTime": {
      "dateTime": {
        "date": {
          "year": 2022,
          "month": 11,
          "day": 29
        },
        "time": {
          "hour": 18,
          "minute": 10,
          "second": 33,
          "nano": 361000000
        }
      },
      "offset": {
        "totalSeconds": 0
      }
    },
    "lastUpdatedDateTime": {
      "dateTime": {
        "date": {
          "year": 2022,
          "month": 11,
          "day": 29
        },
        "time": {
          "hour": 18,
          "minute": 10,
          "second": 33,
          "nano": 361000000
        }
      },
      "offset": {
        "totalSeconds": 0
      }
    },
    "tenantId": "0000000-0000-0000-0000-000000000",
    "webUrl": "https://teams.microsoft.com/l/chat/19%3Aefb08ac3-0000f-0000-0000-example-chat-id_fe35bf61-0000-0000-0000-ddc97d8903d4%40unq.gbl.spaces/0?tenantId=00000-0000-0000-0000-00000000",
    "id": "19%3Aefb08ac3-0000f-0000-0000-example-chat-id_fe35bf61-0000-0000-0000-ddc97d8903d4%40unq.gbl.spaces"
  }
}
```

See [channel resource type](https://learn.microsoft.com/graph/api/resources/channel?view=graph-rest-1.0) to find the response for the required method for a channel conversation type, or see [chat resource type](https://learn.microsoft.com/graph/api/resources/chat?view=graph-rest-1.0) to find the response for the required method for a chat conversation type.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. For example:

```
= {
  "chatId": result.id,
  "tenantId": result.tenantId
}
```
