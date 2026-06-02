---
id: ms-teams-chatbot
title: Chatbot
sidebar_label: Chatbot
description: "Interact with Camunda using a conversational bot in Microsoft Teams personal chats, group chats, and channels."
---

Use the Camunda bot in personal chats, group chats, and channels to run commands or interact through buttons on interactive cards.

## Commands

You can interact with the bot by typing commands in chat.

| Command                                                 | What it does                                                                                                         |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------- |
| **Hi** (or hey, hello, greetings, and similar messages) | The bot greets you. If you have not connected your Camunda account yet, it shows you how to get started.             |
| **Help** (or ?, support, commands)                      | Shows a help card with available commands and setup information.                                                     |
| **Switch context**                                      | Changes your active organization and cluster.                                                                        |
| **Start a process**                                     | Walks you through selecting and starting a Camunda process. If no cluster is selected, it prompts you to choose one. |

:::important
If you type an unrecognized command, the bot notifies you and suggests using **Help**.
:::

Configure notification subscriptions on the [notification rules](./ms-teams-notifications.md) page.

## Interactive cards

In addition to commands, the bot sends interactive cards with buttons you can use to perform actions directly in chat.

:::note
When you trigger actions through the bot, such as starting processes or completing tasks, it automatically adds an [`appContext`](./ms-teams.md#process-variable-appcontext) variable. This variable captures who triggered the action and from which surface (`"message"` or `"channel"`).
:::

### Select an organization and cluster

Select your organization from a dropdown, then choose a cluster. The bot remembers your selection for future interactions.

### Start processes

Select a process definition and complete the start form or provide variables. The bot confirms when the process starts successfully or shows an error.

### Work with tasks

| Action            | Description                                                                                                          |
| :---------------- | :------------------------------------------------------------------------------------------------------------------- |
| **Assign to me**  | Claim a task. If you do this from a channel, the bot also sends you a personal copy so you can work on it privately. |
| **Unassign**      | Release a task so others can pick it up.                                                                             |
| **Fill in form**  | Open the task completion form directly in the chat card.                                                             |
| **Complete task** | Submit the form and mark the task as done.                                                                           |
| **Reset form**    | Discard your form input and return to the task overview.                                                             |

### Manage clusters

If your cluster is sleeping, the bot shows a **Wake up cluster** button.

### Use pop-up dialogs

The bot opens forms in a pop-up dialog when they:

- Contain unsupported element types
- Use FEEL expressions (values starting with `=`) in supported properties

#### Unsupported element types

Adaptive Cards support only a subset of Camunda form elements. Forms that include any of the following elements open in a pop-up dialog:

- Group
- Table
- Dynamic list
- iframe
- HTML viewer
- Button
- Expression field
- Document preview

#### FEEL expressions

Forms also open in a pop-up dialog if any field uses a FEEL expression in one of the following properties:

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

The bot sends notifications based on your [notification rules](./ms-teams-notifications.md).

### Personal notifications

Receive a message in your personal chat when a user task matches one of your notification rules. For example, when a task is assigned to you.

### Channel notifications

A channel receives notifications for user tasks that match its configured rules. This allows your team to coordinate who picks them up.

To configure notifications, see [notification rules](./ms-teams-notifications.md).

### Notification behavior

Notification cards are interactive. You can assign, complete, or manage tasks directly from the card.

Cards update automatically to reflect the latest task state. For example, when someone else completes or assigns the task.

## Error handling

The bot provides clear feedback when something goes wrong:

| Error                   | Behavior                                                             |
| :---------------------- | :------------------------------------------------------------------- |
| **Cluster is sleeping** | Shows a card with a button to wake it up, then retry your action.    |
| **Task not found**      | Indicates the task no longer exists.                                 |
| **Access denied**       | Informs you that you don't have permission for the requested action. |
| **Unexpected errors**   | Shows a message suggesting you retry or contact support.             |
