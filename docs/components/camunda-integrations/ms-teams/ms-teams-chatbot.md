---
id: ms-teams-chatbot
title: Chatbot
sidebar_label: Chatbot
description: "Interact with Camunda using a conversational bot in Microsoft Teams personal chats, group chats, and channels."
---

Interact with Camunda using a conversational bot in Microsoft Teams personal chats, group chats, and channels.

## About

The Camunda bot is available in your personal chat, group chats, and channels. You can interact with it by typing commands or by pressing buttons on the interactive cards it sends.

## Available commands

The following commands are recognized by the bot:

| Command                                                 | What it does                                                                                                              |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------ |
| **Hi** (or hey, hello, greetings, and similar messages) | The bot greets you. If you haven't connected your Camunda account yet, it shows you how to get started.                   |
| **Help** (or ?, support, commands)                      | Shows a help card with available commands and setup information.                                                          |
| **Switch context**                                      | Enables you to change your active organization and cluster.                                                               |
| **Start a process**                                     | Walks you through selecting and starting a Camunda process. If no cluster is selected yet, it asks you to pick one first. |

:::important
If you type an unrecognized command, the bot notifies you and suggests using **Help**.
:::

:::note
Notification subscriptions are configured from the [Notification rules](./ms-teams-notifications.md) page rather than through bot commands.
:::

## Interactive card actions

The bot sends interactive cards with buttons you can click. These cards support the following actions.

### Select an organization and cluster

Pick your organization from a dropdown, then select a cluster. The bot remembers your choice for future interactions.

### Start processes

Choose a process definition from the list and fill in the start form or provide variables. The bot confirms when the process has started successfully, or shows an error if something went wrong.

:::note
When a process is started through the bot, an [`appContext`](./ms-teams.md#process-variable-appcontext) variable is automatically included in the process variables, capturing who triggered it and from which surface (`"message"` or `"channel"`).
:::

### Work with tasks

| Action            | Description                                                                                                          |
| :---------------- | :------------------------------------------------------------------------------------------------------------------- |
| **Assign to me**  | Claim a task. If you do this from a channel, the bot also sends you a personal copy so you can work on it privately. |
| **Unassign**      | Release a task so others can pick it up.                                                                             |
| **Fill in form**  | Open the task completion form directly in the chat card.                                                             |
| **Complete task** | Submit the form and mark the task as done.                                                                           |
| **Reset form**    | Discard your form input and go back to the task overview.                                                            |

:::note
When a task is completed through the bot, an [`appContext`](./ms-teams.md#process-variable-appcontext) variable is automatically included in the task variables, capturing who completed it and from which surface (`"message"` or `"channel"`).
:::

### Cluster management

If your cluster is sleeping, the bot shows a **Wake up cluster** button to wake it up.

### Pop-up dialog

When a form is too complex to display inside a chat card, the bot opens a pop-up dialog with the full form interface, giving you the same rich experience as the [tabs](./ms-teams-tabs.md).

#### When a form opens in a pop-up dialog

Forms open in a pop-up dialog when they contain unsupported element types or [FEEL expressions](/components/modeler/feel/what-is-feel.md) in supported properties.

##### Unsupported element types

Adaptive Cards support only a subset of Camunda form elements. Forms with any of the following element types open in a pop-up dialog:

- Group
- Table
- Dynamic list
- iframe
- HTML viewer
- Button
- Expression field
- Document preview

##### FEEL expressions

Forms also open in a pop-up dialog if any field uses a FEEL expression, meaning a value starting with `=`, in one of the following properties:

- **Label**
- **Date label**
- **Read only**
- **Default value**
- **Text**
- **Source**
- **Alt text**
- **Accept**
- **Multiple**

:::note
Static values and process variables are supported in Adaptive Cards. Dynamic FEEL expressions are not.
:::

## Notifications

Once configured, the bot proactively sends messages to keep you informed. Notifications are driven by [notification rules](./ms-teams-notifications.md), which determine exactly which user task events reach a given channel or personal chat.

### Personal notifications

Receive a message in your personal chat when a user task matches one of your personal notification rules — for example, when a task is assigned to you.

### Channel notifications

A channel receives messages about user tasks that match the rules configured on that channel, so your team can coordinate on who picks them up.

To configure notifications, see [Notification rules](./ms-teams-notifications.md).

### Notification behavior

Cards sent by notifications are interactive. You can assign, complete, or manage tasks directly from the notification card.

Notification cards update automatically to reflect the latest task state. For example, when someone else completes or assigns the task.

## Error handling

The bot provides clear feedback when something goes wrong:

| Error                   | Behavior                                                                         |
| :---------------------- | :------------------------------------------------------------------------------- |
| **Cluster is sleeping** | Shows a card with a button to wake it up, then retry your action.                |
| **Task not found**      | Lets you know the task no longer exists (for example, it was already completed). |
| **Access denied**       | Informs you that you don't have permission for the requested action.             |
| **Unexpected errors**   | Shows a message suggesting you retry or contact support.                         |
