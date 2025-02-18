---
id: resource-deletion
title: "Resource deletion"
description: "Use resource deletion to remove process definitions and decision requirements graphs from Camunda."
---

There are several reasons to delete resources from a cluster:

1. **It frees up storage space**, as Zeebe no longer needs to keep track of this definition in its state.
2. **It improves the overview in Operate**, as deleted processes are no longer shown in the UI.
3. **It is more secure**, as it prevents creation of process instances for a faulty process definition.

You can use resource deletion to remove resources from Camunda. There are two types of resources that can
be deleted:

1. [Process definitions](./processes.md)
2. [Decision Requirements Graphs (DRG)](../modeler/dmn/decision-requirements-graph.md)

You can delete a resource using [Operate](../../components/operate/userguide/delete-resources.md), or by sending
the [delete resource command](/apis-tools/zeebe-api/gateway-service.md#deleteresource-rpc) to the Zeebe API.

## Deleting a process definition

You can delete a process definition by sending a [delete resource command](/apis-tools/zeebe-api/gateway-service.md#deleteresource-rpc)
and
providing the `process definition key` as the `resource key`.

It's possible to delete any version of a process instance. Once you have deleted a process definition, it no longer
exists in
Zeebe's state. As a result, it is not possible to create new process instances for this process definition. Trying
to create one will result in a `NOT_FOUND` exception. Deleting a process definition also deletes historical data.

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

### Limitations

As of now it is not possible to delete a process definition that has one or more running process instances. If you want
to delete the process definition you must first terminate/complete any running instances.

## Deleting a decision requirements graph

You can delete a decision requirements graph (DRG) by sending
a [delete resource command](/apis-tools/zeebe-api/gateway-service.md#deleteresource-rpc) and providing the `decision requirements key`
as the `resource key`.

Upon deleting a DRG, Zeebe also deletes decisions contained within. Trying to evaluate such a decision will result in
a `NOT_FOUND` exception. Deleting a DRG also deletes historical data.

### Business rule tasks

A [business rule task](/components/modeler/bpmn/business-rule-tasks/business-rule-tasks.md) references a decision
by ID. It's possible that all versions of this decision are deleted. When this happens, an incident is created on the
business rule task with the message that no decision with the given decision ID is found.
