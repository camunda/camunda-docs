---
id: signal-events
title: "Signal events"
description: "Signal events are events which reference a signal; they are used to wait until a matching signal is received."
---

Signal events are events which reference a signal. Broadcasting a signal will trigger all signal events that match the
name of the broadcasted signal.

## Signal start events

![Process with a top-level signal start event](assets/signal-start-event.png)

Deploying a process definition with a signal start event creates a signal subscription. Broadcasting a signal
will iterate over the available subscriptions. If the name of the broadcasted signal matches the name of the signal
start event, a new process instance is created.

Signal subscriptions only exists for the latest version of a process definition. Deploying a new version of the same
process (based on the BPMN process id) will delete the old signal subscription. A new subscription is opened for the
new deployed process definition.

## Additional resources

### XML representation

A signal start event with signal definition:

```xml
<bpmn:startEvent id="StartEvent_1">
    <bpmn:signalEventDefinition id="SignalEventDefinition_1fk1v2m" signalRef="Signal_3995tmm" />
</bpmn:startEvent>

<bpmn:signal id="Signal_3995tmm" name="signal" />
```
