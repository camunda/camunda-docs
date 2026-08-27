---
id: app-integrations
title: App Integrations connector
sidebar_label: App Integrations
description: Send messages to Microsoft Teams and Slack, and create channels, from your BPMN process.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import ConnectorTask from '../../../components/react-components/connector-task.md'
import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Send messages to Microsoft Teams and Slack, and create channels, directly from your BPMN process.

## About this connector

The **App Integrations connector** sends messages through your organization's Camunda app integrations. The connection is configured once for the environment, so the task itself carries no credentials and no endpoint.

A message can go to a Microsoft Teams channel, user, or conversation, to a Slack channel or user, or to a **Camunda recipient** — an assignee, candidate users, or candidate groups, which are resolved to whichever platforms those people have connected. Alongside the text you can send an [Adaptive Card](https://adaptivecards.io/), a [Block Kit](https://api.slack.com/block-kit) payload, or a Camunda form.

### When to use this connector

Use this connector if your organization uses [Camunda app integrations](/components/camunda-integrations/ms-teams/ms-teams.md) — the Camunda apps for Microsoft Teams and Slack. Messages sent from a process travel through the same integration your users already have, so they arrive in the same channels and chats, alongside the task notifications those users already receive, rather than through a separate bot with its own identity.

If you do not use app integrations, and you would rather register your own app and supply its credentials in the process model, use the [Slack](./slack.md) or [Microsoft Teams](./microsoft-teams.md) connector instead.

## Prerequisites

<OutboundConnectorBasics />

App integrations must be set up before this connector can be used. This is an administrator task, and it is done once per environment — there is nothing to configure on the task itself.

<Tabs groupId="environment" defaultValue="saas" values={[
{ label: 'SaaS', value: 'saas' },
{ label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

An organization administrator must turn on **Enable app integrations extensions** in the [cluster settings](/components/hub/organization/manage-clusters/settings.md#enable-app-integrations-extensions) of every cluster that uses the connector.

</TabItem>

<TabItem value="self-managed">

An administrator must install app integrations and configure the connector runtime to reach it:

1. Install and configure app integrations, as described in [Install Camunda for Microsoft Teams](/components/camunda-integrations/ms-teams/ms-teams-installation.md). The same installation serves this connector and the Microsoft Teams app.
1. Point the connector runtime at that installation, as described in [configure the App Integrations connection](/self-managed/components/connectors/connectors-configuration.md#configure-the-app-integrations-connection).

When the runtime authenticates with OAuth 2.0, it also needs the cluster's ID. This is the most common reason a fully installed environment still fails: without it, every job fails with `APP_INTEGRATIONS_NOT_CONFIGURED`. Runtimes that authenticate with an API key do not need it, and SaaS needs no equivalent setting.

</TabItem>

</Tabs>

## Create an App Integrations connector task

<ConnectorTask/>

## Send message

Send a message to one or more destinations. Choose the **Recipient source** first — it determines which targets and which content formats are available.

### Recipient

<Tabs groupId="recipient" defaultValue="camunda" values={[
{ label: 'Camunda', value: 'camunda' },
{ label: 'Microsoft Teams', value: 'teams' },
{ label: 'Slack', value: 'slack' },
]}>

<TabItem value="camunda">

Address people by their Camunda identity, and let app integrations resolve which platforms to deliver to. At least one of the three fields is required.

| Property         | Type   | Required | Description                     | Example              |
| :--------------- | :----- | :------- | :------------------------------ | :------------------- |
| Assignee email   | String | No\*     | Email address of the recipient. | `= assigneeEmail`    |
| Candidate users  | List   | No\*     | Usernames to notify.            | `= ["alice", "bob"]` |
| Candidate groups | List   | No\*     | Group names to notify.          | `= ["approvers"]`    |

\* At least one of the three must be provided.

</TabItem>

<TabItem value="teams">

Select a **Teams target**, then fill the field it reveals.

| Teams target | Property     | Required | Description                                                                                   | Example                                     |
| :----------- | :----------- | :------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------ |
| Channel      | Channel ID   | Yes      | The Microsoft Teams channel to post into.                                                     | `19:xxx@thread.tacv2`                       |
| User         | User ID      | Yes      | Microsoft Entra object ID of the recipient. They must have connected the Camunda app.         | `6b1e0f9a-1f3d-4a2b-9d0e-4c1b2a3d4e5f`      |
| Conversation | Conversation | Yes      | The `conversation` value returned by a previous send. The message is posted as a reply in it. | `19:abc@thread.tacv2;messageid=17123456789` |

</TabItem>

<TabItem value="slack">

Select a **Slack target**, then fill the field it reveals.

| Slack target | Property   | Required | Description                                                 | Example       |
| :----------- | :--------- | :------- | :---------------------------------------------------------- | :------------ |
| Channel      | Channel ID | Yes      | The Slack channel to post into.                             | `C0123456789` |
| User         | User ID    | Yes      | Slack member ID of the recipient. An email is not accepted. | `U0123456789` |

**Thread** is available for both targets and is optional. Set it to the message ID of a previous send to reply in that message's thread instead of posting a new message.

| Property | Type   | Required | Description                                        | Example             |
| :------- | :----- | :------- | :------------------------------------------------- | :------------------ |
| Thread   | String | No       | Message ID of a previous send, to reply in-thread. | `1712345678.000100` |

</TabItem>

</Tabs>

### Message content

**Message** is plain text and always available. It is optional — leave it empty to send only the additional content, or fill both to send text and a card in one message.

**Additional content** offers different formats depending on the recipient, because each platform accepts different payloads:

| Recipient       | Additional content options  |
| :-------------- | :-------------------------- |
| Camunda         | None · Form                 |
| Microsoft Teams | None · Adaptive card · Form |
| Slack           | None · Block Kit · Form     |

You can select at most one, so a card and a form are mutually exclusive. You must provide a message, additional content, or both — an empty message with **None** is rejected before any call is made.

| Additional content | Property         | Type | Required | Description                             |
| :----------------- | :--------------- | :--- | :------- | :-------------------------------------- |
| Adaptive card      | Adaptive card    | Text | Yes      | Adaptive Card as JSON.                  |
| Block Kit          | Block Kit blocks | Text | Yes      | Slack Block Kit `blocks` array as JSON. |

Both fields accept pasted JSON as well as a FEEL expression referencing a card built earlier in the process, such as `= approvalCard`. A JSON literal is valid FEEL, so pasting works without further quoting.

When additional content is **Form**, the connector renders a linked Camunda form — as an Adaptive Card in Teams, as Block Kit in Slack. Select the form and its binding in the properties panel:

| Property     | Type     | Required | Description                                                     |
| :----------- | :------- | :------- | :-------------------------------------------------------------- |
| Form binding | Dropdown | Yes      | `Latest`, `Deployment`, or `Version tag`. Defaults to `Latest`. |
| Form ID      | String   | Yes      | ID of the Camunda form to render alongside the message.         |
| Version tag  | String   | Yes\*    | The version tag to bind to.                                     |

\* Required when **Form binding** is **Version tag**.

### Response

The connector reports every destination the message reached, and every one it did not:

```json
{
  "deliveries": [
    {
      "platform": "teams",
      "conversation": "19:abc@thread.tacv2;messageid=17123456789",
      "messageId": "17123456789"
    }
  ],
  "failures": [
    { "platform": "slack", "conversation": "C0123", "reason": "not_in_channel" }
  ]
}
```

| Field                       | Description                                                    |
| :-------------------------- | :------------------------------------------------------------- |
| `deliveries`                | Every destination the message was delivered to.                |
| `deliveries[].platform`     | `teams` or `slack`.                                            |
| `deliveries[].conversation` | The conversation the message landed in. Use it to reply later. |
| `deliveries[].messageId`    | The message identifier. In Slack, this is the thread anchor.   |
| `failures`                  | Every destination that could not be reached.                   |
| `failures[].platform`       | `teams` or `slack`.                                            |
| `failures[].conversation`   | The conversation that could not be reached.                    |
| `failures[].reason`         | Why that destination failed.                                   |

A single delivery is a one-element list, so with a result variable of `response` you read it as `= response.deliveries[1].conversation`. FEEL lists are 1-indexed.

`failures` is non-empty on a partial success. A process that must not continue on an incomplete fan-out can check `= count(response.failures) > 0`.

:::tip
To continue a conversation, feed the response back in. Pass `conversation` as the Microsoft Teams **Conversation** target, or as the Slack **Channel ID** target with `messageId` as **Thread**.
:::

## Create channel

Create a channel in Microsoft Teams or Slack. Select the **Platform** first.

<Tabs groupId="platform" defaultValue="teams" values={[
{ label: 'Microsoft Teams', value: 'teams' },
{ label: 'Slack', value: 'slack' },
]}>

<TabItem value="teams">

| Property     | Type     | Required | Description                                                                                          | Example                |
| :----------- | :------- | :------- | :--------------------------------------------------------------------------------------------------- | :--------------------- |
| Channel name | String   | Yes      | Display name for the new channel. Maximum 50 characters.                                             | `Releases`             |
| Team ID      | String   | Yes      | The team's group ID, or a full Teams URL — the `groupId` query parameter is extracted automatically. | `<groupId>`            |
| Channel type | Dropdown | Yes      | Membership type. Only **Standard** is available.                                                     | `Standard`             |
| Description  | String   | No       | Channel description.                                                                                 | `Release coordination` |

:::note
Only standard channels are supported. Private and shared channels are not yet available, and a request for either is rejected.
:::

</TabItem>

<TabItem value="slack">

| Property        | Type    | Required | Description                                                                      | Example                |
| :-------------- | :------ | :------- | :------------------------------------------------------------------------------- | :--------------------- |
| Channel name    | String  | Yes      | Lowercase letters, digits, hyphens, and underscores only. Maximum 80 characters. | `releases`             |
| Workspace ID    | String  | No       | Slack workspace (team) ID. Leave empty to use the default workspace.             | `T0123`                |
| Private channel | Boolean | No       | Create the channel as private rather than public.                                | `false`                |
| Description     | String  | No       | Channel description.                                                             | `Release coordination` |

</TabItem>

</Tabs>

### Response

```json
{ "channelId": "19:new-channel@thread.tacv2" }
```

Read the new channel with `= response.channelId`. You can pass it straight into a **Send message** task as the channel target.

## Troubleshooting

### Connector not configured

When app integrations are not set up for the environment, every job fails immediately with the error code `APP_INTEGRATIONS_NOT_CONFIGURED` and raises an incident.

This failure is **not retried**. The **Retries** and **Retry backoff** settings on the task do not apply, because no amount of retrying can supply missing configuration. Only processes using this connector are affected — the connector runtime keeps serving every other connector.

Resolving it is an administrator task. See [prerequisites](#prerequisites).

| Environment  | Cause                                                              | Fix                                                                                                                                                                                                        |
| :----------- | :----------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SaaS         | **Enable app integrations extensions** is off for the cluster.     | Ask an organization administrator to enable it in the [cluster settings](/components/hub/organization/manage-clusters/settings.md#enable-app-integrations-extensions).                                     |
| Self-Managed | The connector runtime is not configured to reach app integrations. | Complete the [App Integrations connection settings](/self-managed/components/connectors/connectors-configuration.md#connection-settings) and redeploy the runtime.                                         |
| Self-Managed | The runtime authenticates with OAuth, but no cluster ID is set.    | Set the cluster ID to the cluster's UUID and redeploy the runtime. See [choose an authentication method](/self-managed/components/connectors/connectors-configuration.md#choose-an-authentication-method). |

The incident message names the missing setting, so read it before changing configuration.

### Other error codes

| Code                       | Cause                                                                                                                                                |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VALIDATION_ERROR`         | Additional content is **Form** but no linked form reached the job, or an Adaptive Card or Block Kit payload is not valid JSON of the expected shape. |
| `IO_ERROR`                 | The request could not be serialized, or the response could not be parsed.                                                                            |
| HTTP status, such as `401` | App integrations returned an error. The error code is the HTTP status.                                                                               |

<ErrorHandling />

## Further resources

- [Camunda for Microsoft Teams](/components/camunda-integrations/ms-teams/ms-teams.md) — act on Camunda tasks from inside Teams.
- [Notification rules](/components/camunda-integrations/ms-teams/ms-teams-notifications.md) — automatic user task notifications, configured without modeling a connector.
- [Adaptive Cards](https://adaptivecards.io/) and the [Adaptive Card designer](https://adaptivecards.io/designer/).
- [Slack Block Kit](https://api.slack.com/block-kit) and the [Block Kit builder](https://app.slack.com/block-kit-builder).
