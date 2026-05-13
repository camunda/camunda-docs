---
id: ms-teams
title: Camunda for Microsoft Teams
sidebar_label: Microsoft Teams
description: "Bring Camunda's process management capabilities directly into Microsoft Teams."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AoGrid from '../../../components/react-components/\_ao-card';
import { msTeamsCards } from '../../../self-managed/react-components/\_ms-teams-card-data';

Bring Camunda's business process management capabilities directly into Microsoft Teams.

:::important
The Microsoft Teams integration is released as an [early access](/components/early-access/overview.md) alpha feature to allow you to test and participate in development by sharing feedback before general availability, and is subject to alpha feature limitations.
:::

## About

With **Camunda for Microsoft Teams**, you can manage processes, complete tasks, monitor incidents, and receive notifications without leaving your collaboration environment.

The app offers two ways to interact with Camunda:

| Interaction mode                 | Description                                                                      | Capabilities                                                             |
| :------------------------------- | :------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| [Chatbot](./ms-teams-chatbot.md) | Conversational assistant available in personal chats, group chats, and channels. | Respond to text commands and interactive card buttons for quick actions. |
| [Tabs](./ms-teams-tabs.md)       | Visual pages embedded inside Microsoft Teams.                                    | Browse tasks, start processes, view incidents in a rich interface.       |

You sign in using your organization's Microsoft account, and then link it to your Camunda account during a one-time onboarding step.

### Key features

| Feature                                      | Description                                                                                         |
| :------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| Task management                              | View, claim, assign, and complete user tasks directly in Microsoft Teams.                           |
| Start processes                              | Browse process definitions and start new instances from Microsoft Teams.                            |
| Incident monitoring                          | View incidents, retry failed jobs, and open them in Operate.                                        |
| [Notifications](./ms-teams-notifications.md) | Receive personal and channel notifications for user tasks based on configurable notification rules. |
| Cluster management                           | View cluster health and wake up suspended clusters.                                                 |

## Process variable: `appContext`

When a process is started or a user task is completed through Microsoft Teams, the integration automatically injects an `appContext` variable into the process variables. This allows downstream BPMN processes to know _where_ and _how_ they were triggered.

The `appContext` variable has the following shape:

| Field            | Type                                  | Description                                                                                |
| :--------------- | :------------------------------------ | :----------------------------------------------------------------------------------------- |
| `integration`    | `"teams"`                             | The platform that initiated the action.                                                    |
| `externalUserId` | `string`                              | The Microsoft Teams user ID of the person who triggered the action.                        |
| `email`          | `string`                              | The Camunda account email associated with the user.                                        |
| `source`         | `"tab"` \| `"message"` \| `"channel"` | The UI surface that triggered the action (see below).                                      |
| `channel`        | `string` (optional)                   | The Microsoft Teams channel or conversation ID. Present only when `source` is `"channel"`. |

### Source values

| Value       | Meaning                                                                                                       |
| :---------- | :------------------------------------------------------------------------------------------------------------ |
| `"tab"`     | Action was triggered from the Teams tab interface, including forms opened in a pop-up dialog from a bot card. |
| `"message"` | Action was triggered from a bot conversation in a personal or group chat.                                     |
| `"channel"` | Action was triggered from a channel — either through a bot card posted in the channel or a channel command.   |

:::tip
You can use `appContext` in your BPMN processes to implement conditional logic based on where an action originated. For example, you could route a process differently depending on whether it was started from a tab or a channel command.
:::

## Get started

### Prerequisites

<Tabs groupId="environment" defaultValue="saas" values={[
{ label: 'SaaS', value: 'saas' },
{ label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

| Prerequisite                     | Description                                                                                                                                                                |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda 8 SaaS account           | You must have a valid working Camunda 8 SaaS account.                                                                                                                      |
| Microsoft Teams                  | Microsoft Teams with permissions to add apps from the Microsoft Store. Microsoft Teams administrators can manage app permissions and availability across the organization. |
| Camunda organization and cluster | Access to a Camunda organization and cluster.                                                                                                                              |

</TabItem>

<TabItem value="self-managed">

| Prerequisite                        | Description                                                                                                                                                  |
| :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda 8 Self-Managed installation | A running and accessible Camunda 8 Self-Managed installation.                                                                                                |
| Camunda for Microsoft Teams app     | The Camunda for Microsoft Teams app must be [installed](./ms-teams-installation.md) and added to your Microsoft tenant by your organization's administrator. |

</TabItem>

</Tabs>

### Install the app in Microsoft Teams

<Tabs groupId="environment" defaultValue="saas" values={[
{ label: 'SaaS', value: 'saas' },
{ label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

:::info
No separate installation is required for SaaS environments. The Camunda app is available in the Microsoft Teams app store for all users with a Camunda SaaS subscription.
:::

1. Open **Microsoft Teams**.
2. Open **Apps** and search for **Camunda**.
3. Click **Add** to install the app.

:::note
If your organization manages Teams apps centrally, contact your Teams administrator for access.
:::

</TabItem>

<TabItem value="self-managed">

:::info
The Self-Managed setup first requires installation and configuration by your organization's administrator. See [Install](./ms-teams-installation.md) for more details.
:::

1. Open **Microsoft Teams**.
2. Open **Apps** and search for **Camunda** in the **Built for your org** section.

:::note
Your administrator may have renamed the app. Contact them if you cannot find it.
:::

3. Click **Add** to install the app.

</TabItem>

</Tabs>

### Sign in and authorize

After installing the app, open Camunda for Microsoft Teams in Microsoft Teams.

1. When prompted, sign in using your **Camunda account credentials**.
2. If requested, grant the necessary permissions to allow Microsoft Teams to access your Camunda workspace.

### Switch environment

Once you are signed in, select the organization and cluster you want to work in to see the relevant tasks, processes, and incidents.

Use the **Switch environment** button at the top of the app to change your active organization and cluster at any time.

## Explore further resources

<AoGrid ao={msTeamsCards} columns={3}/>
