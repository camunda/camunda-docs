---
id: job-workers
title: "Job Workers"
sidebar_label: "Job Workers"
sidebar_position: 14
mdx:
  format: md
---

# Job Workers

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

Job workers subscribe to a specific job type and process jobs as they become available. The worker handles polling, concurrent dispatch, auto-completion, and error handling.

## Basic Worker

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+BasicWorker+BasicWorkerBody -->

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

| Handler behavior              | Job outcome                                           |
| ----------------------------- | ----------------------------------------------------- |
| Return `object`               | Auto-complete with those variables                    |
| Return `null`                 | Auto-complete with no variables                       |
| Return `JobCompletionRequest` | Complete with structured result (corrections, denial) |
| Throw `BpmnErrorException`    | Trigger a BPMN error boundary event                   |
| Throw `JobFailureException`   | Fail with custom retries / back-off                   |
| Throw any other exception     | Auto-fail with `retries - 1`                          |

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: ErrorHandling+ErrorHandlingFailure -->

```csharp
// BPMN error — caught by error boundary events in the process model
throw new BpmnErrorException("INVALID_ORDER", "Order not found");

// Explicit failure with retry control
throw new JobFailureException("Service unavailable", retries: 2, retryBackOffMs: 5000);
```

## Job Corrections (User Task Listeners)

When handling jobs from [user task listeners](../../components/concepts/user-task-listeners.md), you can return a `JobCompletionRequest` to apply corrections to the task or deny the action. Return a `JobCompletionRequest` from the handler instead of a plain variables object:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: JobCorrections -->

```csharp
client.CreateJobWorker(config, async (job, ct) =>
{
    // Apply corrections to the user task
    return new JobCompletionRequest
    {
        Variables = new { reviewed = true },
        Result = new JobResultUserTask
        {
            Corrections = new JobResultCorrections
            {
                Assignee = "new-assignee",
                Priority = 75,
                CandidateGroups = new List<string> { "managers" },
            },
        },
    };
});
```

To deny the user task action (e.g. reject a completion):

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: JobCorrectionsDenied -->

```csharp
client.CreateJobWorker(config, async (job, ct) =>
{
    return new JobCompletionRequest
    {
        Result = new JobResultUserTask
        {
            Denied = true,
            DeniedReason = "Missing required fields",
        },
    };
});
```

## Void Handler (No Output Variables)

For handlers that don't return output variables, use the void overload:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: VoidHandler+VoidHandlerBody -->

```csharp
public record NotificationInput(string Message);

client.CreateJobWorker(config, async (job, ct) =>
{
    await SendNotification(job.GetVariables<NotificationInput>()!, ct);
    // Auto-completes with no variables
});
```

## Configuration

| Property                  | Default            | Description                                                                                                      |
| ------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `JobType`                 | _(required)_       | BPMN task type to subscribe to                                                                                   |
| `JobTimeoutMs`            | _(env / required)_ | Job lock duration (ms). Falls back to `CAMUNDA_WORKER_TIMEOUT` env var.                                          |
| `MaxConcurrentJobs`       | `10`               | Max in-flight jobs per worker. Falls back to `CAMUNDA_WORKER_MAX_CONCURRENT_JOBS` env var, then `10`.            |
| `PollIntervalMs`          | `500`              | Delay between polls when idle                                                                                    |
| `PollTimeoutMs`           | `null`             | Long-poll timeout (null = broker default). Falls back to `CAMUNDA_WORKER_REQUEST_TIMEOUT` env var.               |
| `FetchVariables`          | `null`             | Variable names to fetch (null = all)                                                                             |
| `WorkerName`              | auto               | Worker name for logging. Falls back to `CAMUNDA_WORKER_NAME` env var.                                            |
| `AutoStart`               | `true`             | Start polling on creation                                                                                        |
| `StartupJitterMaxSeconds` | `0`                | Max random delay (seconds) before first poll. Falls back to `CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS` env var. |

## Heritable Worker Defaults

When running many workers with the same base configuration, you can set global defaults via environment variables. These apply to every worker created by the client unless the individual `JobWorkerConfig` explicitly overrides them.

| Environment Variable                        | Config Property           | Type   |
| ------------------------------------------- | ------------------------- | ------ |
| `CAMUNDA_WORKER_TIMEOUT`                    | `JobTimeoutMs`            | long   |
| `CAMUNDA_WORKER_MAX_CONCURRENT_JOBS`        | `MaxConcurrentJobs`       | int    |
| `CAMUNDA_WORKER_REQUEST_TIMEOUT`            | `PollTimeoutMs`           | long   |
| `CAMUNDA_WORKER_NAME`                       | `WorkerName`              | string |
| `CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS` | `StartupJitterMaxSeconds` | int    |

**Precedence:** explicit `JobWorkerConfig` value > environment variable > hardcoded default.

```bash
export CAMUNDA_WORKER_TIMEOUT=30000
export CAMUNDA_WORKER_MAX_CONCURRENT_JOBS=8
export CAMUNDA_WORKER_NAME=order-service
```

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: WorkerDefaultsEnv -->

```csharp
// Workers inherit timeout, concurrency, and name from environment
client.CreateJobWorker(
    new JobWorkerConfig { JobType = "validate-order" },
    async (job, ct) => null);

client.CreateJobWorker(
    new JobWorkerConfig { JobType = "ship-order" },
    async (job, ct) => null);

// Per-worker override: this worker uses 32 concurrent jobs instead of the global 8
client.CreateJobWorker(
    new JobWorkerConfig { JobType = "bulk-import", MaxConcurrentJobs = 32 },
    async (job, ct) => null);
```

You can also pass defaults programmatically via the client constructor:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: WorkerDefaultsClient -->

```csharp
var client = CamundaClient.Create(new CamundaOptions
{
    Config = new Dictionary<string, string>
    {
        ["CAMUNDA_WORKER_TIMEOUT"] = "30000",
        ["CAMUNDA_WORKER_MAX_CONCURRENT_JOBS"] = "8",
    },
});
```

## Concurrency

Jobs are dispatched as concurrent `Task`s on the .NET thread pool. `MaxConcurrentJobs` controls how many jobs may be in-flight simultaneously.

- **I/O-bound handlers** (HTTP calls, database queries): higher values like 32–128 improve throughput because `async` handlers release threads during `await` points — many jobs, few OS threads.
- **CPU-bound handlers**: set `MaxConcurrentJobs` to `Environment.ProcessorCount` to match cores.
- **Sequential processing**: set `MaxConcurrentJobs = 1`.

## Lifecycle

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: WorkerLifecycle -->

```csharp
// Manual start/stop
var worker = client.CreateJobWorker(new JobWorkerConfig { JobType = "example", JobTimeoutMs = 30_000, AutoStart = false }, handler);
worker.Start();

// Graceful stop — waits up to 10s for in-flight jobs to finish
var result = await worker.StopAsync(gracePeriod: TimeSpan.FromSeconds(10));
// result.RemainingJobs, result.TimedOut

// Or stop all workers at once
await client.StopAllWorkersAsync(TimeSpan.FromSeconds(10));

// DisposeAsync stops workers automatically
await using var disposableClient = CamundaClient.Create();
```
