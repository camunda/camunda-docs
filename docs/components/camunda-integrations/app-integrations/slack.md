---
id: slack
title: Camunda for Slack
sidebar_label: Slack
description: "Use the /camunda slash command and the Camunda direct message to work with Camunda inside Slack."
---

Slack has no tab app. Everything happens through the `/camunda` slash command, the direct message with the Camunda app, and channel mentions. If you are coming from the Microsoft Teams page looking for tabs, there are none on Slack.

## Slash commands

One command, default `/camunda`, configurable per Self-Managed deployment. Routing is on the first word of the argument.

| Invocation                                            | What it does                                                                                                                  |
| :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `/camunda tasks`                                      | Open user tasks in the active organization and cluster. 15 per page, **Previous** and **Next**, per-row **Open in Tasklist**. |
| `/camunda tasks my`                                   | The same list, filtered to your tasks.                                                                                        |
| `/camunda start`                                      | Opens the start-process modal: organization, cluster, process definition, then the start form.                                |
| `/camunda context`                                    | Shows or switches the active organization and cluster. With one option available it is selected and confirmed with no modal.  |
| `/camunda chat`                                       | Opens the chat-channel modal, which configures the App Integrations connector chat key for this channel or direct message.    |
| `/camunda subscribe`                                  | Opens the create-notification-rule modal. The destination is the conversation you ran it in.                                  |
| `/camunda subscriptions`                              | Lists this conversation's notification rules with a **Delete** button per row. Capped at 20 rows.                             |
| `/camunda`, `/camunda help`, or any unrecognized word | The help card. There is no "unknown command" error on Slack.                                                                  |

`/camunda` with an unrecognized word shows the help card rather than an error.

:::note
The command name is configurable on Self-Managed and defaults to `/camunda`. If your workspace uses a different name, replace `/camunda` with it in every invocation above.
:::

## Where answers appear

In the Camunda direct message, an answer appears as an ordinary message. Anywhere else, the answer is ephemeral and only you see it.

## Work with tasks

Run `/camunda tasks` to open your organization's user tasks, or `/camunda tasks my` to filter to tasks assigned to you. Both list 15 tasks per page, with **Previous** and **Next** buttons and a per-row **Open in Tasklist** link.

Each task offers these buttons:

| Button           | Description                                                                                       |
| :--------------- | :------------------------------------------------------------------------------------------------ |
| **Assign to me** | Claim the task.                                                                                   |
| **Unassign**     | Release the task so others can pick it up.                                                        |
| **Complete**     | Complete the task. Available only on the task card in your direct message, not on a channel card. |

## Start a process

Run `/camunda start` to open a modal that walks you through the organization, the cluster, and the process definition, and then shows the start form.

## Forms in Slack

A Camunda form completed from Slack renders in one of three ways, decided by the form itself:

| Outcome     | When                                                                                      | What you see                                                       |
| :---------- | :---------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| Interactive | The form renders in Block Kit                                                             | A modal with real inputs                                           |
| JSON        | The form has no schema                                                                    | A single input box for a JSON payload                              |
| Unsupported | The form uses FEEL expressions, contains a file picker, or is too large for a Slack modal | "This form can't be filled in Slack. Open it in Tasklist instead." |

## Switch organization and cluster

Run `/camunda context` to see or switch your active organization and cluster. With exactly one option available, it is selected and confirmed with no modal.

## Notifications

Notification rules work the same way on Slack as on Microsoft Teams. See [notification rules](./notification-rules.md) for how to create, list, and delete them.

An assignee with a linked Slack account receives a direct message when a task is assigned to them, independently of any notification rule.

## What Slack does not have

Compared to Microsoft Teams, Slack does not support:

- Incident monitoring
- A Home tab
- Waking a suspended cluster. You are told to resume it from the Camunda Hub instead
- Editing an existing notification rule. Delete it and create a new one instead
- File upload tasks
- Completing a task from a channel card. Completion is only available on the task card in your direct message
- Conversational replies to free text. Free text is offered to a process instead, and otherwise answered with the help card

## Limits

| Limit                         | Value               | Cause                                                     |
| :---------------------------- | :------------------ | :-------------------------------------------------------- |
| Tasks per page                | 15                  | Slack's 50-block message ceiling                          |
| Notification rules listed     | 20                  | Same ceiling                                              |
| Process options per keystroke | 25                  | Slack's options response budget                           |
| User task options in a rule   | 100                 | Slack's multi-select ceiling                              |
| Modal open time               | About three seconds | Slack's `trigger_id` expiry, handled with a loading modal |

A modal left open across a newer interaction is rejected with "This dialog is no longer valid. Run the command again."
