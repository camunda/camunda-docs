---
id: process-instance-batch-modification
title: Process instance batch modification
description: "You may need to move multiple active process instances to allow execution to continue."
---

If there was an issue in process execution that caused you to enter the wrong process branch or data was corrupted, you may need to select multiple process instances and move them to the correct flownode in the process in a single operation.

:::note
If you only need to modify a single active process instance to allow execution to continue, instead use [Process instance modification](./process-instance-modification.md), which also provides some additional modification options beyond move modification.
:::

## Batch modification mode

On the process you want to apply the modification, select the flownode containing the process instances you intend to move.

![select-flownode](./img/batch-modification/select-flownode.png)

In the process instance list view, start selecting which instances you want to move. As you select instances, the process instance toolbar will appear and you will now see the **Move** action become available.

![select-instances-batch-move-available](./img/batch-modification/select-instances-batch-move-available.png)

Once you are ready to continue, click **Move**.

An information modal will appear indicating that you are switching to Process instance batch move mode.
![information-modal](./img/batch-modification/information-modal.png)

Click **continue** and the UI will change to indicate that you entered
batch modification mode. This is represented by a blue border, including a blue banner at the top and two buttons for applying or exiting modifications at the bottom.

![batch-mode-entered](./img/batch-modification/batch-mode-entered.png)

At this point you can continue to select or deselect instances as needed. You can also discard all current selected instances by either clicking the **Discard** option in the process instance toolbar, or by clearing the current selection.

You can exit the modification mode at any time by clicking **exit** below the process instance list view.

## Move selected process instances from one flow node to another

Select the flownode you want to move the selected process instances to.

![select-target-flownode](./img/batch-modification/select-target-flownode.png)

When you have made all your intended selections and you are ready to continue, click on **Apply Modification** below the process instance list view.

## Apply modifications

A confirmation modal will appear indicating that you are about to apply the selected modifications.

![confirmation-modal](./img/batch-modification/confirmation-modal.png)

Click the **Apply** button from the summary modal to start the batch modification.

## Monitor modifications

After the batch modification is started, you are directed to the instances list view where the batch modification progress can be monitored in the operations panel.

Click the **Instances** link in the operations panel entry to check how many process instances have been modified.

![monitor-progress](./img/batch-modification/monitor-progress-using-operations-panel.png)

## Non-supported modifications

Some elements do not support specific modifications:

- **Move** modifications are not possible for the following type of elements:
  - Start events
  - Boundary events
  - Events attached to event-based gateways
- **Move** modification is not possible for a subprocess itself.
- **Move** modifications are currently not possible for elements with multiple running scopes.
