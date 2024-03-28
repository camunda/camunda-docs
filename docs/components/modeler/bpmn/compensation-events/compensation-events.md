---
id: compensation-events
title: "Compensation events"
description: "Compensation events are used to undo tasks that have already been executed."
---

Compensation events assist with undoing steps that were already successfully completed in the case that their results are no longer desired and need to be reversed.

![Process with compensation throw event](assets/compensation-throw-event.gif)

The example above shows the execution of a compensation event:

1. After the service task `A` is completed, the process reaches the compensation intermediate throw event.
2. This invokes the compensation handler `undo A` attached to the compensation boundary event.
3. Once the compensation handler `undo A` is completed, the process completes the compensation intermediate throw event and takes the outgoing sequence flow.

:::info
**Compensation activity:** An activity with a compensation boundary event attached. This can be compensated only if completed first.  
**Compensation handler:** An activity with a compensation marker, and the activity in charge of reverting the effects of the compensation activity attached. For more information, visit the [compensation handler documentation](../compensation-handler/compensation-handler.md).
:::

## Triggering compensation

By default, a compensation intermediate throw or end event triggers the compensation within its scope. If the compensation throw event is on the process level, it invokes all at once all the compensation handlers of the process without any specific order. The compensation throw event remains active until all the compensation handlers are completed.

Compensation handlers are triggered for [subprocesses](#embedded-subprocess) but not for child processes.

## Triggering compensation for an activity

Besides the broadcasting of the compensation event, a compensation throw event can trigger the compensation for a specific activity. Triggering the compensation for a specific activity can be used to enforce that compensation handlers are invoked synchronously in a given order.

![Trigger compensation for a give activity](assets/compensation-activity-ref.png)

On a compensation intermediate throw or end event, it is possible to specify the activity to compensate by using the property `activityRef`. The referenced activity must have a compensation boundary event and must be in the same scope of the compensation throw event.

### Multi-instance activity

If an activity is a multi-instance activity or multi-instance subprocess, the compensation handler is invoked once. The compensation handler is responsible for compensating the effect of all instances of the multi-instance activity.

The compensation handler is invoked if all instances of the multi-instance activity are completed.

![Process with multi instance activity](assets/compensation-multi-instance-activity.gif)

## Triggering compensation from an event subprocess

An interrupting or non-interrupting event subprocess can contain compensation intermediate throw events or a compensation end event. These compensation events can specify an activity or broadcast the compensation in the parent scope of the event subprocess. If the compensation throw event specifies an activity and the activity is completed, it invokes only the compensation handler of this activity.

![Trigger compensation from an event subprocess](assets/compensation-event-subprocess.png)

A common pattern is to use this in combination with an error event subprocess to undo activities if a failure occurs that can't be recovered from.

### Embedded subprocess

When a process instance enters a compensation intermediate throw or end event, it triggers the compensation of the current scope and invokes the compensation handlers of completed activities.

After completing its current scope, it initiates compensation for child scopes in a recursive manner. This action involves invoking compensation handlers within finished [embedded subprocesses](/docs/components/modeler/bpmn/embedded-subprocesses/embedded-subprocesses.md). However, if a subprocess remains active or terminated, its compensation handlers aren't triggered.

![Process with embedded subprocesses](assets/compensation-embedded-subprocess.gif)

:::info
If the subprocess is interrupted, all the compensation handlers within the subprocess can't be invoked anymore. This can be relevant to long-living processes.
:::

## Additional resources

### XML representation

An intermediate compensation throw event with referenced activity:

```xml
<intermediateThrowEvent id="CompensationThrowEvent">
    <incoming>Flow_0b2blc2</incoming>
    <outgoing>Flow_1goayj7</outgoing>
    <compensateEventDefinition id="CompensateEventDefinition_1afu1vn" activityRef="Task_A" />
</intermediateThrowEvent>
```
