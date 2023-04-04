---
id: signals
title: "Signals"
description: "Broadcast signals to trigger signal events"
---

Signals can be broadcasted within Zeebe. These broadcasts are caught by [signal catch events](../modeler/bpmn/signal-events/signal-events.md).
Once a signal is caught the process instance will respond accordingly.

## Signal subscriptions

Signals work using subscriptions. When a process encounters a signal catch event it will create a new signal subscription.
Ths process instance will wait until a signal with a matching name is broadcasted in Zeebe. You can define the signal name
in the process definition.

## Signal Cardinality

A broadcasted signal will iterate over _all_ available subscriptions. As a result a single broadcast triggers _all_ the
signal catch events that match the signal name.
