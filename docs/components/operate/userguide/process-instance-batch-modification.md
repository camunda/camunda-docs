---
id: process-instance-batch-modification
title: Move a batch of process instances
description: "You may need to move multiple active process instances to allow execution to continue."
---

Learn how to move a [batch](../../concepts/batch-operations.md) of process instances from one node to another in Camunda 8 Operate.

## Overview

If there was an issue in process execution that caused you to enter the wrong process branch or data was corrupted, you may need to select multiple process instances and move them to the correct flow node in the process in a single operation.

:::note
If you only need to modify a single active process instance to allow execution to continue, use [process instance modification](./process-instance-modification.md) instead, which also provides some additional modification options beyond move modification, like activating an element, terminating an element instance, etc.
:::

## Unsupported modifications

Some elements do not support specific modifications:

- **Move** modifications are not possible for the following types of elements:
  - Start events
  - Boundary events
  - Events attached to event-based gateways
- **Move** modification is not possible for a subprocess itself.

## Enter batch modification mode

1. On the **Processes** page, in the **Filter** panel, select the **Name** and **Version** of the process you want to modify.
2. Select the flow node containing the process instances you intend to move.
3. In the **Process Instances** table, start selecting which instances you want to move. As you select instances, the process instance toolbar will appear and you will now see the **Move** action become available.
4. Once you are ready to continue, click **Move**. An information modal will appear indicating that you are switching to process instance batch move mode.
5. Click **Continue** and the UI will change to indicate that you entered batch modification mode. This is represented by a blue border, including a blue banner at the top and two buttons for applying or exiting modifications at the bottom.
6. You can now continue to select or deselect instances as needed. You can also discard all current selected instances by either clicking the **Discard** option in the process instance toolbar, or by clearing the current selection.

Exit the modification mode at any time by clicking **Exit** in the footer.

## Move selected process instances from one flow node to another

1. Select the flow node you want to move the selected process instances to.
2. When you have made all your intended selections and you are ready to continue, click **Apply Modification** in the footer. A confirmation modal will appear indicating that you are about to apply the selected modifications.
3. Click the **Apply** button from the summary modal to start the batch modification.

When moving elements inside multi-instance subprocesses, the move operation terminates only that specific element instance and activates the target element in the same instance of the multi-instance subprocess.

## Next steps

- [Monitor the batch operation](./monitor-batch-operations.md).
- [Learn how batch operations work](../../zeebe/technical-concepts/batch-operations.md).
