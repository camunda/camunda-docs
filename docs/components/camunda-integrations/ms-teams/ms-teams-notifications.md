---
id: ms-teams-notifications
title: Notification rules
sidebar_label: Notification rules
description: "Configure which Camunda user task notifications a Microsoft Teams channel or personal chat receives."
---

Notification rules let you control which user tasks trigger notifications in Microsoft Teams.

Each rule applies to a specific organization and cluster and can filter user task events by process definition, user task elements, candidate users, or candidate groups.

## Channel vs. personal rules

Where you create a rule determines who receives notifications.

| Context       | Who receives notifications              | Typical use                                                                                  |
| :------------ | :-------------------------------------- | :------------------------------------------------------------------------------------------- |
| Channel       | Everyone in the channel                 | Coordinate on new unassigned user tasks so a team can decide who picks them up.              |
| Personal chat | The user who owns the chat with the bot | Get notified when a task is assigned to you, or when a task you can claim becomes available. |

:::note
To configure personal notification rules, you must first start a chat with the Camunda bot in Microsoft Teams. Until that chat exists, the **Settings** tab shows a "Personal notifications not set up" message.
:::

## Access the Notification rules page

You manage notification rules from the Notification rules page in the Camunda for Microsoft Teams app.

### In a personal chat

1. Open the Camunda app in Microsoft Teams.
2. Select the **Settings** tab.

### In a channel

1. Open the channel where you want to receive notifications.
2. Add the **Camunda** tab (**+** at the top of the channel > select **Camunda**).
3. Open the tab.

## Rule structure

A rule triggers a notification only when a user task matches all configured filters.

| Field              | Required | Description                                                                                                                                                                                  |
| :----------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Organization       | Yes      | The Camunda organization the rule applies to. Auto-selected if you only have access to one.                                                                                                  |
| Cluster            | Yes      | The cluster within the organization. Auto-selected if only one cluster is available.                                                                                                         |
| Process definition | No       | Limit the rule to user tasks from a single process. Leave empty (**All processes (no filter)**) to match user tasks from every process in the cluster.                                       |
| User tasks         | No       | One or more specific user task elements within the selected process. Pick them visually on the BPMN diagram. Only available after you select a process. Leave empty to match all user tasks. |
| Candidate users    | No       | Comma-separated list of user identifiers. Matches tasks assigned to any of these users.                                                                                                      |
| Candidate groups   | No       | Comma-separated list of group identifiers. Matches tasks assigned to any of these groups.                                                                                                    |

### Match semantics

- Empty filters match all user tasks in the selected cluster. A rule with no filters matches every user task in the selected cluster — the broadest possible subscription.
- Adding filters narrows the match. Filters combine with AND across fields and OR within each list. For example, a rule with `candidateGroups = "finance, hr"` and a selected process matches tasks from that process that have either `finance` or `hr` as a candidate group.
- Multiple matching rules deduplicate. If several rules match the same user task event, the recipient still receives only one notification per event.

:::tip
Start broad and narrow down. If you are not sure which filters you need, create a rule with no filters first, observe the notifications you receive, and then refine.
:::

## Create a rule

1. Open the [notification rules page](#open-the-notification-rules-page).
2. Click **Create rule** in the page header.
3. Select an **organization** and **cluster** if they are not pre-selected.
4. (Optional) Choose a **process definition**. To target specific tasks, select them on the BPMN diagram.
5. (Optional) Provide candidate users or candidate groups as comma-separated lists.
6. Click **Save**.

The new rule appears in the list and starts matching new user task events immediately.

## View existing rules

The Notification rules page lists all rules configured for the current channel or personal chat. Each row shows:

| Column        | Description                                                                                                                           |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| Org / Cluster | The organization and cluster the rule applies to. Hidden when only one organization and cluster is available.                         |
| Process       | The process definition ID, or all processes when no process filter is set.                                                            |
| User task     | The selected user task element IDs, or **—** when no specific task is selected.                                                       |
| Assignments   | The combined list of candidate users and groups. Long lists are truncated with **+N more**. Hover over the cell to see the full list. |

Click a row to open the rule for editing.

## Edit a rule

1. On the Notification rules page, click the row of the rule you want to edit.
2. Change any of the fields.
3. Click **Save**.

## Delete a rule

1. Open the rule for editing (click its row).
2. Click **Delete rule** in the page header.
3. Confirm the deletion in the dialog. This action cannot be undone.

## What happens when a task matches

When a user task matches a rule, the bot posts an interactive notification card to the channel or personal chat. From the card, you can claim, assign, complete, or open the task without leaving Microsoft Teams. Cards update automatically as the task state changes.

See [notification behavior](./ms-teams-chatbot.md#notification-behavior) for the full description of how notification cards behave.

## Limits and permissions

- There is currently no limit on the number of rules per channel, personal chat, or cluster.
- In a channel, any member of the channel can create, edit, and delete notification rules.
