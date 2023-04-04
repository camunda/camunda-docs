---
id: signal-events
title: "Signal events"
description: "Signal events are events which reference a signal; they are used to wait until a matching signal is received."
---

Signal events are events which reference a signal. Broadcasting a signal will trigger all signal events that match the
name of the broadcasted signal.

## Signal start events

![Process with a top-level signal start event](assets/signal-start-event.png)

Signal start event can be used to start process instances. Deploying processes with a signal start event enables creating
multiple process instances by performing a single broadcast.

Broadcasting a signal will iterate over the available subscriptions. If the name of the broadcasted signal matches the
name of the signal start event, the process instance is created.

Signal subscriptions only exists for the latest version of a process definition. Deploying a new version of the same
process (based on the BPMN process id) will delete the old signal subscription. A new subscription is opened for the
new deployed process definition.

## Additional resources

### XML representation

A signal start event with signal definition:

```xml
<bpmn:startEvent id="startEventId">
    <bpmn:signalEventDefinition id="signalEventDefinitionId" signalRef="signalId" />
</bpmn:startEvent>

<bpmn:signal id="signalId" name="signal" />
```
