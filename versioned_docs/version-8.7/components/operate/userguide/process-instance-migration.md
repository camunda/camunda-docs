---
id: process-instance-migration
title: Process instance migration
description: "Migrate process instances from one process version to another using the process instance migration feature."
---

Process instances can be migrated from one specific process definition version to another using the process instance migration feature.

## Process instance selection

1. Select a specific process and version from the filters panel. This will be the source process version where instances is migrated from.

![operate-view-process-filters](./img/process-instance-migration/process-filters.png)

2. Select all instances from the process instances list that should be migrated to another process version. In this example, three instances from `orderProcess` will be migrated.

3. Click **Migrate** to enter migration view.

![operate-migrate-button](./img/process-instance-migration/migrate-button.png)

:::note
It is only possible to migrate running process instances, meaning instances in an active or incident state. All other process instances will not be part of the migration plan and will be ignored. Learn more about [all limitations](/components/concepts/process-instance-migration.md#limitations).
:::

The migration view features three areas: the source process diagram (top left), the target process diagram (top right) and the flow node mapping (bottom panel).

4. Enter a target process into the **Target** box, and select a version from the dropdown. This will be the process version where all selected process instances are migrated to.

![operate-select-target-process](./img/process-instance-migration/select-target-process.png)

In the bottom panel, you can see a list of all service tasks from the source process.

5. Use the dropdowns to select a target flow node for each source flow node that should be part of the migration.

In this example, all service tasks from version 1 of `orderProcess` are each mapped to the same service task from version 2 of `orderProcess`.

![operate-view-process-filters](./img/process-instance-migration/map-elements.png)

:::note
It is currently only possible to map elements with migration supported by Zeebe. Learn more about [supported elements](/components/concepts/process-instance-migration.md#supported-bpmn-elements).
:::

6. (Optional) Click on a flow node in the diagram or on a source flow node row in the bottom panel to see how flow nodes are mapped.

In this example, process instances will be migrated from `Check payment` flow node from version 1 of `orderProcess` to the same `Check payment` flow node in version 2 of `orderProcess`.

7. Click **Next** for a preview of the migration plan.

![operate-view-process-filters](./img/process-instance-migration/highlight-mapping.png)

Now, you can see a preview of how flow nodes are mapped and how many process instances are expected to be migrated. In this example, three active instances of the `Check payment` flow node will be migrated from version 1 to version 2 of `orderProcess`.

8. Click **Confirm** to review your migration. When ready, enter the word **MIGRATE** into the text box, and click **Confirm** again to start the migration operation.

![operate-view-process-filters](./img/process-instance-migration/summary.png)

## Monitor the migration operation status

Review the [monitor operation status documentation](../monitor-operation-status) to learn how to monitor the status of a migration operation.
