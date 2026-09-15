---
id: app-integrations
title: Camunda app integrations
sidebar_label: App Integrations
slug: /components/camunda-integrations/app-integrations/
description: "Bring Camunda process management into Microsoft Teams and Slack with one shared backend."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AoGrid from '../../../components/react-components/\_ao-card';
import { appIntegrationsCards } from '../../../components/react-components/\_app-integrations-card-data';

App integrations bring Camunda tasks, processes, and notifications into the chat tool your team already uses, currently Microsoft Teams and Slack. You can use one platform, the other, or both.

:::important
App integrations are released as an [early access](/components/early-access/overview.md) alpha feature to allow you to test and participate in development by sharing feedback before general availability, and are subject to alpha feature limitations.
:::

## About

One backend, the App Integrations service, serves both platforms: one installation, one database, one notification-rule model, and one CLI. Each platform's app is registered separately, so an organization using only one platform registers only that one.

| Platform                                | Description                                                                                 |
| :-------------------------------------- | :------------------------------------------------------------------------------------------ |
| [Microsoft Teams](./microsoft-teams.md) | A chatbot and visual tabs for browsing tasks, starting processes, and monitoring incidents. |
| [Slack](./slack.md)                     | A slash command and direct message for browsing tasks and starting processes.               |

## What you can do on each platform

| Capability                                       | Microsoft Teams                                                     | Slack                                                                                   |
| :----------------------------------------------- | :------------------------------------------------------------------ | :-------------------------------------------------------------------------------------- |
| Browse user tasks                                | Tasks tab, with filters, sorting, card and list views               | `/camunda tasks`, `/camunda tasks my`, 15 per page                                      |
| Claim a task                                     | Card action and tab button                                          | **Assign to me** button                                                                 |
| Release a task                                   | Card action and tab button                                          | **Unassign** button                                                                     |
| Complete a task                                  | Card form in chat, or in the tab                                    | Modal, opened from the **Complete** button on the task card in your direct message only |
| Assign a task to someone else                    | Not available                                                       | Not available                                                                           |
| Start a process                                  | Chat command and Processes tab                                      | `/camunda start`                                                                        |
| Monitor incidents                                | Incidents tab, with retry                                           | **Not available**                                                                       |
| Personal notifications                           | Yes                                                                 | Yes                                                                                     |
| Channel notifications                            | Yes                                                                 | Yes                                                                                     |
| Create a notification rule                       | Settings tab                                                        | `/camunda subscribe`                                                                    |
| Edit a notification rule                         | Settings tab                                                        | **Not available.** Delete and recreate                                                  |
| Delete a notification rule                       | Settings tab                                                        | `/camunda subscriptions`                                                                |
| Switch organization and cluster                  | Chat command and tab                                                | `/camunda context`                                                                      |
| Wake a suspended cluster                         | Yes, button in chat and in the tab                                  | **Not available.** You are told to resume it from the Camunda Hub                       |
| Visual app surface                               | Full tab app: Tasks, Processes, Incidents, Settings, Cluster status | **None.** The Slack Home tab is empty                                                   |
| Form rendering                                   | Adaptive Cards inline, pop-up dialog for unsupported elements       | Block Kit in a modal, JSON fallback, Tasklist link when unrenderable                    |
| File upload tasks                                | Yes, in the tab                                                     | **Not available**                                                                       |
| Conversations for the App Integrations connector | Yes                                                                 | Yes, feature-equal                                                                      |
| Replies to free text greetings                   | Yes                                                                 | **No.** Free text is offered to a process, and otherwise answered with the help card    |

## Process variable: `appContext`

When a process is started or a user task is completed through Microsoft Teams or Slack, the integration automatically injects an `appContext` variable into the process variables. This allows downstream BPMN processes to know _where_ and _how_ they were triggered.

The `appContext` variable has the following shape:

| Field            | Type                                  | Description                                                                |
| :--------------- | :------------------------------------ | :------------------------------------------------------------------------- |
| `integration`    | `"teams"` \| `"slack"`                | The platform that initiated the action.                                    |
| `externalUserId` | `string`                              | The platform-specific user ID of the person who triggered the action.      |
| `email`          | `string`                              | The Camunda account email associated with the user.                        |
| `source`         | `"tab"` \| `"message"` \| `"channel"` | The UI surface that triggered the action (see below).                      |
| `channel`        | `string` (optional)                   | The channel or conversation ID. Present only when `source` is `"channel"`. |

### Source values

| Value       | Meaning                                                                                                                                                          |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"tab"`     | Action was triggered from the Teams tab interface, including forms opened in a pop-up dialog from a bot card. Slack has no tab, so it never produces this value. |
| `"message"` | Action was triggered from a bot conversation in a personal or group chat, or from the Slack direct message with the Camunda app.                                 |
| `"channel"` | Action was triggered from a channel, either through a bot card posted in the channel, a channel command, or a Slack channel mention.                             |

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

| Prerequisite                                          | Description                                                                                                                                                                                                                                                               |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Camunda 8 SaaS account                                | You must have a valid working Camunda 8 SaaS account.                                                                                                                                                                                                                     |
| Microsoft Teams, if you are registering the Teams app | Microsoft Teams with permissions to add apps from the Microsoft Store. Microsoft Teams administrators can manage app permissions and availability across the organization.                                                                                                |
| Slack, if you are registering the Slack app           | A Slack workspace with permission to install apps from the Slack Marketplace.                                                                                                                                                                                             |
| Camunda organization and cluster                      | Access to a Camunda organization and cluster.                                                                                                                                                                                                                             |
| App integrations extensions                           | For clusters running generation `8.9 gen13` or later, **Enable app integrations extensions** must be turned on in the [cluster settings](/components/hub/organization/manage-clusters/settings.md#enable-app-integrations-extensions) to receive user task notifications. |

</TabItem>

<TabItem value="self-managed">

| Prerequisite                        | Description                                                                                                                                                             |
| :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda 8 Self-Managed installation | A running and accessible Camunda 8 Self-Managed installation.                                                                                                           |
| App Integrations backend            | The App Integrations backend must be [installed](./installation.md), and the app for each platform you want registered separately by your organization's administrator. |

</TabItem>

</Tabs>

### Install the app

You only need to install the app for the platform, or platforms, you plan to use. Installing Microsoft Teams does not require Slack, and installing Slack does not require Microsoft Teams.

#### Microsoft Teams

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
The Self-Managed setup first requires installation and configuration by your organization's administrator. See [Install](./installation.md) for more details.
:::

1. Open **Microsoft Teams**.
2. Open **Apps** and search for **Camunda** in the **Built for your org** section.

:::note
Your administrator may have renamed the app. Contact them if you cannot find it.
:::

3. Click **Add** to install the app.

</TabItem>

</Tabs>

#### Slack

<Tabs groupId="environment" defaultValue="saas" values={[
{ label: 'SaaS', value: 'saas' },
{ label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

:::info
No separate installation is required for SaaS environments. The Camunda app is available in the Slack Marketplace for all users with a Camunda SaaS subscription.
:::

1. Open **Slack**.
2. Find the Camunda app in the Slack Marketplace.
3. Click **Add to Slack** to install the app.

:::note
Contact your Slack administrator if your workspace restricts app installation.
:::

</TabItem>

<TabItem value="self-managed">

:::info
The Self-Managed setup first requires installation and configuration by your organization's administrator, using the CLI. See [Install](./installation.md) for more details.
:::

Once your administrator has deployed the app, it appears in your workspace's app directory. Add it from there, or from a direct link your administrator shares with you.

</TabItem>

</Tabs>

### Sign in and authorize

After installing the app for your platform, open Camunda for Microsoft Teams or Camunda for Slack.

1. When prompted, sign in using your **Camunda account credentials**.
2. If requested, grant the necessary permissions to allow the app to access your Camunda workspace.

Both platforms use the same sign-in flow, based on your Camunda account. There is no separate "Sign in with Slack".

### Switch organization and cluster

Once you are signed in, select the organization and cluster you want to work in to see the relevant tasks, processes, and incidents.

- In Microsoft Teams, use the **Switch environment** button at the top of the app to change your active organization and cluster at any time.
- In Slack, run `/camunda context`. See [switch organization and cluster](./slack.md#switch-organization-and-cluster).

## Explore further resources

<AoGrid ao={appIntegrationsCards} columns={3}/>

:::tip
To send messages to Microsoft Teams or Slack from a process, use the [App Integrations connector](/components/connectors/out-of-the-box-connectors/app-integrations.md). The app and the connector complement each other: the app lets users act on Camunda tasks from inside the chat tool they use, while the connector lets a process post into it.
:::
