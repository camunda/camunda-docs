---
id: execution-listeners
title: "Execution listeners"
description: "An execution listener allows users to react to various events in the workflow execution lifecycle by executing custom logic."
---

An execution listener (EL) allows users to react to various events in the workflow execution lifecycle by executing custom logic.

## About execution listeners

You can use execution listeners to provide flexibility and control over process execution, and handle complex data and external system interactions without cluttering the BPMN model with technical details.

### Use cases

Execution listeners are useful in the following typical cases:

- Pre- and post-processing actions for activities
- External calculations of variables for element expressions
- Decoupled processes and data synchronization

### Blocking behavior

An execution listener is a blocking operation, meaning that the workflow execution lifecycle only continues once the listener is completed. This ensures that all necessary pre- and post-processing actions defined by the listener are fully executed before the workflow proceeds to the next element.

## Define an execution listener

You can configure execution listeners for individual BPMN elements, such as tasks, events, and gateways, as well as for the overall process and subprocesses.

There are two types of execution listener:

- **Start:** Invoked _before_ the element is processed. Useful for setting variables or executing preconditions.
- **End:** Invoked _after_ the element is processed. Useful for executing cleanup or post-processing tasks.

Each listener has three properties:

| Property    | Description                                                  |
| :---------- | :----------------------------------------------------------- |
| `eventType` | Specifies when the listener is triggered (`start` or `end`). |
| `type`      | The name of the job type.                                    |
| `retries`   | The number of job retries.                                   |

:::note
If multiple listeners of the same `eventType` (such as multiple start listeners) are defined on the same activity, they are executed sequentially, one after the other, in the order defined in the BPMN model.
:::

## Implement an execution listener

Execution listeners are processed by [job workers](/components/concepts/job-workers.md).

- Listeners are based on the same concept of jobs and use the same protocol.
- You can implement a handler for an execution listener just as you would for a regular job.

See [open a job worker](/apis-tools/java-client-examples/job-worker-open.md) for an example of how to create a job worker and handler that can also process execution listener jobs.

:::note
[Throwing a BPMN error](/components/best-practices/development/dealing-with-problems-and-exceptions.md#throwing-and-handling-bpmn-errors) for an execution listener's job is not supported.
:::

## Variables in an execution listener

Similar to regular job workers, a listener can read variables of the process instance and set new variables by completing the job with variables. The scope of variables and the effect of the job variables depend on the listener event type.

### Start listeners

Start listeners are invoked after applying the variable input mappings, and before subscribing to events, evaluating the element's expressions, and executing the element's behavior.

- A start listener can read the process instance variables and local variables created by the variable input
  mappings.
- If a start listener completes the job with variables, those variables are set as
  [local variables](/components/concepts/variables.md#local-variables) for the element. Subsequent listeners can access these variables.

You can use variables for the following use cases:

| Use case                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gateways                  | <p> [Inclusive](/components/modeler/bpmn/inclusive-gateways/inclusive-gateways.md), [exclusive](/components/modeler/bpmn/exclusive-gateways/exclusive-gateways.md), [event-based gateways](/components/modeler/bpmn/event-based-gateways/event-based-gateways.md): Use ELs to calculate and set variables that determine the outgoing path from these gateways. The custom logic executed by ELs can evaluate current data and set the necessary variables to guide the process flow correctly.</p>                                                                                                                                                                                                                                                          |
| Intermediate catch events | <p><ul><li><p>[Message events](/components/modeler/bpmn/message-events/message-events.md#intermediate-message-catch-events): Variables set by ELs can be used to define the message correlation key, ensuring the correct message is matched with the event.</p></li><li><p>[Timer events](/components/modeler/bpmn/timer-events/timer-events.md#intermediate-timer-catch-events): ELs can define timer expressions based on the calculated variables, enabling dynamic timer configurations.</p></li><li><p>[Signal events](/components/modeler/bpmn/signal-events/signal-events.md#signal-intermediate-catch-events): Variables can determine the signal name, allowing for flexible signal handling based on the current process state.</p></li></ul></p> |

### End listeners

End listeners are invoked after applying the variable output mappings and before leaving the element.

- An end listener can read the process instance variables, the local variables of the element, and the resulting
  variables of the output mappings.
- If an end listener completes the job with variables, those variables are propagated to the element's parent scope, like
  variables from the output mappings. Subsequent listeners can access these variables.

## Incident recovery

During execution listener processing, issues can arise that lead to [incidents](/components/concepts/incidents.md). For example, these incidents can occur due to job execution failures or problems during expression evaluation.

### Job execution failure

If an execution listener job fails (for example, if an external service is unavailable), it is retried according to the `retries` property.

If all retries are exhausted and the job still fails, the process halts, and an incident is raised. Once the incident is resolved, only the listener with the failed job is retried, allowing the process to resume from the point of failure without re-executing successfully completed listeners.

### Expression evaluation failure

Incidents can also occur during the evaluation of an execution listener's properties (for example, due to incorrect variable mapping or expression syntax).

If this happens, all listeners of the same event type (`start` or `end`) that were processed before the failure are re-executed once the issue is resolved, even if they had previously completed successfully.

## Limitations

Execution listeners have the following limitations:

- **Unsupported elements**: The following elements do not support `start` or `end` listeners due to their processing nature:

  - Start events (start ELs): Use `start` listeners of process instances or subprocesses to cover the missing `start` listeners for specific start events.
  - Boundary events (start ELs): Place the start logic in the `start` ELs of the main activity to which the boundary event is attached.
  - Gateways (end ELs): Use `start` ELs on the element following the gateway to execute the required logic. This allows handling of any post-execution tasks in a dedicated element.
  - Error end event (end ELs): Place the ELs on the related error catch event.
  - Compensation boundary events: Place the ELs on the compensation handler.

- **Duplicate listeners**: Execution listeners must have unique combinations of `eventType` and `type`.
  Defining multiple listeners with the same `eventType` and `type` results in a validation error. However, you can define listeners with the same `type` if they are associated with different `eventType` values.

- **Interrupting escalation events**: For intermediate throw and end events with an interrupting escalation event, `end` listeners are not executed. The escalation event terminates the element's processing immediately upon activation, bypassing any defined `end` listeners.

- **Throwing a BPMN error**: This operation is not supported for execution listener jobs.

## Related resources

- [Variables](/components/concepts/variables.md)
- [Expressions](/components/concepts/expressions.md)
- [Incidents](/components/concepts/incidents.md)
- [Job workers (basics)](/components/concepts/job-workers.md)
- [Job workers (Java client)](/apis-tools/java-client/job-worker.md)
