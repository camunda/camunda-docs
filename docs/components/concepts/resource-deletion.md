---
id: resource-deletion
title: "Resource deletion"
description: "Delete a resource"
---

You can use Resource deletion to remove resources from the Camunda Platform. There is two types or resources that can be
deleted:

1. Process definitions
2. Decision Requirements Graphs (DRG)

You can delete a resource through Operate, or by sending
the [Delete Resource command](/docs/apis-tools/grpc.md#deleteresource-rpc) to the Zeebe API.

There are several reasons to delete resources from a cluster:

1. **It frees up storage space**, as Zeebe no longer needs to keep track of this definition in its state.
2. **It improves the overview in Operate**, as deleted process are no longer shown in the UI.
3. **It is more secure**, as it prevents creation of process instances for a faulty process definition.

## Deleting a process definition

You can delete a process definition by sending a [Delete Resource command](/docs/apis-tools/grpc.md#deleteresource-rpc)
and
providing the `process definition key` as the `resource key`.

It's possible to delete any version of a process instance. Once you have deleted a process definition it no longer
exists in
Zeebe's state. As a result, it is not possible to create new process instances can for this process definition. Trying
to create one
regardless will result in a `NOT_FOUND` exception. Deleting a process definition also deletes historical data.

Zeebe will **never** reuse a process version. When deleting a process definition it keeps track of the version number.
Deploying a new process with the same id will increment the version as usual.

### Deleting the latest version

When deleting the `latest` known version of a process definition, the previous version becomes the new `latest`
version. Imagine there are 3 versions of a process deployed. Version 3 is the `latest` version. Deleting this version
means:

- No more instances can be created for version 3
- Creating a new process instance of the `latest` version of this process will create a new process instance of version
  2, as this version became the new `latest`
- If version 2 contains any timer start event(s), they are reactivated. They get triggered according to the defined
  schedule.
- If version 2 contains any message and/or signal start event(s) they are reactivated. Publishing a message or
  broadcasting a signal causes correlation and creates a new process instance of version 2.

Deleting version 2 before version 3 results in the same thing. The only difference is that version 1 becomes the
new `latest` instead.

### Call Activities

A [call activity](/docs/components/modeler/bpmn/call-activities/call-activities.md) references a process by id. It's
possible that all process definitions for this process id are deleted. In this case the Zeebe creates an incident on the
call activity, informing you that the process cannot be not found.

### Limitations

As of now it is not possible to delete a process definition that has one or more running process instances.

## Deleting a Decision Requirements Graph

You can delete a Decision Requirements Graph (DRG) by sending
a [Delete Resource command](/docs/apis-tools/grpc.md#deleteresource-rpc) and providing the `decision requirements key`
as the `resource key`.

Upon deleting a DRG Zeebe also deletes decisions contained within. Trying to evaluate such a decision will result in
a `NOT_FOUND` exception. Deleting a DRG also deletes historical data.

### Business Rule Tasks

A [business rule task](/docs/components/modeler/bpmn/business-rule-tasks/business-rule-tasks.md) references a decision
by id. It's possible that all versions of this decision are deleted. When this happens an incident is created on the
business rule task with the message that no decision with the given decision id is found.
