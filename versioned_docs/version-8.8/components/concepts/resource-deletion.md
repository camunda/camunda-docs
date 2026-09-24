---
id: resource-deletion
title: "Resource deletion"
description: "Use resource deletion to remove process definitions and decision requirements graphs from Camunda."
---

:::info
Resource deletions are currently not reflected in secondary storage. As a result you still see the deleted resources in Operate and Tasklist.
The resource does not actually exist. Starting an instance of the resource will yield an error.
:::

There are several reasons to delete resources from a cluster:

1. **It frees up storage space**, as Zeebe no longer needs to keep track of this definition in its state.
2. **It is more secure**, as it prevents creation of process instances for a faulty process definition.

You can use resource deletion to remove resources from Camunda. There are two types of resources that can
be deleted:

1. [Process definitions](./processes.md)
2. [Decision Requirements Graphs (DRG)](../modeler/dmn/decision-requirements-graph.md)

You can delete a resource using [Operate](../../components/operate/userguide/delete-resources.md), or by sending
the [delete resource command](../../apis-tools/zeebe-api/gateway-service.md#deleteresource-rpc) to the Zeebe API.

## Deleting a process definition

You can delete a process definition by sending a [delete resource command](../../apis-tools/zeebe-api/gateway-service.md#deleteresource-rpc)
and
providing the `process definition key` as the `resource key`.

You can delete any version of a process definition. After deletion, new process instances cannot be created for it: its start events are deactivated immediately, and attempts to create an instance result in a `NOT_FOUND` exception. If the definition has no running instances, it is removed from Zeebe's state right away. If it still has running instances, its record is retained until they finish (see [Draining](#draining)). Deleting a process definition also deletes historical data.

Zeebe will **never** reuse a process version. When deleting a process definition, it keeps track of the version number.
Deploying a new process with the same ID will increment the version as usual.

### Deleting the latest version

When deleting the `latest` known version of a process definition, the previous version becomes the new `latest`
version. Imagine there are three versions of a process deployed, where `Version 3` is the latest version. Deleting this
version
means:

- No more instances can be created for `Version 3`.
- Creating a new process instance of the `latest` version of this process will create a new process instance
  of `Version 2`, as this version became the new `latest`.
- If `Version 2` contains any timer start event(s), they are reactivated. They are triggered according to the defined
  schedule.
- If `Version 2` contains any message and/or signal start event(s), they are reactivated. Publishing a message or
  broadcasting a signal causes correlation and creates a new process instance of `Version 2`.

Deleting `Version 2` before `Version 3` results in the same thing. The only difference is that `Version 1` becomes the
new `latest` instead.

### Call activities

A [call activity](/components/modeler/bpmn/call-activities/call-activities.md) references a process by ID. It's
possible that all process definitions for this process ID are deleted. In this case, Zeebe creates an [incident](/components/concepts/incidents.md) on the
call activity, informing you that the process cannot be not found.

### Draining

Deleting a process definition that still has running instances is supported and does not block the cluster-wide command distribution queue. Instead of being rejected, the definition enters the `DRAINING` state and is removed automatically once its instances finish:

- **New instances are blocked immediately.** Start events are deactivated at delete time, and attempts to create an instance return `NOT_FOUND`, even though the definition's record still exists while it drains.
- **Running instances continue to completion.** The deletion does not cancel them.
- **Physical removal is asynchronous and per-partition.** Once a partition's last active instance of the definition finishes or is canceled, that partition removes the definition and transitions it to the deleted state.

A process definition moves through the following lifecycle states:

| State      | Meaning                                                                                                                               |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `ACTIVE`   | Deployed and able to create new instances.                                                                                            |
| `DRAINING` | Marked as deleted (new instances are blocked) while running instances drain. The record is retained until the last instance finishes. |
| `DELETING` | The last instance has drained and the definition is being physically removed on the partition. This is a brief internal transition.   |
| `DELETED`  | Fully removed.                                                                                                                        |

The Orchestration Cluster API process definition `state` field exposes `ACTIVE`, `DRAINING`, and `DELETED`. You can also track draining definitions with the draining indicator in [Operate](../operate/userguide/delete-resources.md).

## Deleting a decision requirements graph

You can delete a decision requirements graph (DRG) by sending
a [delete resource command](../../apis-tools/zeebe-api/gateway-service.md#deleteresource-rpc) and providing the `decision requirements key`
as the `resource key`.

Upon deleting a DRG, Zeebe also deletes decisions contained within. Trying to evaluate such a decision will result in
a `NOT_FOUND` exception. Deleting a DRG also deletes historical data.

### Business rule tasks

A [business rule task](/components/modeler/bpmn/business-rule-tasks/business-rule-tasks.md) references a decision
by ID. It's possible that all versions of this decision are deleted. When this happens, an incident is created on the
business rule task with the message that no decision with the given decision ID is found.
