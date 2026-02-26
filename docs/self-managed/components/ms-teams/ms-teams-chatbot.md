---
id: ms-teams-chatbot
title: Chat bot
sidebar_label: Chat bot
description: "Interact with Camunda using the conversational bot in Microsoft Teams personal chats, group chats, and channels."
---

Interact with Camunda using the conversational bot in Microsoft Teams personal chats, group chats, and channels.

## About

The Camunda bot is available in your personal chat, group chats, and channels. You can interact with it by typing commands or by pressing buttons on the interactive cards it sends.

## Commands

The following commands are recognized by the bot:

| Command                                 | What it does                                                                                                                  |
| :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **Hi** (or hey, hello, greetings, etc.) | The bot greets you. If you haven't connected your Camunda account yet, it shows you how to get started.                       |
| **Help** (or ?, support, commands)      | Shows a help card with available commands and setup information.                                                              |
| **Switch context**                      | Lets you change your active organization and cluster.                                                                         |
| **Start a process**                     | Walks you through selecting and starting a Camunda process. If no cluster is selected yet, it asks you to pick one first.     |
| **Set up notifications**                | Subscribes the current channel or chat to receive notifications about new user tasks for a selected organization and cluster. |
| **Reset notifications**                 | Shows the active notification subscriptions for the current channel and lets you remove them.                                 |

If you type something the bot doesn't recognize, it will let you know and suggest using the **Help** command.

## Interactive card actions

The bot sends interactive cards with buttons you can click. These cards support the following actions.

### Organization and cluster selection

Pick your organization from a dropdown, then select a cluster. The bot remembers your choice for future interactions.

### Starting processes

Choose a process definition from the list and fill in the start form or provide variables. The bot confirms when the process has started successfully, or shows an error if something went wrong.

### Working with tasks

| Action            | Description                                                                                                          |
| :---------------- | :------------------------------------------------------------------------------------------------------------------- |
| **Assign to me**  | Claim a task. If you do this from a channel, the bot also sends you a personal copy so you can work on it privately. |
| **Unassign**      | Release a task so others can pick it up.                                                                             |
| **Fill in form**  | Open the task completion form directly in the chat card.                                                             |
| **Complete task** | Submit the form and mark the task as done.                                                                           |
| **Reset form**    | Discard your form input and go back to the task overview.                                                            |

### Cluster management

If your cluster is sleeping, the bot shows a **Wake up cluster** button to wake it up.

### Pop-up dialogs

When a form is too complex to display inside a chat card, the bot opens a pop-up dialog with the full form interface, giving you the same rich experience as the [tabs](./ms-teams-tabs.md).

## Notifications

Once set up, the bot proactively sends messages to keep you informed.

### Personal notifications

Receive a message in your personal chat when a task is assigned to you.

### Channel notifications

A subscribed channel receives messages about new unassigned tasks, so your team can coordinate on who picks them up.

To enable channel notifications:

1. In any Microsoft Teams channel, enter the command: `@Camunda Set up notifications`.
2. Follow the on-screen instructions to configure the notifications the channel should receive.
3. Once complete, the selected channel will automatically receive alerts for new tasks.

### Notification behavior

- Cards sent by notifications are interactive — you can assign, complete, or manage tasks directly from the notification card.
- Notification cards update automatically to reflect the latest task state (for example, when someone else completes or assigns the task).

## Error handling

The bot provides clear feedback when something goes wrong:

| Error                   | Behavior                                                                         |
| :---------------------- | :------------------------------------------------------------------------------- |
| **Cluster is sleeping** | Shows a card with a button to wake it up, then retry your action.                |
| **Task not found**      | Lets you know the task no longer exists (for example, it was already completed). |
| **Access denied**       | Informs you that you don't have permission for the requested action.             |
| **Unexpected errors**   | Shows a message suggesting you retry or contact support.                         |
