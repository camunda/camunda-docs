---
id: process-instance-modification
title: Process instance modification
description: "You may need to modify an active process instance to allow execution to continue."
---

You may need to modify an active process instance to allow execution to continue. The execution may be stuck, and you may want to continue the execution on a different activity (i.e. skip or repeat activities).

:::note
If an issue in process execution caused you to enter the wrong process branch instead of moving each process instance individually, use [process instance batch modification](./process-instance-batch-modification.md) instead to select multiple process instances and move them to the correct flow node in the process in a single operation.
:::

## Modification mode

To enter modification mode, click the modify icon on the process instance header.

![enter-modification-mode](../../../images/operate/modifications/enter-modification-mode.png)

The UI will change when you enter modification mode, including a blue banner at the top and two buttons for applying or discarding modifications at the bottom.

![modification-mode](../../../images/operate/modifications/modification-mode.png)

## Cancel all running tokens on a flow node

To cancel all running tokens on a flow node, take the following steps:

1. Select the flow node you want to cancel all the running tokens on.

2. Click **Cancel instance** from the dropdown.

![cancel-token](../../../images/operate/modifications/cancel-token.png)

View the pending modification reflected in the instance history.

![cancel-token-result](../../../images/operate/modifications/cancel-token-result.png)

## Add a new token to a flow node

To add a new token to a flow node, take the following steps:

1. Select the flow node you want to add the new token to.

2. Click **Add** from the dropdown.

![add-token](../../../images/operate/modifications/add-token.png)

View the pending modification reflected in the instance history.

![add-token-result](../../../images/operate/modifications/add-token-result.png)

## Move all running tokens from one flow node to another

The move operation is equivalent to the combination of **Cancel** and **Add** modifications. The modifications described previously can also be achieved with one single move modification.

1. Select the flow node you want to move the running tokens from.

2. Click **Move instance** from the dropdown.

![move-token](../../../images/operate/modifications/move-token.png)

3. Select the flow node you want to move the running tokens to.

![move-token-select-target](../../../images/operate/modifications/move-token-select-target.png)

View the pending modification reflected in the instance history.

![move-token-result](../../../images/operate/modifications/move-token-result.png)

## Add variable to new scopes

During the modification mode, if there are new scopes generated it will be possible to add variables to these new scopes by following these steps:

1. Select the new scope from the instance history you want to add a variable to.

![select-new-scope](../../../images/operate/modifications/select-new-scope.png)

2. Click **Add Variable** from the variables panel.

![add-variable-to-new-scope](../../../images/operate/modifications/add-variable-to-new-scope.png)

3. Fill out the **Name** and **Value** fields for the variable you want to add.

4. Once you blur out of the field (click anywhere on the screen other than the last edited variable field), assuming the fields have the valid values, the new variable will be added to the pending modifications.

![add-variable-result](../../../images/operate/modifications/add-variable-result.png)

## Edit variable on existing scopes

During modification mode it is possible to edit existing variables in existing scopes by following these steps:

1. Select the existing scope from the instance history you want to edit variables on.

![edit-variable-on-existing-scope](../../../images/operate/modifications/edit-variable-on-existing-scope.png)

2. Edit the variable value from the variables panel.

![edit-variable-value](../../../images/operate/modifications/edit-variable-value.png)

3. Once you blur out of the field (click anywhere in the screen other than the last edited variable field), assuming the new value is valid, the **Edit Variable** modification will be added to the pending modifications.

![edit-variable-result](../../../images/operate/modifications/edit-variable-result.png)

## View summary of pending modifications

To display the pending modifications, click **Apply Modifications** in the footer.

![apply-modifications-button](../../../images/operate/modifications/apply-modifications-button.png)

A modal will be displayed where all modifications can be seen.

![modification-summary-modal](../../../images/operate/modifications/modification-summary-modal.png)

Within this modal, you can take the following actions:

- (1) Delete any modification by clicking the **Delete Icon**.
- (2) View an added/edited variable in a JSON/Diff Viewer.
- (3) Cancel/close the modal and continue with modification mode.
- (4) Apply the modifications and exit modification mode.

## Undo modification

Clicking **Undo** from the modification footer will undo the latest modification.

![undo-modification](../../../images/operate/modifications/undo-modification.png)

## Apply modifications

If you click the **Apply** button from the summary modal as described [here](#view-summary-of-pending-modifications), and modification operation is created successfully, you will observe a success notification and changes will be reflected in a short time.

![applied-modifications](../../../images/operate/modifications/applied-modifications.png)

## Non-supported modifications

Some elements do not support specific modifications:

- **Add token**/**Move tokens to** modifications are not possible for the following type of elements:
  - Start events
  - Boundary events
  - Events attached to event-based gateways
- **Move tokens from** modification is not possible for a subprocess itself.
- **Add token**/**Move tokens to** modifications are currently not possible for elements with multiple running scopes.

![not-supported-flow-nodes](../../../images/operate/modifications/not-supported-flow-nodes.png)

## Monitor the modification operation status

Review the [monitor operation status documentation](../monitor-operation-status) to learn how to monitor the status of an operation.
