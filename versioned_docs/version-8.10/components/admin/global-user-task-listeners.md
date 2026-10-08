---
id: global-user-task-listeners
title: "Global user task listeners"
sidebar_label: "Global user task listeners"
description: "Configure and manage global user task listeners through the Admin UI."
---

Use Admin to manage [global user task listeners](/components/concepts/global-user-task-listeners.md), which are cluster-wide listeners that react to user task lifecycle events across all processes.

## About global user task listeners

Global user task listeners allow you to define listeners once for all processes in a cluster, instead of individually per user task. They are useful for centralizing audit logging, notifications, governance rules, and other cross-cutting concerns.

:::tip
To learn more about global user task listeners, including execution order, supported features, and configuration options, see the [global user task listeners concept page](/components/concepts/global-user-task-listeners.md).
:::

You can manage global user task listeners through the Admin UI, [Unified Configuration](/components/concepts/global-user-task-listeners/configuration.md#configure-through-unified-configuration), or the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/create-global-task-listener.api.mdx).

## Manage global user task listeners in Admin

The Admin UI provides a user-friendly interface to manage global user task listeners in the **Global User Task Listeners** tab. Changes made through the Admin UI take effect immediately, without requiring a cluster restart.

:::note
The Admin UI uses the Orchestration Cluster API to manage listeners. Listeners created through the Admin UI have their `source` property set to `API`.
:::

### Create a global user task listener

1. Log in to Admin in your cluster, and select the **Global User Task Listeners** tab.
2. Click **Create listener**.
3. Provide the following details:
   - **Listener ID**: A unique identifier for the listener.
   - **Listener type**: The name of the listener type. Job workers use this to identify and process listener jobs.
   - **Event type**: The user task lifecycle events that trigger the listener, selected from the dropdown menu with the following supported values: "All events", "Assigning", "Canceling", "Completing", "Creating", and "Updating".
   - **Retries** (optional): Number of retries for the listener job. Defaults to `3`.
     - **Execution order**: When the global listener should be executed with respect to model-level ones. Supported values: "Before model-level listeners" or "After model-level listeners".
   - **Priority** (optional): The priority of the listener. Higher priority listeners are executed first. Defaults to `50`.
4. Click **Create**.

The listener is created and immediately applies to new lifecycle events for both running and new process instances.

### Update a global user task listener

1. Log in to Admin in your cluster, and select the **Global User Task Listeners** tab.
2. Click the **pencil icon** next to the listener you want to update.
3. Update the listener details.
4. Click **Update**.

The updated listener configuration applies immediately to new lifecycle events.

### Delete a global user task listener

1. Log in to Admin in your cluster, and select the **Global User Task Listeners** tab.
2. Click **Delete** next to the listener you want to delete.
3. Confirm the deletion by clicking **Delete** in the confirmation dialog.

The listener is deleted and no longer triggers for new lifecycle events. In-progress listener jobs are not affected.

### Known limitations

The Admin UI retrieves the listener list from secondary storage. Because secondary storage is eventually consistent, changes might not appear immediately.

## See also

- [Global user task listeners](/components/concepts/global-user-task-listeners.md) — learn about execution order, supported features, and configuration options.
- [User task listeners](/components/concepts/user-task-listeners.md) — learn about model-level user task listeners.
- [Orchestration Cluster API: Create global task listener](/apis-tools/orchestration-cluster-api-rest/specifications/create-global-task-listener.api.mdx) — manage listeners via API.
