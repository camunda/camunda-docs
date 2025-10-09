---
id: ms-teams
title: Microsoft Teams App
sidebar_label: Microsoft Teams App
description: "Access Camunda functionality right from MS Teams"
---

import TeamsAppImg from './img/ms-teams-screenshot.png';

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

MS Teams App Integration lets users view, claim, and complete Camunda tasks directly in Microsoft Teams, including inline task forms—so they can stay in their primary collaboration tool without context switching.

<img src={TeamsAppImg} alt="Microsoft Teams Camunda App" width="500px" />

Users can start processes from a channel, chat, or the app’s Home tab, fill out start forms in Teams, and submit to kick off workflows, with optional links to Operate for monitoring.

The integration surfaces task notifications and incidents inside Teams via tabs and bot prompts, enabling quick action and deeper investigation in Operate when needed.

### Availability
Note: The Camunda Microsoft Teams application is available as a preview feature starting with Camunda 8.8. At this stage, the integration is limited to SaaS customers only.

### Prerequisites
- Camunda 8 SaaS account
- Microsoft Teams with admin permissions to add applications
- Access to a Camunda organization and cluster
- Forms built using [Form-js](https://docs.camunda.io/docs/apis-tools/frontend-development/forms/introduction-to-forms/#form-js), the library used by Web Modeler to create and run forms.
### Key features

- **Task management** — View, claim, and complete user tasks directly in Teams.  
- **Start processes** — Start predefined processes from Teams.  
- **Notifications** — Receive alerts for new user tasks.
- **Incident monitoring** — View incidents and take action when issues occur.  


## Getting started

### Install the app

You can install the Camunda app from the Microsoft Teams app store or via your organization’s internal Teams catalog.

1. Open **Microsoft Teams**.  
2. Go to **Apps** and search for **Camunda**.  
3. Select **Add** to install the app.  

<img width="1508" height="937" alt="image" src="https://github.com/user-attachments/assets/5a67962a-e22f-440d-8475-06605816cf8a" />

> *If your organization manages Teams apps centrally, contact your Teams administrator for access.*

### Sign in and authorize

After installation, open the Camunda app in Teams. You’ll be prompted to sign in with your **Camunda account credentials**.  

If requested, grant the necessary permissions to allow Teams to access your Camunda workspace.

<img width="1396" height="896" alt="image" src="https://github.com/user-attachments/assets/51d88a68-9599-4b90-a436-dfac93db337c" />

## Using the app

### Complete onboarding

Once signed in, select the context you want to work in to see the relevant tasks, processes, and incidents.
	1.	Choose your organization.
	2.	Select your cluster.

The organization and cluster drop-downs are always visible in the app header, so you can switch contexts quickly at any time. 

<img width="834" height="564" alt="image" src="https://github.com/user-attachments/assets/cf8e697c-f1e2-4989-8e50-00e95ff7c572" />

### Tasks

The **Tasks** tab lists all user tasks assigned to you or available to claim.

From here, you can:

- View task details and variables.  
- Claim or unclaim a task.  
- Complete a task directly from Teams.  

Tasks update automatically as you complete work in Camunda or Teams.

<img width="1555" height="967" alt="image" src="https://github.com/user-attachments/assets/72403d36-0588-4c98-8327-2dff499aa2ef" />

### Processes

Start Camunda processes directly from Teams without leaving the app.  
Available processes are configured in your Camunda environment.

To start a process:

1. Open the **Processes** tab.  
2. Select a process definition.  
3. Fill in any required fields.  
4. Click **Start process**.

<img width="1425" height="885" alt="image" src="https://github.com/user-attachments/assets/f689ae70-9135-4f57-be3b-cb19ae732e0a" />

### Incidents

Monitor process incidents from within Teams.  
The **Incidents** tab lists all current incidents for your selected context.  

From here, you can:

- View incident details.  
- See affected process instances.  
- Open the related process in Operate for further action.

<img width="1427" height="891" alt="image" src="https://github.com/user-attachments/assets/27282a45-3e4b-42a1-8d78-77d88acb1d1b" />

### Notifications

Stay informed through Teams notifications for **new user tasks assigned to you**.  

Notifications appear as messages in your Teams activity feed or directly in chat.  
Click a notification to open the related task in the app.

<img width="1029" height="588" alt="image" src="https://github.com/user-attachments/assets/0a0a9f6c-88a3-4695-b973-5dcfafc089ec" />

**Enable notifications in a channel:**

1. In any Teams channel, type the command: `@Camunda Setup notifications`
2. Follow the on-screen wizard to configure which notifications the channel should receive.
3. Once complete, the selected channel will receive alerts for new tasks automatically.

<img width="1495" height="930" alt="image" src="https://github.com/user-attachments/assets/42bb7903-4bc4-4e68-8923-89e5907f8474" />

## Troubleshooting

### App not appearing in Teams store
- Verify your organization allows third-party app installations.  
- Check with your Teams administrator for app approval policies.  

### Unable to connect to Camunda organization
- Ensure you have proper permissions in your Camunda organization.  
- Verify your SaaS account is active and accessible.  
- If no tasks or incidents are visible, double-check your organization, cluster, and tenant settings.

### Tasks not displaying
- Check that you're connected to the correct Camunda cluster.  
- If notifications are not appearing, make sure Teams notifications are enabled or re-run `@Camunda Setup notifications` in the channel.
- It could be due to an expired Camunda session or missing permissions. Sign out and sign in again.

## Getting help
- Contact Camunda support through your SaaS account.  
- Provide feedback through the Camunda roadmap portal.  

---

## Permissions and access

To use the app, you need:  
- A valid Camunda account  
- Access to at least one organization, cluster, and tenant  

Microsoft Teams administrators can manage app permissions and availability across the organization.

<!--

### Chat

- A
- B
- C

### Tasks

- A
- B
- C

### Processes

- A
- B
- C

### Incidents

- A
- B
- C

### Limitations

- Currently only available for Camunda SaaS clusters running Camunda on 8.7 or higher.
-->
