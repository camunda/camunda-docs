---
id: notification-rules
title: Notification rules
sidebar_label: Notification rules
description: "Configure which Camunda user task notifications a Microsoft Teams or Slack channel or direct message receives."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Notification rules let you control which user tasks trigger notifications in Microsoft Teams or Slack. The rule model is identical on both platforms; what differs is where you configure a rule and what you can do to it afterwards.

Each rule applies to a specific organization and cluster and can filter user task events by process definition, user task elements, candidate users, or candidate groups.

## Enable notification delivery for your cluster

On Camunda 8 SaaS, the notifications a cluster delivers depend on its generation.

Clusters running generation `8.9 gen13` or later require the **Enable app integrations extensions** setting in the [cluster settings](/components/hub/organization/manage-clusters/settings.md#enable-app-integrations-extensions). Until an organization admin turns it on, you can create and save rules, but the cluster delivers no notifications.

Clusters running earlier generations need no configuration. They deliver a notification when a matching user task is created.

| Notification                                                     | Earlier generations | `8.9 gen13` or later, with app integrations extensions enabled |
| :--------------------------------------------------------------- | :------------------ | :------------------------------------------------------------- |
| A matching user task is created                                  | Yes                 | Yes                                                            |
| A card updates when the task is assigned, completed, or canceled | No                  | Yes                                                            |
| An existing task is later assigned to you                        | No                  | Yes                                                            |

Clusters running generation `8.9 gen13` or later also receive new notification capabilities as they become available.

## Channel vs. personal rules

Where you create a rule determines who receives notifications. Slack calls the personal case a direct message.

| Context                         | Who receives notifications              | Typical use                                                                                  |
| :------------------------------ | :-------------------------------------- | :------------------------------------------------------------------------------------------- |
| Channel                         | Everyone in the channel                 | Coordinate on new unassigned user tasks so a team can decide who picks them up.              |
| Personal chat or direct message | The user who owns the chat with the app | Get notified when a task is assigned to you, or when a task you can claim becomes available. |

:::note
On Microsoft Teams, to configure personal notification rules, you must first start a chat with the Camunda bot. Until that chat exists, the **Settings** tab shows a "Personal notifications not set up" message.
:::

:::note
Slack group direct messages are refused outright: "Group DMs aren't supported. Run `/camunda subscribe` in a channel, or in your direct message with Camunda."
:::

## Access the notification rules page

<Tabs groupId="platform" defaultValue="teams" values={[
{ label: 'Microsoft Teams', value: 'teams' },
{ label: 'Slack', value: 'slack' },
]}>

<TabItem value="teams">

You manage notification rules from the Notification rules page in the Camunda for Microsoft Teams app.

**In a personal chat:**

1. Open the Camunda app in Microsoft Teams.
2. Select the **Settings** tab.

**In a channel:**

1. Open the channel where you want to receive notifications.
2. Add the **Camunda** tab (**+** at the top of the channel > select **Camunda**).
3. Open the tab.

</TabItem>

<TabItem value="slack">

Run `/camunda subscribe` in a channel or in your direct message with Camunda to create a rule. The destination is the conversation you ran it in.

Run `/camunda subscriptions` to list this conversation's notification rules, with a **Delete** button per row.

**There is no edit on Slack.** To change a rule, delete it and create a new one with `/camunda subscribe`.

</TabItem>

</Tabs>

## Rule structure

A rule triggers a notification only when a user task matches all configured filters.

| Field              | Required | Description                                                                                                                                                                                                                                                                                                  |
| :----------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Organization       | Yes      | The Camunda organization the rule applies to. Auto-selected if you only have access to one.                                                                                                                                                                                                                  |
| Cluster            | Yes      | The cluster within the organization. Auto-selected if only one cluster is available. On a Self-Managed deployment with [Physical Tenants](/self-managed/concepts/physical-tenants/app-integrations.md), each cluster and tenant pair is listed as its own entry, and the rule is bound to the pair you pick. |
| Process definition | No       | Limit the rule to user tasks from a single process. Leave empty (**All processes (no filter)**) to match user tasks from every process in the cluster. On Slack, this is a typeahead field.                                                                                                                  |
| User tasks         | No       | One or more specific user task elements within the selected process. Pick them visually on the BPMN diagram on Microsoft Teams. Only available after you select a process. Leave empty to match all user tasks. On Slack, this is a multi-select, capped at 100 options.                                     |
| Candidate users    | No       | Comma-separated list of user identifiers. Matches tasks assigned to any of these users.                                                                                                                                                                                                                      |
| Candidate groups   | No       | Comma-separated list of group identifiers. Matches tasks assigned to any of these groups.                                                                                                                                                                                                                    |

### Match semantics

- Empty filters match all user tasks in the selected cluster. A rule with no filters matches every user task in the selected cluster: the broadest possible subscription.
- Adding filters narrows the match. Filters combine with AND across fields and OR within each list. For example, a rule with `candidateGroups = "finance, hr"` and a selected process matches tasks from that process that have either `finance` or `hr` as a candidate group.
- Multiple matching rules deduplicate. If several rules match the same user task event, the recipient still receives only one notification per event.
- The cluster and Physical Tenant are matched exactly and cannot be left empty. A rule created for one Physical Tenant never receives another tenant's user tasks, so a cluster split into Physical Tenants needs its rules recreated per tenant.

:::tip
Start broad and narrow down. If you are not sure which filters you need, create a rule with no filters first, observe the notifications you receive, and then refine.
:::

## Create a rule

The steps below describe the Microsoft Teams flow. On Slack, create a rule with `/camunda subscribe`; see [Access the notification rules page](#access-the-notification-rules-page).

1. Open the [notification rules page](#access-the-notification-rules-page).
2. Click **Create rule** in the page header.
3. Select an **organization** and **cluster** if they are not pre-selected.
4. (Optional) Choose a **process definition**. To target specific tasks, select them on the BPMN diagram.
5. (Optional) Provide candidate users or candidate groups as comma-separated lists.
6. Click **Save**.

The new rule appears in the list and starts matching new user task events immediately.

## View existing rules

The steps below describe the Microsoft Teams flow. On Slack, list rules with `/camunda subscriptions`; see [Access the notification rules page](#access-the-notification-rules-page).

The Notification rules page lists all rules configured for the current channel or personal chat. Each row shows:

| Column        | Description                                                                                                                           |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| Org / Cluster | The organization and cluster the rule applies to. Hidden when only one organization and cluster is available.                         |
| Process       | The process definition ID, or all processes when no process filter is set.                                                            |
| User task     | The selected user task element IDs, or **—** when no specific task is selected.                                                       |
| Assignments   | The combined list of candidate users and groups. Long lists are truncated with **+N more**. Hover over the cell to see the full list. |

Click a row to open the rule for editing.

## Edit a rule

:::note
Editing is available on Microsoft Teams only. Slack has no edit; delete the rule and create a new one with `/camunda subscribe`.
:::

1. On the Notification rules page, click the row of the rule you want to edit.
2. Change any of the fields.
3. Click **Save**.

## Delete a rule

The steps below describe the Microsoft Teams flow. On Slack, delete a rule from the **Delete** button in `/camunda subscriptions`.

1. Open the rule for editing (click its row).
2. Click **Delete rule** in the page header.
3. Confirm the deletion in the dialog. This action cannot be undone.

## What happens when a task matches

When a user task matches a rule, the app posts an interactive notification card to the channel, personal chat, or direct message. On Microsoft Teams, you can claim, assign, complete, or open the task without leaving the card. On Slack, the card links to Tasklist, and completion is available from the task card in your direct message. Cards update automatically as the task state changes.

See [notification behavior](./microsoft-teams.md#notification-behavior) for the full description of how Microsoft Teams notification cards behave.

## Delivery requirements

On Slack, a channel rule needs the Camunda app to be a member of the channel. The app tries to join the channel when you submit the rule, and warns you when it cannot: "Invite the Camunda app to this channel (`/invite @Camunda`) so notifications can be delivered." A direct message rule is always deliverable.

## Automatic cleanup

On Slack, rules for a channel are deleted automatically when any of the following happens:

- The Camunda app leaves the channel.
- The channel is deleted or archived.
- The Camunda app is uninstalled from the workspace.

## Limits and permissions

- There is currently no limit on the number of rules per channel, personal chat, or cluster on Microsoft Teams. On Slack, up to 20 rules per conversation are listed by `/camunda subscriptions`.
- In a channel, any member of the channel can create, edit, and delete notification rules.
