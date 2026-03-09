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

You can delete any version of a process definition. After deletion, the definition no longer exists in Zeebe's state and new process instances cannot be created for it. Attempts to create a new instance result in a `NOT_FOUND` exception.

Deleting a process definition also deletes historical data.

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

### Limitations

You cannot delete a process definition that has one or more running process instances. Terminate or complete all running instances before deleting the definition.

### Historic data

Optionally enable historic data deletion to permanently remove all data related to the process definition from secondary storage.

:::warning
Deletion is irreversible. Restore deleted data only by restoring a backup of your cluster.
:::

Delete historic data for a process definition using the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/delete-resource.api.mdx) and set the `deleteHistory` flag to `true`.

You can also delete a process definition with historic data using Operate. See the [Operate user guide](../operate/userguide/delete-resources.md#delete-process-definition).

If you only want to delete process instance data, see [process instance deletion](./process-instance-deletion.md).

#### Eventual consistency

Historic data deletion runs asynchronously. Depending on the amount of data, it may take time for the data to be removed and for it to disappear from Operate and Tasklist.

## Deleting a decision requirements graph

Delete a decision requirements graph (DRG) by sending a [delete resource command](/apis-tools/zeebe-api/gateway-service.md#deleteresource-rpc) and providing the `decision requirements key` as the `resource key`.

Deleting a DRG also deletes the decisions it contains. Attempts to evaluate a deleted decision result in a `NOT_FOUND` exception. Deleting a DRG also deletes historical data.

### Business rule tasks

A [business rule task](/components/modeler/bpmn/business-rule-tasks/business-rule-tasks.md) references a decision by ID. If all versions of that decision are deleted, Zeebe creates an incident on the business rule task indicating that no decision with the given ID can be found.

### Historic data

Optionally enable historic data deletion to permanently remove all data related to the decision definition from secondary storage.

:::warning
Deletion is irreversible. Restore deleted data only by restoring a backup of your cluster.
:::

Delete historic data for a decision definition using the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/delete-resource.api.mdx) and set the `deleteHistory` flag to `true`.

You can also delete historic data for a decision definition in Operate. See the [Operate user guide](../operate/userguide/delete-resources.md#delete-decision-definition).

If you only want to delete decision instance data, see [decision instance deletion](./decision-instance-deletion.md).

#### Eventual consistency

Historic data deletion runs asynchronously. Depending on the amount of data, it may take time for the data to be removed and for it to disappear from Operate and Tasklist.
