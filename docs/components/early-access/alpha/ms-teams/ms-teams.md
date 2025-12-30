---
id: ms-teams
title: Camunda for Microsoft Teams app
sidebar_label: Microsoft Teams app
description: "View, claim, and complete Camunda tasks directly in Microsoft Teams.The Camunda for Microsoft Teams app integrates Camunda functionality within Microsoft Teams."
---

import TeamsAppImg from './img/ms-teams-screenshot.png';
import TeamsApp2Img from './img/ms-teams-app.png';
import TeamsAppAccessImg from './img/ms-teams-access.png';
import TeamsAppMenuImg from './img/ms-teams-menu.png';
import TeamsAppTabsImg from './img/ms-teams-tabs.png';
import TeamsAppProcessImg from './img/ms-teams-process.png';
import TeamsAppIncidentsImg from './img/ms-teams-incidents.png';
import TeamsAppNotificationsImg from './img/ms-teams-notifications.png';
import TeamsAppChannelImg from './img/ms-teams-notifications-channel.png';

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

View, claim, and complete Camunda tasks directly in Microsoft Teams.

## About Camunda for Microsoft Teams

The Camunda for Microsoft Teams app integrates Camunda functionality within Microsoft Teams. You can keep working in Microsoft Teams as your primary collaboration tool, without having to work separately in Camunda.

<img src={TeamsAppImg} alt="Microsoft Teams Camunda App" width="700px" />

- Start processes from a channel, chat, or the app **Home** tab, and fill out and submit start forms in Teams to kick off workflows.
- Optional links to Operate allow you to monitor work.
- Task notifications and incidents are presented in Microsoft Teams via tabs and bot prompts, for quick action and deeper investigation in Operate if required.

:::caution SaaS preview only

- The Camunda Microsoft Teams app is available as a preview feature starting with Camunda 8.8.
- Currently, the integration is only limited to SaaS customers.

:::

### Key features

| Feature             | Description                                             |
| :------------------ | :------------------------------------------------------ |
| Task management     | View, claim, and complete user tasks directly in Teams. |
| Start processes     | Start predefined processes from Teams.                  |
| Notifications       | Receive alerts for new user tasks.                      |
| Incident monitoring | View incidents and take action when issues occur.       |

## Prerequisites

The following prerequisites are required to use the Camunda for Microsoft Teams app:

| Prerequisite                     | Description                                                                                                                                                          |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda 8 SaaS account           | You must have a valid working Camunda 8 SaaS account.                                                                                                                |
| Microsoft Teams                  | Microsoft Teams with admin permissions to add apps. Microsoft Teams administrators can manage app permissions and availability across the organization.              |
| Camunda organization and cluster | Access to a Camunda organization and cluster.                                                                                                                        |
| Forms                            | Forms built using [Form-js](/apis-tools/frontend-development/03-forms/01-introduction-to-forms.md#form-js), the library used by Web Modeler to create and run forms. |

## Get started

### Install the app in Microsoft Teams

First, you must install the Camunda for Microsoft Teams app from the Microsoft Teams app store or via your organization’s internal Microsoft Teams catalog.

1. Open **Microsoft Teams**.
2. Open **Apps** and search for **Camunda**.
3. Click **Add** to install the app.

<img src={TeamsApp2Img} alt="Microsoft Teams Camunda App" width="600px" />

:::note
If your organization manages Teams apps centrally, contact your Teams administrator for access.
:::

### Sign in and authorize

After installation, open the Camunda for Microsoft Teams app in Microsoft Teams.

1. When prompted, sign in using your **Camunda account credentials**.
1. If requested, grant the necessary permissions to allow Microsoft Teams to access your Camunda workspace.

<img src={TeamsAppAccessImg} alt="Microsoft Teams Camunda App access" width="500px" />

## Using Camunda for Microsoft Teams

### Select your organization and cluster

Once you are signed in, select the organization and cluster you want to work in, to see the relevant tasks, processes, and incidents.

1. Select your organization.
1. Select your cluster.

<img src={TeamsAppMenuImg} alt="Microsoft Teams Camunda App menu" width="600px" />

:::tip
The organization and cluster drop-downs are always visible in the app header, so you can switch context quickly at any time.
:::

### View, claim, and complete tasks

The **Tasks** tab lists all the user tasks either currently assigned to you or available for you to claim.

<img src={TeamsAppTabsImg} alt="Microsoft Teams Camunda App Tasks tab" width="900px" />

You can:

- View task details and variables.
- Claim or unclaim a task.
- Complete a task directly from within Microsoft Teams.

:::note
Tasks update automatically as you complete work in Camunda or Microsoft Teams.
:::

### Start a process

You can start Camunda processes directly from Microsoft Teams without leaving the app. The available processes are configured in your Camunda environment.

<img src={TeamsAppProcessImg} alt="Microsoft Teams Camunda App process" width="900px" />

To start a process:

1. Select the **Processes** tab.
2. Select a process definition.
3. Complete any required fields.
4. Click **Start process**.

### Monitor incidents

You can monitor process incidents from within Microsoft Teams. The **Incidents** tab lists all current incidents for your selected context.

<img src={TeamsAppIncidentsImg} alt="Microsoft Teams Camunda App incidents" width="900px" />

You can:

- View incident details.
- See affected process instances.
- Open the related process in [Operate](/components/operate/operate-introduction.md) for further action.

### Notifications

Stay informed with Microsoft Teams notifications for new user tasks assigned to you.

<img src={TeamsAppNotificationsImg} alt="Microsoft Teams Camunda App notifications" width="800px" />

- Notifications appear as messages in your Teams activity feed or directly in chat.
- Click a notification to open the related task in the app.

#### Enable channel notifications

1. In any Microsoft Teams channel, enter the command: `@Camunda Setup notifications`.
2. Follow the on-screen instructions to configure the notifications the channel should receive.
3. Once complete, the selected channel will automatically receive alerts for new tasks.

<img src={TeamsAppChannelImg} alt="Microsoft Teams Camunda App notifications channel" width="900px" />

## Troubleshooting

### The app is not shown in the Microsoft Teams store

- Verify your organization allows third-party app installations.
- Check with your Microsoft Teams administrator for app approval policies.

### Unable to connect to Camunda organization

- Ensure you have the required permissions in your Camunda organization.
- Verify your Camunda SaaS account is active and accessible.
- If no tasks or incidents are visible, double-check your Camunda organization, cluster, and tenant settings.

### Tasks not displayed

- Check you are connected to the correct Camunda cluster.
- If notifications are not shown, check Microsoft Teams notifications are enabled, or re-run `@Camunda Setup notifications` in the channel.
- This could be due to an expired Camunda session or missing permissions. Sign out and sign in again.

## Get help

- Contact [Camunda support](/reference/contact.md) through your SaaS account.
- Provide feedback through the Camunda roadmap portal.
