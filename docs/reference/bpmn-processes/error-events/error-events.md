---
id: error-events
title: "Error events"
---

In process automation, you may have to deal with errors related to the process, also known as business errors.

Some examples of business errors are: an invalid credit card used as default payment method to collect money, or cancelling an order after it was already payed for.
In case of a business error, you may need to take a different path than usual or compensate for the error.

![process](assets/error-events.png)

## Defining the error

In BPMN, business errors are represented as errors and error events.
Errors define the possible errors that can occur.
Error events are elements in the process that refer to the defined errors.
An error can be referenced by one or more error events.

An error must define an `errorCode` (e.g. `Invalid Credit Card`).
The `errorCode` is a `string` that is used to match a thrown error to the error catch events.

## Throwing the error
An error can be thrown from within the process using an error **end event**.

![process](assets/error-throw-events.png)

Alternatively, you can inform Zeebe that a business error has occurred using a **client command**.
This throw error client command can only be used while processing a job.
In addition to throwing the error, this also disables the job and stops it from being activated or completed by other job workers.
See the [gRPC command](/reference/grpc.md#throwerror-rpc) for details.

## Catching the error

A thrown error can be caught by an error catch event.
Specifically, using an error **boundary event** or an error **event subprocess**.

Starting at the scope where the error was thrown, the error code is matched against the attached error boundary events and error event sub processes at that level.
An error is caught by the first event in the scope hierarchy that matches the error code.
At each scope, the error is either caught, or it is propagated to the parent scope.
In case the process instance is created via call activity, the error can also be caught in the calling parent process instance.

Error boundary events and error event subprocesses must be interrupting.
This means the process instance will not continue along the regular path when the error was caught.
Instead, it continues where the error is caught.
If the error is thrown for a job, then the associated task gets terminated first.
To continue the execution, the error boundary event or error event subprocess that caught the error gets activated.

## Unhandled errors

When an error is thrown then it should be caught.
If it is not caught, then an **incident** (i.e. `Unhandled error event`) is raised to indicate the failure.
The incident is attached to the corresponding element where the error was thrown, i.e. the task of the processed job or the error end event.

When you resolve the incident attached to a task, it will ignore the error, re-enable the job and allow it to be activated and completed by a job worker once again.

The incident attached to an error end event cannot be resolved by a user because the failure is in the process itself.
The process cannot be changed to catch the error for this process instance.

## Business error vs. technical error

While processing a job, two different types of errors can occur: a technical error (e.g. database connection interrupted) or a business error (e.g. invalid credit card).

A technical error is usually unexpected and should not be dealt with in the process.
The error may disappear when the job is retried, or an incident is created to indicate that a user interaction is required.

A business error is expected and should be dealt with in the process.
The process may take a different path to compensate the error or undo previous actions.

## Additional resources

 ### XML Representation
A boundary error event:

```xml
<bpmn:error id="invalid-credit-card-error" errorCode="Invalid Credit Card" />

<bpmn:boundaryEvent id="invalid-credit-card" name="Invalid Credit Card" attachedToRef="collect-money">
 <bpmn:errorEventDefinition errorRef="invalid-credit-card-error" />
</bpmn:boundaryEvent>

```

### References

- [Incidents](/product-manuals/concepts/incidents.md)
