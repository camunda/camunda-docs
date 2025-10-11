---
id: event-based-gateways
title: "Event-based gateway"
description: "An event-based gateway allows you to make a decision based on events."
---

An event-based gateway allows you to make a decision based on events.

![process](assets/event-based-gateway.png)

An event-based gateway must have at least **two** outgoing sequence flows. Each sequence flow must be connected to
an intermediate catch event of type [timer](../timer-events/timer-events.md),
[message](../message-events/message-events.md) or [signal](../signal-events/signal-events.md).

When an event-based gateway is entered, the process instance waits at the gateway until one of the events is triggered. When the first event is triggered, the outgoing sequence flow of this event is taken. No other events of the gateway can be triggered afterward.

## Additional resources

### XML representation

An event-based gateway with two outgoing sequence flows:

```xml
<bpmn:eventBasedGateway id="gateway" />

<bpmn:sequenceFlow id="s1" sourceRef="gateway" targetRef="payment-details-updated" />

<bpmn:intermediateCatchEvent id="payment-details-updated"
  name="Payment Details Updated">
  <bpmn:messageEventDefinition messageRef="message-payment-details-updated" />
</bpmn:intermediateCatchEvent>

<bpmn:sequenceFlow id="s2" sourceRef="gateway" targetRef="wait-one-hour" />

<bpmn:intermediateCatchEvent id="wait-one-hour" name="1 hour">
  <bpmn:timerEventDefinition>
    <bpmn:timeDuration>PT1H</bpmn:timeDuration>
  </bpmn:timerEventDefinition>
</bpmn:intermediateCatchEvent>

<bpmn:intermediateCatchEvent id="payment-canceled" name="Payment canceled">
  <bpmn:signalEventDefinition signalRef="signal-payment-canceled" />
</bpmn:intermediateCatchEvent>
```

### References

- [Timer events](../timer-events/timer-events.md)
- [Message events](../message-events/message-events.md)
