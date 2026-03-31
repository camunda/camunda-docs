---
id: job-workers
title: "Job Workers"
sidebar_label: "Job Workers"
sidebar_position: 13
mdx:
  format: md
---

# Job Workers

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

Job workers subscribe to a specific job type and process jobs as they become available. The worker handles polling, concurrent dispatch, auto-completion, and error handling.

## Basic Worker

<!-- snippet:UsingDirective+BasicWorker+BasicWorkerBody -->

```csharp
using Camunda.Orchestration.Sdk;

// Define input/output DTOs
public record OrderOutput(bool Processed, string InvoiceNumber);

using var client = CamundaClient.Create();

client.CreateJobWorker(
    new JobWorkerConfig
    {
        JobType = "process-order",
        JobTimeoutMs = 30_000,
    },
    async (job, ct) =>
    {
        var input = job.GetVariables<OrderInput>();
        var invoice = await ProcessOrder(input!, ct);

        // Return value auto-completes the job with these output variables
        return new OrderOutput(true, invoice);
    });

// Block until Ctrl+C
using var cts = new CancellationTokenSource();
Console.CancelKeyPress += (_, e) => { e.Cancel = true; cts.Cancel(); };
await client.RunWorkersAsync(ct: cts.Token);
```

## Handler Contract

The handler return value determines the job outcome:

| Handler behavior            | Job outcome                         |
| --------------------------- | ----------------------------------- |
| Return `object`             | Auto-complete with those variables  |
| Return `null`               | Auto-complete with no variables     |
| Throw `BpmnErrorException`  | Trigger a BPMN error boundary event |
| Throw `JobFailureException` | Fail with custom retries / back-off |
| Throw any other exception   | Auto-fail with `retries - 1`        |

<!-- snippet:ErrorHandling+ErrorHandlingFailure -->

```csharp
// BPMN error — caught by error boundary events in the process model
throw new BpmnErrorException("INVALID_ORDER", "Order not found");

// Explicit failure with retry control
throw new JobFailureException("Service unavailable", retries: 2, retryBackOffMs: 5000);
```

## Void Handler (No Output Variables)

For handlers that don't return output variables, use the void overload:

<!-- snippet:VoidHandler+VoidHandlerBody -->

```csharp
public record NotificationInput(string Message);

client.CreateJobWorker(config, async (job, ct) =>
{
    await SendNotification(job.GetVariables<NotificationInput>()!, ct);
    // Auto-completes with no variables
});
```

## Configuration

| Property                  | Default      | Description                                                                                                                                   |
| ------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `JobType`                 | _(required)_ | BPMN task type to subscribe to                                                                                                                |
| `JobTimeoutMs`            | _(required)_ | Job lock duration (ms)                                                                                                                        |
| `MaxConcurrentJobs`       | `10`         | Max in-flight jobs per worker                                                                                                                 |
| `PollIntervalMs`          | `500`        | Delay between polls when idle                                                                                                                 |
| `PollTimeoutMs`           | `null`       | Long-poll timeout (null = broker default)                                                                                                     |
| `FetchVariables`          | `null`       | Variable names to fetch (null = all)                                                                                                          |
| `WorkerName`              | auto         | Worker name for logging                                                                                                                       |
| `AutoStart`               | `true`       | Start polling on creation                                                                                                                     |
| `StartupJitterMaxSeconds` | `0`          | Max random delay (seconds) before first poll. Spreads out activation requests when multiple instances restart simultaneously. `0` = no delay. |

## Concurrency

Jobs are dispatched as concurrent `Task`s on the .NET thread pool. `MaxConcurrentJobs` controls how many jobs may be in-flight simultaneously.

- **I/O-bound handlers** (HTTP calls, database queries): higher values like 32–128 improve throughput because `async` handlers release threads during `await` points — many jobs, few OS threads.
- **CPU-bound handlers**: set `MaxConcurrentJobs` to `Environment.ProcessorCount` to match cores.
- **Sequential processing**: set `MaxConcurrentJobs = 1`.

## Lifecycle

```csharp
// Manual start/stop
var worker = client.CreateJobWorker(config with { AutoStart = false }, handler);
worker.Start();

// Graceful stop — waits up to 10s for in-flight jobs to finish
var result = await worker.StopAsync(gracePeriod: TimeSpan.FromSeconds(10));
// result.RemainingJobs, result.TimedOut

// Or stop all workers at once
await client.StopAllWorkersAsync(TimeSpan.FromSeconds(10));

// DisposeAsync stops workers automatically
await using var disposableClient = CamundaClient.Create();
```
