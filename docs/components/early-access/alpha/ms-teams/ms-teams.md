---
id: ms-teams
title: Microsoft Teams App
sidebar_label: Microsoft Teams App
description: "Access Camunda functionality right from MS Teams"
---

import TeamsAppImg from './img/ms-teams-screenshot.png';

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

The Camunda for Microsoft Teams application allows you to view, claim, and complete Camunda tasks directly in Microsoft Teams, including inline task forms.

## About Camunda for Microsoft Teams

Integrating Camunda functionality within Microsoft teams means you can stay in Microsoft Teams as your primary collaboration tool without context switching.

<img src={TeamsAppImg} alt="Microsoft Teams Camunda App" width="700px" />

- Start processes from a channel, chat, or the app **Home** tab, and fill out and submit start forms in Teams to kick off workflows. Optional links to Operate allow monitoring.

- Task notifications and incidents are presented in Microsoft Teams via tabs and bot prompts, for quick action and deeper investigation in Operate if required.

:::caution SaaS preview

- The Camunda Microsoft Teams application is available as a preview feature starting with Camunda 8.8.
- Currently, the integration is limited to SaaS customers only.

:::

### Key features

| Feature             | Description                                             |
| :------------------ | :------------------------------------------------------ |
| Task management     | View, claim, and complete user tasks directly in Teams. |
| Start processes     | Start predefined processes from Teams.                  |
| Notifications       | Receive alerts for new user tasks.                      |
| Incident monitoring | View incidents and take action when issues occur.       |

## Prerequisites

The following prerequisites are required for Camunda for Microsoft Teams:

| Prerequisite                     | Description                                                                                                                                                                              |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda 8 SaaS account           | You must have a valid working Camunda 8 SaaS account.                                                                                                                                    |
| Microsoft Teams                  | Microsoft Teams with admin permissions to add applications. Microsoft Teams administrators can manage app permissions and availability across the organization.                          |
| Camunda organization and cluster | Access to a Camunda organization and cluster.                                                                                                                                            |
| Forms                            | Forms built using [Form-js](https://docs.camunda.io/docs/apis-tools/frontend-development/forms/introduction-to-forms/#form-js), the library used by Web Modeler to create and run forms. |

## Get started

### Install the app

You can install the Camunda for Microsoft Teams app from the Microsoft Teams app store or via your organization’s internal Teams catalog.

1. Open **Microsoft Teams**.
2. Open **Apps** and search for **Camunda**.
3. Select **Add** to install the app.

<img width="1508" height="937" alt="image" src="https://github.com/user-attachments/assets/5a67962a-e22f-440d-8475-06605816cf8a" />

:::note
If your organization manages Teams apps centrally, contact your Teams administrator for access.
:::

### Sign in and authorize

After installation, open the Camunda for Microsoft Teams app in Microsoft Teams. When prompted, sign in using your **Camunda account credentials**.

If requested, grant the necessary permissions to allow Microsoft Teams to access your Camunda workspace.

<img width="1396" height="896" alt="image" src="https://github.com/user-attachments/assets/51d88a68-9599-4b90-a436-dfac93db337c" />

## Using Camunda for Microsoft Teams

### Select your organization and cluster

Once signed in, select the context you want to work in to see the relevant tasks, processes, and incidents.

1. Choose your organization.
1. Select your cluster.

<img width="834" height="564" alt="image" src="https://github.com/user-attachments/assets/cf8e697c-f1e2-4989-8e50-00e95ff7c572" />

:::tip
The organization and cluster drop-downs are always visible in the app header, so you can switch contexts quickly at any time.
:::

### View, claim, and complete tasks

The **Tasks** tab lists all user tasks assigned to you or available to claim.

<img width="1555" height="967" alt="image" src="https://github.com/user-attachments/assets/72403d36-0588-4c98-8327-2dff499aa2ef" />

You can:

- View task details and variables.
- Claim or unclaim a task.
- Complete a task directly from Teams.

:::note
Tasks update automatically as you complete work in Camunda or Teams.
:::

### Start a process

You can start Camunda processes directly from Microsoft Teams without leaving the application. The available processes are configured in your Camunda environment.

<img width="1425" height="885" alt="image" src="https://github.com/user-attachments/assets/f689ae70-9135-4f57-be3b-cb19ae732e0a" />

To start a process:

1. Select the **Processes** tab.
2. Select a process definition.
3. Complete any required fields.
4. Click **Start process**.

### Monitor incidents

You can monitor process incidents from within Microsoft Teams. The **Incidents** tab lists all current incidents for your selected context.

<img width="1427" height="891" alt="image" src="https://github.com/user-attachments/assets/27282a45-3e4b-42a1-8d78-77d88acb1d1b" />

You can:

- View incident details.
- See affected process instances.
- Open the related process in [Operate](/components/operate/operate-introduction.md) for further action.

### Notifications

Stay informed with Microsoft Teams notifications for new user tasks assigned to you.

<img width="1029" height="588" alt="image" src="https://github.com/user-attachments/assets/0a0a9f6c-88a3-4695-b973-5dcfafc089ec" />

- Notifications appear as messages in your Teams activity feed or directly in chat.
- Click a notification to open the related task in the app.

#### Enable channel notifications

1. In any Teams channel, enter the command: `@Camunda Setup notifications`.
2. Follow the on-screen instructions to configure the notifications the channel should receive.
3. Once complete, the selected channel will automatically receive alerts for new tasks.

<img width="1495" height="930" alt="image" src="https://github.com/user-attachments/assets/42bb7903-4bc4-4e68-8923-89e5907f8474" />

## Troubleshooting

### The app is not shown in the Microsoft Teams store

- Verify your organization allows third-party app installations.
- Check with your Teams administrator for app approval policies.

### Unable to connect to Camunda organization

- Ensure you have the required permissions in your Camunda organization.
- Verify your Camunda SaaS account is active and accessible.
- If no tasks or incidents are visible, double-check your Camunda organization, cluster, and tenant settings.

### Tasks not displayed

- Verify that you are connected to the correct Camunda cluster.
- If notifications are not appearing, make sure Teams notifications are enabled or re-run `@Camunda Setup notifications` in the channel.
- This could be due to an expired Camunda session or missing permissions. Sign out and sign in again.

## Get help

- Contact Camunda support through your SaaS account.
- Provide feedback through the Camunda roadmap portal.
