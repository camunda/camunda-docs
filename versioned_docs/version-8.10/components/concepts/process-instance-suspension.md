---
id: process-instance-suspension
title: "Process instance suspension"
description: "Temporarily pause a running process instance and resume it later without losing state."
---

Process instance suspension lets you temporarily freeze a running process instance without canceling it. The instance retains all its state during suspension, and execution continues from the same point when you resume it.

Suspension is not a substitute for cancellation or deletion. The instance continues to occupy cluster resources during suspension, including storage for any commands that accumulate while suspended.

Common use cases include:

- Pausing execution while an upstream or downstream system is unavailable or misconfigured.
- Preventing new jobs from being handed out to workers during a planned maintenance window.
- Temporarily halting a batch of instances while an investigation is in progress.

## Suspend and resume a process instance

Use the REST API to suspend or resume a single process instance:

- [Suspend a process instance](/apis-tools/orchestration-cluster-api-rest/specifications/suspend-process-instance.api.mdx)
- [Resume a process instance](/apis-tools/orchestration-cluster-api-rest/specifications/resume-process-instance.api.mdx)

You can also suspend or resume multiple instances at once using batch operations:

- [Suspend process instances (batch)](/apis-tools/orchestration-cluster-api-rest/specifications/suspend-process-instances-batch-operation.api.mdx)
- [Resume process instances (batch)](/apis-tools/orchestration-cluster-api-rest/specifications/resume-process-instances-batch-operation.api.mdx)

:::note
You can also suspend and resume process instances in Operate. See the [Operate user guide](../operate/userguide/suspend-resume-process-instance.md).
:::

A suspended process instance appears in search results with a `SUSPENDED` state. Filtering for `ACTIVE` instances does not include suspended instances.

## Behavior during suspension

The following describes what happens to each element type when a process instance is suspended.

### Jobs

Job handout is suppressed during suspension: workers can't pick up new jobs from a suspended process instance.

Jobs already running in a worker before suspension are not interrupted. They keep executing, but any attempt to complete or fail the job during suspension is rejected. If the instance resumes before the worker finishes, the job can complete normally. If the worker completes or fails the job while the instance is still suspended, the job is re-activated on resume and executed again. Because of this at-least-once behavior, outbound actions performed by the job (for example, an API call or a message) may run more than once if they are not idempotent.

### Timers

Timers don't trigger during suspension. When the instance resumes, any due timers fire immediately as a catch-up. For non-interrupting cycle timers, only one firing occurs on resume, even if the timer became due multiple times during suspension.

### Messages

Message correlation doesn't happen during suspension. Messages without a TTL that arrive while the instance is suspended are discarded for that instance. Messages with a TTL may still correlate after resume, provided the TTL has not expired at the time the instance resumes.

### Signals

Signals received while a process instance is suspended are discarded and never replayed. Unlike timers, there is no catch-up for signals on resume.

### Multi-instance

If an active multi-instance body is suspended, child elements are spawned on resume according to the input collection at the time of suspension. Changes to the input collection during suspension (whether items are added or removed) are not taken into account once the multi-instance body has been created.

### Call activities

Suspending a root process instance does not automatically suspend its call-activity children. Each child instance continues executing independently.

If an active call activity has an interrupting boundary event and the child fires a matching event (for example, an error or escalation) while the parent is suspended, the call activity element of the suspended process instance transitions to terminated, while the boundary event becomes active. Completion of the boundary event is deferred until resume, but this means a suspended instance's state can change for this specific edge case.

## Allowed actions on suspended instances

External commands against a suspended process instance are blocked, with the following exceptions:

### Variable updates

You can update variables on a suspended process instance, including element-instance variables. The exception is user task variables, for which any operations are blocked during suspension.

Variable changes take effect immediately. If a command recorded before suspension depends on a variable you modified or deleted during suspension, that command may fail on resume and create an incident.

:::note
Variable updates can be overwritten on resume if a buffered completion command carries an older value of the same variable. This happens when the completion was the next processing step at the time suspension was applied, so its command (including the pre-suspension variable value) was already buffered.
:::

### Cancellation

You can cancel a suspended process instance.

### Resumption

You can resume a suspended process instance.

## Impact on Connectors

**Inbound connectors** publish messages to correlate with waiting process instances. Because message correlation is suppressed during suspension, data from an inbound connector that arrives while the instance is suspended is permanently lost for that instance.

**Outbound connectors** run as service task jobs. Job handout is suppressed during suspension, so new outbound connector jobs aren't activated. A connector job already running in a worker when suspension occurs is not interrupted, but any completion or failure during suspension is rejected and the job re-executes on resume. If the connector action is not idempotent (for example, sending a message or charging a card), it may run more than once.

## In-flight batch operations

Batch operations already queued against process instances that are subsequently suspended may fail on individual items if the instance state is incompatible with the queued operation. An individual item failure does not stop the rest of the batch.

## Technical implications

This section explains how suspension is handled internally to help you understand processing impact, resume timing, and consistency behavior.

### Suspension and resumption in the engine

At the engine level, suspension for a process instance means that:

- Jobs waiting for execution are removed from the execution pool and re-added on resumption.
- Completion and failure of already-active jobs are rejected during suspension.
- Execution progress is stopped via command buffering: after suspension, the next command that would advance execution is buffered instead of processed. On resume, the engine drains the buffer in order, which restarts normal execution.

Additionally:

- On suspend, all active message subscriptions for the process instance are removed and re-added on resume.
- Timer triggers are buffered during suspension and not rescheduled for recurring timers until they trigger on resumption. Timer expirations during suspension therefore increase the command buffer.

### Implications

- **Broker PVC usage**: Buffered commands are stored on the broker's persistent volume (PVC). A process instance with many active tokens or long-lived subscriptions generates more buffered commands during suspension. Monitor PVC utilization when suspending large numbers of instances or instances with complex execution states.
- **Suspension processing load**: Suspending process instances with a large number of active jobs or message subscriptions increases cluster load during the suspension window.
- **Resumption processing load**: Resuming a process instance is roughly equivalent to simultaneously creating all active element instances that were suspended. Resuming a large number of instances, or an instance with many active tokens, can noticeably reduce processing throughput.
- **Stale data in buffered commands**: Buffered commands are recorded at the time of suspension and may rely on data that changes while the instance is suspended. Because some actions are permitted during suspension (such as variable updates), a buffered command may operate on stale values when it drains on resume, potentially producing unexpected behavior or incidents.

### Resume failures

In rare cases, a buffered command can't be drained, for example, if a preceding permitted change left the instance in an inconsistent state for that command. This typically surfaces as an incident on resume. In very rare cases, a drain failure may not surface as an incident if the failure is unrelated to process-instance-specific command processing. In that case, the process instance continues to show as `SUSPENDED` but can't complete draining. Check error logs for details and contact support if necessary.

## Limitations

The following known limitations apply to process instance suspension.

### Instance size limit

Under the default 4 MB `maxMessageSize` [configuration](./secret-resolution-and-job-activation.md#resolved-values-exceed-the-message-size), suspension may fail if a single process instance has:

- More than 4,000 active jobs
- More than 7,000 active message subscriptions
- A mix of active jobs and subscriptions that together exceed the limit

### Suspension vs. banning

Suspension is processed through the normal engine command pipeline, which means it isn't applied instantaneously. The suspend command is queued and processed in order behind other pending commands. If the engine is under high backpressure (for example, because a process instance is executing a tight loop or processing a very large input collection), the suspend command may be delayed significantly or rejected entirely.

As a result, suspension isn't a reliable mechanism for immediately stopping a process instance that is causing high cluster load. In situations where a runaway instance must be halted urgently, cancellation is more appropriate and should be preferred over suspension. For context on how the engine handles runaway instances internally, see [banned process instances](../zeebe/technical-concepts/internal-processing.md#banned-process-instance).
