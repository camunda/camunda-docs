---
id: selections-operations
title: Initiate a batch operation
description: "In this user guide, you'll learn how to initiate batch operations in Camunda 8."
---

A user guide for initiating [batch operations](../../concepts/batch-operations.md) in Camunda 8 Operate.

## Retry or cancel process instances

Imagine one of your microservices was down for a long time, and this caused an incident in many of your process instances. After you've resolved the underlying issue and brought the microservice back up, you'll need to retry the process instances or they'll remain stuck, indefinitely.

You can use batch operations to retry or cancel many process instances at once:

1. In Operate, navigate to **Processes**.
2. In the **Process Instances** table, check the boxes next to the process instances to retry or cancel.
3. Click **Retry** or **Cancel**.
4. In the confirmation modal, click **Apply**.

## Move process instances

If there was an issue in process execution that caused you to enter the wrong process branch or data to be corrupted, you might need to move multiple process instances to another process node in a single operation.

You can use batch operations to move many process instances at once.

:::note
If you only need to modify a single, active process instance to allow execution to continue, use [process instance modification](./process-instance-modification.md) instead. This mode provides additional modification options beyond moving the instance, like activating an element and terminating an element instance.
:::

### Enter Batch Modification Mode

1. In Operate, navigate to **Processes**.
2. Select the **Name** and **Version** of the process you want to modify.
3. In the diagram, select the node containing the process instances to move.
4. In the **Process Instances** table, check the boxes next to the process instances to move.
5. Click **Move**.
6. In the modal, click **Continue**.

When you enter Batch Modification Mode, the UI changes to include a blue border and banner at the top.

:::note
Click **Exit** below the **Process instances** table to exit Batch Modification Mode.
:::

### Move selected process instances

In Batch Modification Mode, you can continue to select or deselect instances as needed. You can also click **Discard** to discard all currently-selected instances.

When you've finalized the process instances, move them to a new node:

1. In the diagram, select the destination node to move the process instances.
2. Click **Apply Modification** below the **Process instances** table.
3. A confirmation modal appears, indicating you are about to apply the selected modifications.
4. In the confirmation modal, click **Apply**.

:::warning Unsupported modifications
The following elements don't support move modifications:

- Start events
- Boundary events
- Events attached to event-based gateways
- Subprocesses
- Elements with multiple running scopes.
  :::

## Next steps

- [Monitor the operation status](../monitor-operation-status).
- [Learn how batch operations work](../../zeebe/technical-concepts/batch-operations.md).
- [Check out the batch operations API](/apis-tools/orchestration-cluster-api-rest/specifications/get-batch-operation.api.mdx).
