---
id: process-instance-migration
title: "Process instance migration"
description: "Use process instance migration to change the process definition of a running process instance."
---

Process instance migration fits a running process instance to a different process definition.
This can be useful when the process definition needs changes due to bugs or updated requirements.

:::tip
If you want to repair a broken process instance without making changes to the process definition, you can use [process instance modification](./process-instance-modification.md) instead.
:::

## Event subscriptions

When migrating, the process instance's event subscriptions are recreated, i.e. the process instance unsubscribes from errors, escalations, messages, signals, and timers in its current process definition, and subscribes to the events in the target process defitinition.
We subscribe to the events in the target process by evaluating the related expressions again.

:::note
This means that, once migrated, new timers, message subscriptions, and signal subscriptions are created with new keys and potentially different values.
:::

Let's consider an active service task and a signal event sub process.
The [signal](../modeler/bpmn/signal-events/#signals) name is defined as a static value (`order placed`).

![The process instance is subscribed to the signal event sub process.](assets/process-instance-migration/migration-with-recreated-signal-event-subprocess_before.png)

In the target process, we add a user task after the service task.
We leave the signal event sub process unchanged.
On migrating the process instance, we unsubscribe it from the `order_placed` signal and subscribe to the signal again in the target process.
Once migrated, a broadcasted `order_placed` signal will trigger the event sub process just like before.

![The process instance is subscribed to the same signal event sub process again.](assets/process-instance-migration/migration-with-recreated-signal-event-subprocess_after.png)

:::warning
Recreation of the event subscription can produce unwanted results when re-evaluating the related expressions.
:::

Consider an active service task with a timer boundary event.
The timer is defined as a static duration of 3 hours (`PT3H`).
Just before we migrate the process instance, there are only 30 minutes left until the timer triggers.
But, this timer is canceled and a new timer is created with a duration of 3 hours when migrating the process instance.
Once migrated, the timer will not trigger in 3 hours instead of 30 minutes.

<!-- TODO: we could mention that we plan to support timer migration in a future version -->

## Jobs, expressions and input mappings

While event subscriptions are recreated for migrated elements, we do not recreate jobs, reavaluate expressions and reapply input mappings of the active elements.
Any existing variables and jobs continue to exist with the same values as previously assigned.

Let's consider an active service task that created a job when it activated with type `send_mail`.
In the target process definition, the job type expression is changed as follows:

```feel
= order.next_step
```

However, on migrating the process instance this new job type expression is not evaluated.
Instead, the job keeps all properties it had before the migration, including the job type.

:::tip
You can use [process instance modification](./process-instance-modification.md) to terminate and activate the service task, if you want to create the job according to the new service task's definitions.
Note that this results in new keys for the service task as well as the job.
:::

## Limitations

Not all process instances can be migrated to another process definition.
In the following cases, the process instance can't apply the migration plan and rejects the migration command.

- Process instance migration can only migrate active process instances, i.e. existing process instances that have not yet been completed, terminated, or banned
- All active elements require a mapping
- The number of active elements cannot be changed. You can use [process instance modification](./process-instance-modification.md) to achieve this instead
- The target process definition must exist in Zeebe, i.e. it must be deployed and not yet deleted
- The migration plan can only map each `sourceElementId` once
- A mapping instruction's `sourceElementId` must refer to an element existing in the process instance's process definition
- A mapping instruction's `targetElementId` must refer to an element existing in the target process definition

In addition, the following limitations exist that may be supported in future versions:

- At this time only elements of the following types can be migrated:
  - A process instance
  - A service task
- At this time, the following scenarios cannot be migrated:
  - A process instance with an incident
  - A process instance that is started from a call activity, i.e. a child process instance
  - An element that becomes nested in a newly added subprocess
  - An element that was nested in a subprocess is no longer nested in that sub process
- Mapping instructions cannot change the element type

:::tip
If your specific case is not (yet) supported by process instance migration, you can use [cancel process instance](https://docs.camunda.io/docs/next/apis-tools/grpc/#cancelprocessinstance-rpc) and [create and start at a user-defined element](https://docs.camunda.io/docs/next/components/concepts/process-instance-creation/#create-and-start-at-a-user-defined-element) to recreate your process instance in the other process definition.
Note that this results in new keys for the process instance and its associated variables, element instances, and other entities.
:::
