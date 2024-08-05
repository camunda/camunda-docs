---
id: execution-listeners
title: "Execution listeners"
description: "An execution listener allows users to react to various events in the workflow execution lifecycle by executing custom logic."
---

An execution listener (EL) allows users to react to various events in the workflow execution lifecycle by executing custom logic. This feature provides flexibility and control over the process execution, enabling complex data handling and
external system interactions without cluttering the BPMN model with technical details.

**Use cases:**

- Pre- and post-processing actions for activities
- External calculations of variables for element expressions
- Decoupled processes and data synchronization

## Define a listener

You configure execution listeners in the process per BPMN element. There are two types of listeners:

- Start: Invoked before the element is processed. Useful for setting variables or executing preconditions.
- End: Invoked after the element is processed. Useful for executing cleanup or post-processing tasks.

Each listener has three properties:

- `eventType` - Specifies when the listener is triggered (start or end).
- `type` - The name of the job type.
- `retries` - The number of job retries.

## Implement a listener

Execution listeners are a special kind of [job worker](/components/concepts/job-workers.md). They are based on the same concept of jobs and use the same protocol. You can implement a listener in the same way as a regular job worker. See the
[job workers documentation](/components/concepts/job-workers.md) for details.

:::note
Throwing a BPMN error for an execution listener's job is not supported.
:::

## Handle variables in a listener

Similar to regular job workers, a listener can read variables of the process instance and set new variables by
completing the job with variables. The available variables and the effect of the job variables depend on the listener's
event type.

### For start listeners

The start listeners are invoked after applying the variable input mappings and before subscribing to events, evaluating the element's expressions, and executing the element's behavior.

A start listener can read the process instance variables and local variables that are created by the variable input
mappings.

If a start listener completes the job with variables, the variables are set as
[local variables](/concepts/variables/#local-variables) of the element. Following listeners can read the variables.

You can use variables for the following cases:

**Gateways**

- [Inclusive](/components/modeler/bpmn/inclusive-gateways/inclusive-gateways.md), [exclusive](/components/modeler/bpmn/exclusive-gateways/exclusive-gateways.md), [event-based gateways](/components/modeler/bpmn/event-based-gateways/event-based-gateways.md):
  Use ELs to calculate and set variables that determine the outgoing path from these gateways. The custom logic executed by ELs can evaluate current data and set the necessary variables to guide the process flow correctly.

**Intermediate catch events**

- [Message events](/components/modeler/bpmn/message-events/message-events.md#intermediate-message-catch-events):
  Variables set by ELs can be used to define the message correlation key, ensuring the correct message is matched with the event.
- [Timer events](/components/modeler/bpmn/timer-events/timer-events.md#intermediate-timer-catch-events): ELs can define
  timer expressions based on the calculated variables, enabling dynamic timer configurations.
- [Signal events](/components/modeler/bpmn/signal-events/signal-events.md#signal-intermediate-catch-events): Variables can determine the signal name, allowing for flexible signal handling based on the current process state.

### For end listeners

The end listeners are invoked after applying the variable output mappings and before leaving the element.

An end listener can read the process instance variables, the local variables of the element, and the resulting
variables of the output mappings.

If an end listener completes the job with variables, the variables are propagated to the element's parent scope, like
variables from the output mappings. Following listeners can read the variables.

## Limitations

- **Unsupported elements**: The following elements do not support `start` or `end` listeners due to their processing nature:

  - Start events (start ELs): Use `start` listeners of process instances or subprocesses to cover the missing `start` listeners for specific start events.
  - Boundary events (start ELs): Place the start logic in the `start` ELs of the main activity to which the boundary event is attached.
  - Gateways (end ELs): Use `start` ELs on the element following the gateway to execute the required logic. This allows handling of any post-execution tasks in a dedicated element.
  - Error end event (end ELs): Place the ELs on the related error catch event.
  - Compensation boundary events: Place the ELs on the compensation handler.

- **Duplicate listeners**: Execution listeners must have unique combinations of `eventType` and `type`.
  If multiple listeners with the same `eventType` and `type` are defined, it will result in a validation error. However, it's possible to have listeners of the same `type` if they are associated with different `eventType` values.

- **Interrupting escalation events**: For intermediate throw and end events with an interrupting escalation event, `end` listeners will not be executed. The escalation event terminates the element's processing immediately upon activation, bypassing any defined `end` listeners.

## Learn more

- [Variables](/components/concepts/variables.md)
- [Expressions](/components/concepts/expressions.md)
- [Job workers (basics)](/components/concepts/job-workers.md)
- [Job workers (Java client)](/apis-tools/java-client/job-worker.md)
