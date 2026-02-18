---
id: process-instance-migration
title: Migrate process instances
description: "Migrate process instances from one process version to another using the process instance migration feature."
---

Learn how to migrate process instances from one process definition version to another in Camunda 8 Operate.

## Before you begin

Before you try to migrate process instances, learn about the [limitations](/components/concepts/process-instance-migration.md#limitations) of process instance migration.

## Select process instances

1. From the **Processes** page, select a specific process and version from the **Filter** panel. This will be the source process version where instances are migrated from.
2. Select all instances from the **Process Instances** table that should be migrated to another process version.
3. Click **Migrate** to enter the migration view.
4. In the modal, click **Continue**.

The migration view features three areas: the source process diagram (top left), the target process diagram (top right) and the flow node mapping (bottom panel).

## Select a target process version

Above the target process diagram, enter a target process into the **Target** box, and select a version from the dropdown. This will be the process version where all selected process instances are migrated to.

## Map source and target nodes

In the bottom panel, you can see a list of all service tasks from the source process.

1. Use the dropdowns to select a target flow node for each source flow node that should be part of the migration. It is currently only possible to map elements with migration [supported by Zeebe](/components/concepts/process-instance-migration.md#supported-bpmn-elements).
2. (Optional) Click on a flow node in the diagram or on a source flow node row in the bottom panel to see how flow nodes are mapped.
3. In the footer, click **Next** for a preview of the migration plan.

Now, you can see a preview of how flow nodes are mapped and how many process instances are expected to be migrated.

## Start the migration

1. In the footer, click **Confirm** to review your migration.
2. When ready, enter the word **MIGRATE** into the text box.
3. Click **Confirm** again to start the migration operation.

## Next steps

- [Monitor the batch operation](./monitor-batch-operations.md).
- [Learn about the limitations of process instance migration](/components/concepts/process-instance-migration.md#limitations).
