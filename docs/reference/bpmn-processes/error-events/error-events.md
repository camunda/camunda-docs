---
id: error-events
title: "Error events"
---

In process automation, you often encounter deviations from the happy path (the happy path is kind of the default scenario with a positive outcome). One option to deal with these deviations is the BPMN error event, which allows a process model react to errors within a task.

The following example shows that if an invalid credit card was used, the process takes a different path than usual and uses the default payment method to collect money.

![process](assets/error-events.png)


## Defining the error

In BPMN, **errors** define the possible errors that can occur. **Error events** are elements in the process that refer to the defined errors. An error can be referenced by one or more error events.

An error must define an `errorCode` (e.g. `InvalidCreditCard`). The `errorCode` is a `string` used to match a thrown error to the error catch events.

## Throwing the error

An error can be thrown from within the process using an error **end event**.

![process](assets/error-throw-events.png)

Alternatively, you can inform Zeebe that a business error has occurred using a **client command**. This throw error client command can only be used while processing a job.

In addition to throwing the error, this also disables the job and stops it from being activated or completed by other job workers. See the [gRPC command](/reference/grpc.md#throwerror-rpc) for details.

## Catching the error

A thrown error can be caught by an error catch event. Specifically, using an error **boundary event** or an error **event subprocess**.

![process](assets/error-catch-events.png)

Starting at the scope where the error was thrown, the error code is matched against the attached error boundary events and error event sub processes at that level. An error is caught by the first event in the scope hierarchy that matches the error code. At each scope, the error is either caught, or propagated to the parent scope.

If the process instance is created via call activity, the error can also be caught in the calling parent process instance.

Error boundary events and error event subprocesses must be interrupting. This means the process instance will not continue along the regular path when the error was caught. Instead, it continues where the error is caught.

If the error is thrown for a job, the associated task is terminated first. To continue the execution, the error boundary event or error event subprocess that caught the error are activated.

## Unhandled errors

When an error is thrown and not being caught, an **incident** (i.e. `Unhandled error event`) is raised to indicate the failure. The incident is attached to the corresponding element where the error was thrown (i.e. the task of the processed job or the error end event).

When you resolve the incident attached to a task, it ignores the error, re-enables the job, and allows it to be activated and completed by a job worker once again.

The incident attached to an error end event cannot be resolved by a user because the failure is in the process itself. The process cannot be changed to catch the error for this process instance.

## Business error vs. technical error

In real life, you’ll also have to deal with technical problems that you don't want to treat by error events. Suppose the credit card service becomes temporarily unavailable. You don't want to model the retrying, as you would have to add that to each and every service task. This will bloat the visual model and confuse business folks. Instead, you either use retrying or fall back to incidents as described above. This is hidden in the visual.

In this context we found that the terms business error and technical error can be confusing, as they emphasize the source of the error too much. This can lead to long discussions about whether a certain problem is technical or not, and if you are allowed to see technical errors in a business process model. Actually, it is much more important to look at how you *react* to certain errors. Even a technical problem can qualify for a business reaction. For example, you could decide that you continue a process in the event that a scoring service is not available, and simply give every customer a good rating instead of blocking progress. The error is clearly technical, but the reaction is a business decision.

In general, we recommend talking about business reactions, which are modeled in your process, and technical reactions, which are handled generically using retries or incidents.

## Additional resources

### XML representation
 
A boundary error event:

```xml
<bpmn:error id="invalid-credit-card-error" errorCode="Invalid Credit Card" />

<bpmn:boundaryEvent id="invalid-credit-card" name="Invalid Credit Card" attachedToRef="collect-money">
 <bpmn:errorEventDefinition errorRef="invalid-credit-card-error" />
</bpmn:boundaryEvent>

```

### References

- [Incidents](/components/concepts/incidents.md)
