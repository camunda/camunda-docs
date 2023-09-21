---
id: slack
title: Slack Connector
description: Send messages to channels or users in your Slack workspace from your BPMN process.
---

The **Slack Connector** is an outbound Connector that allows you to send messages to channels or users in your [Slack](https://slack.com) workspace from your BPMN process.

## Prerequisites

To use the Slack Connector, a Slack app must be registered with the Slack workspace you would like to send messages to. A respective OAuth token needs to be configured as a secret in your cluster. Follow [these steps in the appendix](#appendix) to learn how to set this up.

## Create a Slack Connector task

To use a **Slack Connector** in your process, either change the type of an existing task by clicking on it and using the wrench-shaped **Change type** context menu, or create a new Connector task by using the **Append Connector** context menu. Follow [our guide on using Connectors](/components/connectors/use-connectors/index.md) to learn more.

## Make your Slack Connector executable

To make the **Slack Connector** executable, fill out the mandatory fields highlighted in red in the properties panel.

### Authentication

Set **Authentication** to your Slack OAuth token, which is stored as a secret. For example, '{{secrets.SLACK_OAUTH_TOKEN}}'.

### Create channel

To create a channel, take the following steps:

1. Set **Method** to `Create Channel`.
2. Set the **New Channel Name**:
   1. Channel name can be up to 80 characters and may contain lowercase letters, digits, and symbols `-` and `_`.
   2. This can be provided as a FEEL expression.
3. Set channel **Visibility** as required:
   1. **Public** channels are visible to every workspace member.
   2. **Private** channels are visible to explicitly invited people only.

### Invite user to channel

To invite users to a channel, take the following steps:

1. Set **Method** to `Invite to Channel`.
2. Set the **Channel Name**:
   1. Channel name can be up to 80 characters and may contain lowercase letters, digits, and symbols `-` and `_`.
   2. This can be provided as a FEEL expression.
3. Set the **Users** as required:
   1. One single user name or email or id (for example: `@myUser` or `my.user@company.com` or `ABCDEF12345`).
   2. A comma separated list of users (for example: `@myUser, my.user@company.com, ABCDEF12345`).
   3. FEEL expression. In this case you can provide a valid list of strings (for example: `["@myUser", "my.user@company.com", "ABCDEF12345"]`).
   - Formats:
     - If a username starts with an `@` symbol, it will be handled as user name.
     - If a username is in an email format, it will be handled as an email.
     - If a username doesn't start with an `@`, and isn't an email, it will be handled as a user id.
   - If a null input or an input which is not a type of String or a Collection provided, you will get an Exception.
   - If all username is provided as any other type than a String, you will get an Exception.
   - If one of the usernames is provided as any other type than a String, it will be omitted.
   - If you provide a channel name it will be omitted since it is not possible to invite a channel to another channel.

### Post message

To post a message, take the following steps:

1. Set **Method** to `Post Message`.
2. Set **Channel/User Name** to either the **channel** or **user** you want to send the message to.
   1. A **channel** is specified by a unique identifier starting with a `#` (for example, `#myChannel`).
   2. A **user** is specified by a username starting with an `@` symbol (for example, `@myUser`).
3. Set **Message** to the message string you would like to send (for example, `Hello World!`).

The **Channel/User Name** and **Message** can either be given [static values](/docs/components/concepts/expressions.md), or FEEL expressions. FEEL expressions can be used to [access process variables or dynamically create values](/components/concepts/expressions.md). This can be handy if a process variable is used to store the relevant channel or if the message needs to be composed dynamically, for example:

`Channel/User Name` property might look like:

```
#slack-connectors
```

`Message` property:

```
= "Order-" + orderId + " was dispatched"
```

In the above example, the Channel/User Name is set to the [static value](/docs/components/concepts/expressions.md) "#slack-connectors," which will post the message to the specified Slack channel. The **Message** property uses a FEEL expression to dynamically create the message content. It concatenates the string "Order-" with the value stored in the process variable orderId and adds "was dispatched" to complete the message. This way, the message will vary based on the specific orderId stored during the process execution.

:::note
Slack's [guidance on formatting](https://api.slack.com/reference/surfaces/formatting#basics) can assist in formatting messages.
:::

## Slack API response

The **Slack Connector** exposes the Slack API response as a [local variable](/components/concepts/variables.md#variable-scopes) called `response`.
Response contents are method-specific.

### Create channel

The following fields are available in the `response` variable after executing **Create Channel** method:

- **channel**:
  - **id**: channel ID
  - **name**: channel name

Notice that the **name** field can be subsequently used as an argument of **Post Message** method.

### Post message

The following fields are available in the `response` variable after executing the **Post Message** method.
Notice that all fields describe state in the Slack workspace:

- **ts**: timestamp ID
- **channel**: channel ID
- **message**:
  - **type**: message type
  - **team**: team ID
  - **user**: user ID
  - **text**: message text
  - **ts**: timestamp ID
  - **appID**: Slack App ID
  - **botID**: Slack Bot ID

### Output mapping

You can use an Output Mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. For example:

```
= {
    messageText: response.message.text
}
```

## Appendix

To use the **Slack Connector**, the following prerequisites need to be set up.

1. [Slack workspace](#use-a-well-known-slack-workspace) - The workspace the **Slack Connector** will communicate with.
2. [Slack basic app with bot token configured](#configure-a-basic-slack-app) - The **Slack Connector** will communicate through this Slack app with the workspace. You can consider the Slack app as _Slack bot representing the Camunda platform_.
3. [Slack bot token stored as secret](#store-slack-bot-token-as-secret) - The secret will store the Slack bot token and can be used to reference it from BPMN processes without revealing it in the BPMN `xml`.

### Use a well-known Slack workspace

A Slack workspace consists of channels in which workspace members can communicate and collaborate. A workspace is identified by a unique name, for example `https://myWorkspace.slack.com/`. In most cases you will know which workspace you want to connect with already. If you want to set up a new workspace, refer to the [official Slack documentation](https://slack.com/help/articles/115001344007-Create-a-workspace-on-Enterprise-Grid).

### Configure a basic Slack app

:::caution
You can only install a Slack app to a workspace in which you are a member or that you own. It is not possible if you have guest-only permissions. See the [guide to apps in Slack](https://slack.com/help/articles/360001537467-Guide-to-apps-in-Slack) for more details.
:::

The **Slack Connector** communicates through a Slack app with a concrete Slack workspace. For example, when sending a Slack message, the message will be posted by the Slack app. For the **Slack Connector** to work, you need to perform the following steps:

1. [Create a Slack app](https://api.slack.com/apps).
2. [Request required scopes](https://api.slack.com/scopes) - The scopes represent what your app can and cannot do (for example, posting messages).
   1. For the **Create Channel** method to work, you need to grant at least the [`channels:manage`](https://api.slack.com/scopes/channels:manage) scope.
   2. For the **Post Message** method to work, you need to grant at least the [`chat:write`](https://api.slack.com/scopes/chat:write) scope.
3. [Install the Slack app to your workspace](https://api.slack.com/authentication/basics#installing).
4. [Invite the Slack app to your workspace via /invite](https://slack.com/help/articles/201259356-Slash-commands-in-Slack#h_01EPZ2Z81EJ67RA2BGDKZ9M1AN).

Once the app is set up, copy the [bot token](https://api.slack.com/authentication/token-types) of the app. It is represented as a string and begins with `xoxb-`. This is the OAuth Bearer token, which the **Slack Connector** will use to authenticate with the Slack API.

### Store Slack bot token as secret

The **Slack Connector** uses an OAuth bearer token (for example, the Slack app bot token) to authenticate with the Slack API.

We advise you to keep your Slack bot token safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret `SLACK_OAUTH_TOKEN` so you can reference it later in the Connector.
