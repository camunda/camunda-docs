---
id: process-instance-migration
title: "Process instance migration"
description: "Use process instance migration to change the process definition of a running process instance."
---

Process instance migration fits a running process instance to a different process definition.
This can be useful when the process definition of a running process instance needs changes due to bugs or updated requirements.

:::tip
To repair a broken process instance without making changes to the process definition, use [process instance modification](./process-instance-modification.md) instead.
:::

Use the [migration command](/apis-tools/zeebe-api/gateway-service.md#migrateprocessinstance-rpc) to change the process model of a running process instance.

:::note
You can also migrate your process instances using Operate's UI by following [the user guide](../operate/userguide/process-instance-migration.md).

:::

## Changing the process instance flow for inactive parts

Process instance migration allows you to adjust the process model of your process instance to fit to new requirements.

Let's consider an example.

The process instance below contains a completed start event, an active service task `A`, and an end event.
Once you complete the service task `A`, the process will reach the end event.

![The process instance is waiting at the active service task A.](assets/process-instance-migration/migration-basic_before.png)

However, the requirements of our process have changed.

Instead of completing the process, we want to add a user task `B` after the service task `A` and before the end event.

![In the new process version the service task A flows to a user task B.](assets/process-instance-migration/migration-basic_target.png)

We can create new process instances according to this new process model after deploying it, but we also want our active process instances to receive the update and reach user task `B` when service task `A` is completed.

<!--
I'm using process, process model, and process definition interchangeably, because I don't know what's best.
Using it interchangeably might help users pick up an understanding of what we mean (some may know it as a model, others as a process).
But, it's also inconsistent.
Should we use all terms or should we select a specific one.
The API refers to it as the "process instance's process definition" and the "target process definition".
-->

To achieve this, we can migrate our process instance from its current process to the newly deployed one. You must provide a migration plan with mapping instructions to the target process definition to clarify your intentions.

In our example, we'll provide a mapping instruction from source element ID `A` to target element ID `A`. This means we expect any active element instances of element with ID `A` to be migrated to the element with ID `A` in the target process.
Therefore, our process instance will continue to be active at service task `A`.

![Once the service task A is completed, the process instance will flow to the user task B.](assets/process-instance-migration/migration-basic_after.png)

After migrating our process instance, we can now complete the service task `A` to reach user task `B`.

Process instance migration allows you to change the inactive parts of the process instance. In our example, we placed a user task `B` between the active service task `A` and the inactive end event. We did not change the active service task `A`, just the steps that follow.

## Changing the active elements

Sometimes your requirements change so much that the currently active element no longer exists in the new process version.

Consider the following example: the process contains a completed exclusive gateway, taking the sequence flow to the service task `A` which is currently active.
It did not take the sequence flow to service task `B`, so it is inactive.

![The process instance is waiting at the active service task A while service task B is inactive.](assets/process-instance-migration/migration-active_before.png)

Due to changed requirements, our process model no longer contains the exclusive gateway, nor the service tasks `A` and `B`.
Instead, it only contains a new service task `C`.

![The target process only contains a service task C.](assets/process-instance-migration/migration-active-elements-target.png)

We can migrate the active service task `A` to this new service task `C` by providing a mapping instruction from source element ID `A` to target element ID `C`.

![After migrating the process instance, it is waiting at service task C.](assets/process-instance-migration/migration-active_after.png)

:::note
You cannot map an element to an element of a different type.
An active service task of a process instance can only be mapped to a service task in the target process.
It cannot be mapped to a user task as this changes the element type.

Also note that the [jobs, expressions, and input mappings](#jobs-expressions-and-input-mappings) are not recreated.
So, while service task `C` is active in the target process, the associated job still has the job type from when it was associated to service task `A`.
:::

:::tip
If you need to adjust the job type to its new element, you can use [process instance modification](./process-instance-modification.md) to recreate the service task.
Simply cancel the service task instance, and add a new instance of the service task.

![The process instance can be modified to recreate the service task's job.](assets/process-instance-migration/migration-active_after-modification.png)
:::

## Correcting mistakes in a process instance

Process instance migration can also be used to correct mistakes that led to an [incident](/components/concepts/incidents.md) in a process instance.

Let's consider an example.

A user deployed a process with a user task `A`. The instance of that process always receives two variables (one boolean and one string).
By accident, the string is used in the condition. To fix the problem, the process model should be updated to use the boolean variable instead.
A process instance gets stuck at this user task, and an incident is created to inform the user of this problem.

![After creating the process instance, an incident is created for the service task A.](assets/process-instance-migration/migration-process_instance_with_incident.png)

To correct the problem in the process instance, the user can take the following steps:

1. Correct the mistake in Modeler by creating a new version of the process definition.
2. Deploy the new process version where the boolean variable is used in the condition.
3. Migrate the process instance to the new process version.
4. Resolve the incident.

Afterward, the process instance will continue as expected:

![After migrating the process instance, the input mapping is corrected and the incident is resolved by retry. Afterward, the process instance will continue as expected:](assets/process-instance-migration/migration-process_instance_with_incident_resolved.png)

## Migrating active elements inside embedded subprocesses

Active elements located inside subprocesses can be migrated as part of a process instance migration.

Let's consider an example where we want to migrate an active element that is located in a subprocess.

![The service task A is inside the subprocess A.](assets/process-instance-migration/migration-subprocess_before.png)

After migrating active element `A` to `B` and `Subprocess A` to `Subprocess B`, the process instance will look like this:

![After migrating the process instance, it is waiting at service task B inside the Subprocess B.](assets/process-instance-migration/migration-subprocess_after.png)

:::note
A mapping instruction must be provided from the process instance's subprocess ID to the target subprocess ID to migrate subprocesses.
:::

:::note
You cannot migrate an active embedded subprocess to an event subprocess.
Additionally, changing the scope of a subprocesses during migration is not possible.
:::

## Process definitions and versions

So far, we've only discussed migrating a process instance to a new version of its process definition.

You are free to migrate your process instance:

- From an older version to a newer version of the same process definition.
- From a newer version to an older version of the same process definition.
- To a different process definition altogether.

:::note
You do not have to provide a mapping instruction from the process instance's process ID to the target process ID.
:::

## Jobs, expressions, and input mappings

We do not recreate jobs, reevaluate expressions, and reapply input mappings of the active elements.
We also don't adjust any static values if they differ between the two process definitions.
Any existing variables, user tasks, and jobs continue to exist with the same values as previously assigned.

Let's consider an active service task that created a job when it was activated with type `send_mail`.
In the target process definition, the job type expression is changed as follows:

```feel
= order.next_step
```

However, on migrating the process instance this new job type expression is not evaluated.
Instead, the job keeps all properties it had before the migration, including the job type.

:::tip
You can use [process instance modification](./process-instance-modification.md) to terminate and activate the service task if you want to create the job according to the new service task's definitions.
This results in new keys for the service task as well as the job.
:::

## Dealing with attached boundary events

You can migrate active elements with boundary events attached.
You decide what happens to the associated event subscription through the mapping instructions for the boundary events:

- If a boundary event is mapped, the associated subscription is migrated. Please note, this case is not yet supported.
- If a boundary event in the source process is not mapped, then the associated subscription is closed during migration.
- If a boundary event of the target process is not the target of a mapping instruction, then a new subscription is opened during migration.

Let's consider a process instance awaiting at a service task `A`.

![The process instance is waiting at the active service task A without any boundary events attached.](assets/process-instance-migration/migration-boundary-event_before.png)

You can migrate it to a process definition where a message boundary event `M` is attached to the service task `A`.
To do so, you only have to map element `A` to element `A` in the target process.
After migrating active element `A`, the process instance is newly subscribed to the message boundary event `M`.

![After migrating, the process instance is subscribed to the newly introduced message boundary event.](assets/process-instance-migration/migration-boundary-event_after.png)

Likewise, you can migrate the process instance back to the previous process definition where no boundary event is attached to the service task `A`.
To do so, you only have to map element `A` to element `A` again.
After migrating active element `A`, the process instance is no longer subscribed to the message boundary event `M`.

![After migrating back, the process instance is no longer subscribed to the message boundary event](assets/process-instance-migration/migration-boundary-event_before.png)

:::note
At this time, you cannot provide mapping instructions for boundary events yet.
Additionally, only message boundary events are supported in process instance migrations.
Other types of boundary events will be supported in future versions.
:::

:::tip
Currently, you cannot migrate an active element with a message boundary event attached to an element that also has a message boundary event attached with the same message name.
While we're working on resolving this, a workaround is available by splitting the migration into two steps:

First migrate the process instance to a process model where the element is without a message boundary event.
Once the process instance is successfully migrated, you can migrate the process instance to a process model where the message boundary event is attached to the element again.
:::

## Limitations

Not all process instances can be migrated to another process definition.
In the following cases, the process instance can't apply the migration plan and rejects the migration command.

- Process instance migration can only migrate active process instances, i.e. existing process instances that have not yet been completed, terminated, or banned.
- All active elements require a mapping.
- The number of active elements cannot be changed. You can use [process instance modification](./process-instance-modification.md) to achieve this instead.
- The target process definition must exist in Zeebe, i.e. it must be deployed and not yet deleted.
- The migration plan can only map each `sourceElementId` once.
- A mapping instruction's `sourceElementId` must refer to an element existing in the process instance's process definition.
- A mapping instruction's `targetElementId` must refer to an element existing in the target process definition.

The following limitations exist that may be supported in future versions:

- Only elements of the following types can be migrated:
  - A process instance
  - A service task
  - A user task
  - An embedded subprocess
- Elements with a boundary event in the source and/or target process definition can only be be migrated for boundary events of type:
  - Message
- The following scenarios cannot be migrated:
  - A process instance that is started from a call activity, i.e. a child process instance
  - A process instance that contains an event subprocess
  - A target process definition that contains an event subprocess
  - An element that becomes nested in a newly added subprocess
  - An element that was nested in a subprocess is no longer nested in that subprocess
- Mapping instructions cannot change the element type
- Mapping instructions cannot change the task implementation, e.g. from a job worker user task to a Zeebe user task
- Mapping instructions cannot map boundary events
- The process instance must be in a wait state, i.e. waiting for an event or external input like job completion. It may not be taking a sequence flow or triggering an event while migrating the instance

A full overview of error codes can be found in the [migration command](/apis-tools/zeebe-api/gateway-service.md#migrateprocessinstance-rpc).

:::tip
If your specific case is not (yet) supported by process instance migration, you can use [cancel process instance](../../apis-tools/zeebe-api/gateway-service.md#cancelprocessinstance-rpc) and [create and start at a user-defined element](./process-instance-creation.md#create-and-start-at-a-user-defined-element) to recreate your process instance in the other process definition.
Note that this results in new keys for the process instance and its associated variables, element instances, and other entities.
:::

## Use at your own risk

Process instance migration is a powerful tool to change your process instances. However, use it with care.
You can migrate the process instance to create situations that are not reachable by the regular execution.
Consider the following example:

![The process instance waits on a task after a parallel joining gateway.](assets/process-instance-migration/migration-use-at-your-own-risk.png)

The process instance completed the first tasks `A` and `B` and waits on task `C`.

We could apply the following migrations, but the process instance may end up in an unintended situation:

- If we map task `C` to `A` or `B`, the process instance is stuck on the parallel gateway.
- If we map task `C` to `D`, the variables that would be provided by the message are not set, the task `D` could be processed with the wrong input.

The process instance doesn't detect these situations. It is up to you to apply suitable migrations.

When in doubt, we recommend testing your migration on a non-production cluster, or using [zeebe process test](../../apis-tools/java-client/zeebe-process-test.md).

:::tip
Often it's safer to migrate in multiple smaller steps rather than in one big migration.
For example, you can start by migrating the process instance introducing changes to the inactive parts only to keep the current situation unchanged.

In some cases it's useful to prepare the process instance before migrating.
If your process needs specific variables immediately after migrating, you can set these before migrating the process instance.
Both global and local variables are migrated automatically.
Before migrating, you can also use process instance modification [activating an element](./process-instance-modification.md#activate-an-element)
to avoid the process instance getting stuck on a parallel gateway, or [terminate an element instance](./process-instance-modification.md#terminate-an-element-instance) to get rid of a parallel flow.
:::
