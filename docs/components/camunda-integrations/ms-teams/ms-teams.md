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

## About

With **Camunda for Microsoft Teams**, you can manage processes, complete tasks, monitor incidents, and receive notifications without leaving your collaboration environment.

The app offers two ways to interact with Camunda:

| Interaction mode                  | Description                                                                      | Capabilities                                                             |
| :-------------------------------- | :------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| [Chat bot](./ms-teams-chatbot.md) | Conversational assistant available in personal chats, group chats, and channels. | Respond to text commands and interactive card buttons for quick actions. |
| [Tabs](./ms-teams-tabs.md)        | Visual pages embedded inside Microsoft Teams.                                    | Browse tasks, start processes, view incidents in a rich interface.       |

You sign in using your organization's Microsoft account, and then link it to your Camunda account during a one-time onboarding step.

### Key features

| Feature             | Description                                                         |
| :------------------ | :------------------------------------------------------------------ |
| Task management     | View, claim, assign, and complete user tasks directly in Teams.     |
| Start processes     | Browse process definitions and start new instances from Teams.      |
| Incident monitoring | View incidents, retry failed jobs, and open them in Operate.        |
| Notifications       | Receive personal and channel alerts for new or assigned user tasks. |
| Cluster management  | View cluster health and wake up suspended clusters.                 |

## Prerequisites

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

## Get started

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
The Self-Managed setup requires installation and configuration by your organization's administrator.
:::

1. Open **Microsoft Teams**.
2. Open **Apps** and search for **Camunda** in the **Built for your org** organisation.
   :::note
   Your administrator may have renamed the app — contact them if you cannot find it.
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

## Troubleshooting

### The app is not shown in the Microsoft Teams store

<Tabs groupId="environment" defaultValue="saas" values={[
{ label: 'SaaS', value: 'saas' },
{ label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

- Verify your organization allows third-party app installations.
- Search for **Camunda** in the Microsoft Teams app store.
- Check with your Teams administrator for app approval policies.

</TabItem>

<TabItem value="self-managed">

- The app is provisioned during [installation](./ms-teams-installation.md) and appears in the **Built for your org** section of Microsoft Teams Apps.
- If the app is not visible, check with your IT administrator.

</TabItem>

</Tabs>

### Unable to connect to Camunda organization

<Tabs groupId="environment" defaultValue="saas" values={[
{ label: 'SaaS', value: 'saas' },
{ label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

- Ensure you have the required permissions in your Camunda organization.
- Verify your Camunda SaaS account is active and accessible.
- If no tasks or incidents are visible, double-check your Camunda organization, cluster, and tenant settings.

</TabItem>

<TabItem value="self-managed">

- Verify your Camunda Self-Managed distribution is running and accessible.
- Check your Identity configuration and ensure the user has the required roles.
- If no tasks or incidents are visible, double-check your cluster configuration in the `config.yaml` file.

</TabItem>

</Tabs>

### Tasks not displayed

- Check you are connected to the correct Camunda cluster.
- If notifications are not shown, check Microsoft Teams notifications are enabled, or re-run `@Camunda Set up notifications` in the channel.
- This could be due to an expired Camunda session or missing permissions. Sign out and sign in again.

## Get help

- Contact [Camunda support](/reference/contact.md) for assistance.
- Provide feedback through the [Camunda roadmap portal](https://roadmap.camunda.com).

## Explore further resources

<AoGrid ao={msTeamsCards} columns={2}/>
