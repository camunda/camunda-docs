---
id: process-instance-deletion
title: Process instance deletion
description: Delete all data for a completed or terminated process instance.
---

Use process instance deletion to permanently remove all data associated with a completed or terminated process instance.

:::warning
Deletion is irreversible. You can restore deleted data only by restoring a backup of your cluster.
:::

Delete a process instance using the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/delete-process-instance.api.mdx).

:::note
You can also delete a process instance in Operate. See the [Operate user guide](../operate/userguide/delete-finished-instances.md).
:::

## Call activities

### Delete a called process instance

If you delete a process instance that was created by a call activity, the parent process instance is not affected. Only the called process instance data is deleted.

In Operate, you can still see the parent process instance, but you can’t navigate to the called process instance.

### Delete a parent process instance

If you delete a parent process instance that contains a call activity, the called process instance is not affected. Only the parent process instance data is deleted.

In Operate, you can still see the called process instance, but navigating to it shows an empty screen.

## Limitations

You can delete only process instances in a **completed** or **terminated** state. This preserves consistency and integrity.

If the process instance is still active, cancel it first using the [cancel process instance API](/apis-tools/orchestration-cluster-api-rest/specifications/cancel-process-instance.api.mdx).

## Eventual consistency

Process instance deletion runs asynchronously. Depending on how many process instances you delete, it can take time for the data to be removed and for the process instance to disappear from Operate.

## Technical details

Deleting one or more process instances uses [batch operations](./batch-operations.md).

The Zeebe engine queries secondary storage for process instances to delete. For each instance found, the engine writes a delete command to the log, which results in a deleted event.

Exporters consume the deleted event and write a record to secondary storage to mark the process instance for deletion. Then, an asynchronous scheduled task deletes all data associated with each marked process instance.

```mermaid
sequenceDiagram
    V2 API->>+Engine: Delete process instances with filter
    Engine->>Engine: Create batch operation
    Engine->>-V2 API: Batch operation create response
    Engine->>+Secondary storage: Query process instances
    activate engine
    Secondary storage->>-Engine: Return process instance keys
    loop for each process instance key
    Engine->>Engine: Write DELETED event for each process instance key
    Engine->>+Exporter: Export DELETED event
    deactivate Engine
    Exporter->>-Secondary storage: Mark process instance for deletion
    end
    note over V2 API,Deletion job: Everything below this note happens asynchronously.
    Deletion job->>+Secondary storage: Retrieve marked process instance keys
    activate Deletion job
    Secondary storage->>-Deletion job: Return process instance keys
    loop for each process instance key
    Deletion job->>Deletion job: Delete associated data
    end
    deactivate Deletion job
```
