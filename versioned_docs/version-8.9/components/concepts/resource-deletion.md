---
id: resource-deletion
title: Resource deletion
description: Delete process definitions and decision requirements graphs from Camunda.
---

Use resource deletion to remove resources from a cluster when they are no longer needed or should no longer be used.

Deleting resources:

1. **Frees storage space**, as Zeebe no longer needs to keep the definition in its state.
2. **Prevents new instances from being created**, which can help avoid usage of faulty process definitions.

The following resource types can be deleted:

1. [Process definitions](./processes.md)
2. [Decision Requirements Graphs (DRG)](../modeler/dmn/decision-requirements-graph.md)

Delete a resource using [Operate](../../components/operate/userguide/delete-resources.md) or by sending the [delete resource command](/apis-tools/zeebe-api/gateway-service.md#deleteresource-rpc) to the Zeebe API.

## Deleting a process definition

Delete a process definition by sending a [delete resource command](/apis-tools/zeebe-api/gateway-service.md#deleteresource-rpc) and providing the `process definition key` as the `resource key`.

You can delete any version of a process definition. After deletion, new process instances cannot be created for it: its start events are deactivated immediately, and attempts to create an instance result in a `NOT_FOUND` exception. If the definition has no running instances, it is removed from Zeebe's state right away. If it still has running instances, its record is retained until they finish (see [Draining](#draining)).

Zeebe **never** reuses a process version. Even after deletion, Zeebe continues tracking version numbers. Deploying a new process with the same ID increments the version as usual.

### Deleting the latest version

When deleting the `latest` version of a process definition, the previous version becomes the new `latest`.

For example, if three versions exist and `Version 3` is the latest, deleting it results in the following:

- No new instances can be created for `Version 3`.
- Creating a new process instance using `latest` creates an instance of `Version 2`.
- If `Version 2` contains timer start events, they are reactivated and triggered according to their schedule.
- If `Version 2` contains message or signal start events, they are reactivated. Publishing a message or broadcasting a signal creates a new process instance of `Version 2`.

Deleting `Version 2` before `Version 3` produces the same behavior, except `Version 1` becomes the new `latest`.

### Call activities

A [call activity](/components/modeler/bpmn/call-activities/call-activities.md) references a process by ID. If all process definitions for that process ID are deleted, Zeebe creates an [incident](/components/concepts/incidents.md) on the call activity indicating that the referenced process cannot be found.

### Draining

Deleting a process definition that still has running instances is supported and does not block the cluster-wide command distribution queue. Instead of being rejected, the definition enters the `DRAINING` state and is removed automatically once its instances finish:

- **New instances are blocked immediately.** Start events are deactivated at delete time, and attempts to create an instance return `NOT_FOUND`, even though the definition's record still exists while it drains.
- **Running instances continue to completion.** The deletion does not cancel them.
- **Physical removal is asynchronous and per-partition.** Once a partition's last active instance of the definition finishes or is canceled, that partition removes the definition and transitions it to the deleted state.

A process definition moves through the following lifecycle states:

| State      | Meaning                                                                                                                                 |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `ACTIVE`   | Deployed and able to create new instances.                                                                                              |
| `DRAINING` | Deleted for new use (new instances are blocked) while running instances drain. The record is retained until the last instance finishes. |
| `DELETING` | The last instance has drained and the definition is being physically removed on the partition. This is a brief internal transition.     |
| `DELETED`  | Fully removed.                                                                                                                          |

The Orchestration Cluster API [process definition `state` field](/apis-tools/orchestration-cluster-api-rest/specifications/get-process-definition.api.mdx) exposes `ACTIVE`, `DRAINING`, and `DELETED`. You can also track draining definitions with the draining indicator in [Operate](../operate/userguide/delete-resources.md#delete-process-definition).

:::note
**Upgrade consideration:** if you used draining deletion on 8.8, upgrade to 8.9.19 or later. Earlier 8.9 patches cannot replay the draining state on startup. See [Process definition draining deletion requires an 8.9.19+ upgrade target](/reference/announcements-release-notes/880/880-announcements.md#draining-deletion-upgrade-constraint).
:::

### Historic data

By default, deleting a process definition removes it from Zeebe's runtime state only; new instances can no longer be created from it. Its historic data remains in secondary storage until explicitly deleted, so the definition may continue to appear in Operate and Tasklist history views until then.

Optionally enable historic data deletion to permanently remove all data related to the process definition from secondary storage.

:::warning
Deletion is irreversible. Restore deleted data only by restoring a backup of your cluster.
:::

Delete historic data for a process definition using the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/delete-resource.api.mdx) and set the `deleteHistory` flag to `true`.

You can also delete a process definition with historic data using Operate. See the [Operate user guide](../operate/userguide/delete-resources.md#delete-process-definition).

If you only want to delete process instance data, see [process instance deletion](./process-instance-deletion.md).

#### Eventual consistency

Historic data deletion runs asynchronously. Depending on the amount of data, it may take time for the data to be removed and for it to disappear from Operate and Tasklist.

If the definition is [draining](#draining), history deletion is deferred: the `deleteHistory` operation does not run when you submit the delete, but only after the definition has been physically deleted on all partitions. Draining instances keep exporting events until they finish, so their historic data cannot be removed before then.

## Deleting a decision requirements graph

Delete a decision requirements graph (DRG) by sending a [delete resource command](/apis-tools/zeebe-api/gateway-service.md#deleteresource-rpc) and providing the `decision requirements key` as the `resource key`.

Deleting a DRG also deletes the decisions it contains. Attempts to evaluate a deleted decision result in a `NOT_FOUND` exception. Deleting a DRG also deletes historical data.

### Business rule tasks

A [business rule task](/components/modeler/bpmn/business-rule-tasks/business-rule-tasks.md) references a decision by ID. If all versions of that decision are deleted, Zeebe creates an incident on the business rule task indicating that no decision with the given ID can be found.

### Historic data

By default, deleting a decision requirements graph removes it from Zeebe's runtime state only. Its historic data remains in secondary storage until explicitly deleted, so it may continue to appear in Operate and Tasklist history views until then.

Optionally enable historic data deletion to permanently remove all data related to the decision definition from secondary storage.

:::warning
Deletion is irreversible. Restore deleted data only by restoring a backup of your cluster.
:::

Delete historic data for a decision definition using the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/delete-resource.api.mdx) and set the `deleteHistory` flag to `true`.

You can also delete historic data for a decision definition in Operate. See the [Operate user guide](../operate/userguide/delete-resources.md#delete-decision-definition).

If you only want to delete decision instance data, see [decision instance deletion](./decision-instance-deletion.md).

#### Eventual consistency

Historic data deletion runs asynchronously. Depending on the amount of data, it may take time for the data to be removed and for it to disappear from Operate and Tasklist.
