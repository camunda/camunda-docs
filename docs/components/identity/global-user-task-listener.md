---
id: global-user-task-listener
title: "Global user task listeners"
sidebar_label: "Global user task listeners"
description: "Manage global user task listeners in Identity to centrally apply listener logic across all processes in your cluster."
---

<span class="badge badge--platform">Self-Managed only</span>

Use Identity to manage global user task listeners and centrally apply [user task listener](/components/concepts/user-task-listeners.md) logic across all processes in your cluster.

## About global user task listeners

A [global user task listener](/components/concepts/global-user-task-listeners.md) is a cluster-wide listener that reacts to user task lifecycle events across all processes without requiring any changes to individual BPMN models.

You can manage global user task listeners directly in Identity, using the **Global user task listeners** page.

:::tip
You can also manage global user task listeners using the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/create-global-user-task-listener.api.mdx).
:::

## Create a global user task listener

1. Log in to Identity and open the **Global user task listeners** page.

2. Click **Create listener**. In the modal, provide the following details:

   | Field                | Required | Description                                                                                                                                                              |
   | :------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **Job type**         | Yes      | The job type that identifies the listener. Job workers subscribe to this type to receive listener jobs. Must be unique across all global user task listeners.            |
   | **Event types**      | Yes      | One or more user task lifecycle events that trigger the listener: `creating`, `assigning`, `updating`, `completing`, or `canceling`. Select **All** to match all events. |
   | **Retries**          | No       | Number of retries for the listener job. Defaults to `3`.                                                                                                                 |
   | **After non-global** | No       | When enabled, this listener runs after all model-level listeners for the same event. By default, global listeners run before model-level listeners.                      |

3. Click **Create listener**.

4. The listener appears in the list. If not, refresh the page.

## Update a global user task listener

1. In the **Global user task listeners** list, locate the listener you want to update.
2. Click **Edit** (pencil icon) next to the listener.
3. Update the **Event types**, **Retries**, or **After non-global** fields as needed.

   :::note
   The **Job type** (identifier) cannot be changed after creation. To change the job type, delete the listener and create a new one.
   :::

4. Click **Save**.

## Delete a global user task listener

1. In the **Global user task listeners** list, locate the listener you want to delete.
2. Click **Delete** next to the listener and confirm the deletion.

:::warning
Deleting a listener stops it from being triggered for new lifecycle events. Any in-progress listener jobs already dispatched by the cluster continue to completion.
:::

## See also

- [Global user task listeners concept](/components/concepts/global-user-task-listeners.md)
- [Orchestration Cluster API – Global User Task Listener](/apis-tools/orchestration-cluster-api-rest/specifications/create-global-user-task-listener.api.mdx)
