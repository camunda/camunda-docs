---
id: signals
title: "Signals"
description: "Learn about broadcasting signals, which can trigger all matching signal events with a single broadcast."
---

Signals are a similar concept to [messages](messages.md). However, messages are correlated to a specific
process instance, whereas signals can trigger _all_ the matching signal events with a single broadcast.
Depending on the type of [signal catch events](../modeler/bpmn/signal-events/signal-events.md), the process instance will
respond accordingly.

## Broadcasting signals

You can broadcast signals in several ways:

- Using a [signal throw event or signal end event](../modeler/bpmn/signal-events/signal-events.md#signal-throw-events)
- Using the [Camunda 8 API Broadcast signal](/apis-tools/camunda-api-rest/specifications/broadcast-signal.api.mdx) endpoint
- Using Zeebe's [`BroadcastSignal` RPC](/apis-tools/zeebe-api/gateway-service.md#broadcastsignal-rpc)

## Signal subscriptions

When you broadcast a signal it triggers _all_ signal subscriptions that match the signal name.

When a process instance encounters a signal catch event it creates a new signal subscription. This process instance waits until a signal with a matching name is broadcasted. You can define the signal name in the
process definition.

Deploying a process with a signal start event also creates a new signal subscription. In this case, the triggered
subscription starts a new process instance.

## Signal cardinality

A broadcasted signal iterates over _all_ available subscriptions. As a result, a single broadcast triggers _all_ the
signal catch events that match the signal name, and _all_ [partitions](../zeebe/technical-concepts/partitions.md).

:::caution
Signals can negatively impact the performance of Camunda 8. Performance is impacted in two ways:

- Signals trigger _all_ available subscriptions that match the signal name, potentially resulting in the continued execution of many processes.
- Signals are broadcasted to _all_ partitions, resulting in lots of network traffic. This scales linearly with the number of partitions.

:::
