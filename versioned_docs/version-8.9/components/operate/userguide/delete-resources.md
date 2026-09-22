---
id: delete-resources
title: Delete resources
description: "Let's delete process and decision definitions."
---

Learn how to delete a specific process or decision definition version in Camunda 8 Operate.

## Delete process definition

:::warning
Deleting a process definition permanently removes it and has the following effects:

- All the deleted process definition's finished process instances will be deleted from the application.
- All decision and process instances referenced by the deleted process instances will be deleted.
- If a process definition contains user tasks, they will be deleted from [Tasklist](/components/tasklist/introduction-to-tasklist.md).
  :::

To delete a process definition from the **Processes** page, take the following steps:

1. In the **Filter** panel, select a specific process version by filtering by process name and version. In Operate, you can only delete a version that has no running instances; the **Delete** button is disabled otherwise. You can [cancel or resolve running process instances](/components/operate/userguide/basic-operate-navigation.md) from the process instances list or from the process instance detail page.
2. Click the **Delete** button at the top right.
3. Confirm the delete operation by checking the checkbox and clicking **Delete**.

:::note
A process definition that was deleted while it still had running instances (for example, using the [delete resource command](/apis-tools/zeebe-api/gateway-service.md#deleteresource-rpc)) is [draining](/components/concepts/resource-deletion.md#draining). Operate marks it with a **Draining** tag and removes it automatically once its last instance finishes. To see which instances are keeping it alive, open the definition and view its running instances.
:::

## Delete decision definition

:::warning
Deleting a decision definition will delete the DRD and will impact the following:

- Deleting a decision definition removes the DRD that contains it. All other decision tables and literal expressions that are part of the DRD will also be deleted.
- Deleting the only existing version of a decision definition could result in process incidents.
  :::

1. On the **Decisions** page, select a specific decision version by filtering by decision name and version.
2. Click the **Delete** button at the top right.
3. Confirm the delete operation by checking the checkbox and clicking **Delete**.
