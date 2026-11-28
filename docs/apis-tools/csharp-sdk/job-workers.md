---
id: job-workers
title: "Job Workers"
sidebar_label: "Job Workers"
sidebar_position: 14
mdx:
  format: md
---

# Job Workers

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

## Job Variables Are Untrusted Input

A job's `variables` and `customHeaders` are both **untrusted input**, but they come from different
places, so they are untrusted for different reasons:

- `variables` carry whatever was written into the process instance — by whoever started it, by an
  earlier service task, or by a form submission. A handler must treat them the way it would treat
  an HTTP request body, not the way it would treat its own configuration.
- `customHeaders` are defined in the process model (during modelling), not written by process
  starters, service tasks or forms. They are controlled by whoever can deploy or change the model.
  That is a narrower group than the one that controls `variables`, but it is still not your
  handler's own code, so validate them before you rely on them for anything sensitive.

What the SDK does:

- **Deserialization is explicit.** Variables reach the handler as `object` (a `JsonElement` at
  runtime) and are only materialised when you ask for a type, via `job.GetVariables<T>()` or
  `job.GetCustomHeaders<T>()`. There is no unrestricted type-name resolution: the payload cannot
  name a type for the SDK to load and instantiate. `System.Text.Json` will dispatch to
  polymorphic subtypes that _your own_ target type declares (`[JsonDerivedType]`), which is your
  declaration rather than the payload's choice, and it will use converters you pass yourself.
- **Two sets of `JsonSerializerOptions` are involved.** The client's options parse the activation
  response and register a closed set — tolerant enums and the SDK's own key types.
  `TypedVariables.DefaultOptions`, which `GetVariables<T>()` uses when you pass no options of your
  own, registers no converters at all. Neither set does payload-driven type resolution.
- **Depth is bounded, and the bound is on the whole response.** The SDK sets no `MaxDepth` of its
  own, so the `System.Text.Json` default of **64** applies — to the activation response document
  as a whole, not to the variable payload in isolation. The envelope around a job (response
  object → `jobs` array → job object) consumes the first levels of that budget, so a variable
  payload has the remainder. A response nested deeper fails with a `JsonException` during
  activation, before the handler runs, rather than recursing without bound.
- **The SDK does not log variable payloads.** The worker logs job keys, worker names and statuses.
  There are indirect routes, though, and they differ by where the exception is raised:
  - An exception that escapes your handler and is not one of the SDK's own control exceptions is
    logged with its message and stack trace by the default logger, and its message is also sent to
    the broker as that job's failure message. That includes the `JsonException` that
    `job.GetVariables<T>()` throws, because you call it from the handler: on a payload that does
    not fit `T`, its message and path can name payload properties.
  - `JobFailureException` and `BpmnErrorException` are not logged by the worker, but their
    messages are sent to the broker (as the failure message, or as the BPMN error message), so
    they carry the same risk toward the broker. A handler cancelled by worker shutdown is
    not reported to the broker, and only a debug line naming the job key is logged; the job is
    left to time out.
  - A failure while the activation response is parsed (for example, nesting beyond the depth
    limit) happens before any handler exists. It is logged by the worker's poll loop, with the
    exception, but it is not sent to the broker, because there is no job to fail yet. A single
    job that cannot be converted after the response was parsed is logged at warning level with its
    exception and skipped, and is likewise not reported to the broker.
  - The exception to the poll-loop log is a parse failure on a lease token the worker asked for
    (`WithLease`). It does not reach that log: it is replaced by a `LeaseNotHonoredException`
    that faults the poll task, so it surfaces through the worker's `Completion` task (and
    `RunWorkersAsync`). That exception names a placeholder job key and the `withLease` flag, not
    payload content, and the original parse exception is not kept.

  A variable value or property name that ends up in an exception message therefore reaches the
  broker for handler exceptions, and the log for unexpected ones and activation failures (a
  rejected lease token excepted, as above). Nothing redacts exception contents: keep variable
  values out of the exception messages you throw.

- **Each job's payload is its own.** Every activated job gets its own wrapper over its own result,
  and `JsonElement` is immutable, so nothing is shared or mutated across concurrent handler tasks.

What the SDK does **not** do — your handler owns these:

- **No size limit.** There is no cap on the byte size of a variable payload, beyond the limits the
  broker itself enforces. A large payload is deserialized as given.
- **No schema validation.** The SDK checks the payload against no schema. `GetVariables<T>()` is
  a `System.Text.Json` conversion, so what it does with a mismatched payload is `System.Text.Json`
  behaviour. By default, for an ordinary DTO, properties that do not match `T` are ignored and
  missing ones keep their initializer or default (`null` for reference types). Members marked
  `required` or `[JsonRequired]` make an absent property throw a `JsonException`, and options you
  pass yourself (for example `UnmappedMemberHandling = Disallow`) can reject unmatched properties.
  Neither is a substitute for validating the values you depend on — ranges, formats, required
  fields — in the handler.
- **No sanitisation.** Strings arrive exactly as stored. Anything you pass onward to a shell, a
  SQL statement, a file path or an HTML page needs the same escaping you would apply to any
  external input.

Note on depth: 64 is the `System.Text.Json` default rather than a limit this SDK declares. Treat
it as the limit that applies today, not as a contract. Passing your own `JsonSerializerOptions`
to `GetVariables<T>()` can only _tighten_ the bound on a job's variables: that element has already
been parsed off the activation response, so a larger `MaxDepth` there cannot admit a payload the
activation parse already rejected. The guarantee is qualified: it holds when no custom `MaxDepth`
is given and the element came from the activation response. Custom options passed to
`DeserializeAs` on an element that was parsed elsewhere can raise the limit, and an object that
is already a typed DTO skips conversion, so no depth bound is applied to it.

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

`DueDate` and `FollowUpDate` are cleared with `ClearDueDate()` / `ClearFollowUpDate()`, which send an empty string. Leaving them `null` keeps the task's current value. Assigning the property after a clear replaces it, and the reverse is also true. The same methods exist on `Changeset` for `UpdateUserTaskAsync`:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: JobCorrectionsClearDates -->

```csharp
client.CreateJobWorker(config, async (job, ct) =>
{
    return new JobCompletionRequest
    {
        Result = new JobResultUserTask
        {
            // Set the due date and remove the follow-up date. Leaving a date
            // unset (null) keeps the task's current value.
            Corrections = new JobResultCorrections
            {
                DueDate = DateTimeOffset.UtcNow.AddDays(7),
            }.ClearFollowUpDate(),
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

| Property                  | Default            | Description                                                                                                                                  |
| ------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `JobType`                 | _(required)_       | BPMN task type to subscribe to                                                                                                               |
| `JobTimeoutMs`            | _(env / required)_ | Job lock duration (ms). Falls back to `CAMUNDA_WORKER_TIMEOUT` env var.                                                                      |
| `MaxConcurrentJobs`       | `10`               | Max in-flight jobs per worker. Falls back to `CAMUNDA_WORKER_MAX_CONCURRENT_JOBS` env var, then `10`.                                        |
| `PollIntervalMs`          | `500`              | Delay between polls when idle                                                                                                                |
| `PollTimeoutMs`           | `null`             | Long-poll timeout (null = broker default). Falls back to `CAMUNDA_WORKER_REQUEST_TIMEOUT` env var.                                           |
| `FetchVariables`          | `null`             | Variable names to fetch (null = all)                                                                                                         |
| `WorkerName`              | auto               | Worker name for logging. Falls back to `CAMUNDA_WORKER_NAME` env var.                                                                        |
| `AutoStart`               | `true`             | Start polling on creation                                                                                                                    |
| `StartupJitterMaxSeconds` | `0`                | Max random delay (seconds) before first poll. Falls back to `CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS` env var.                             |
| `TenantIds`               | `null`             | Tenant IDs to activate jobs for. Falls back to `CAMUNDA_TENANT_IDS`, then `[CAMUNDA_DEFAULT_TENANT_ID]`. Mutually exclusive with `TenantId`. |
| `TenantId`                | `null`             | Single-tenant convenience for `TenantIds`. Mutually exclusive with `TenantIds`.                                                              |
| `TenantFilter`            | `null`             | Tenant filtering strategy (`PROVIDED` / `ASSIGNED`). See [Multi-Tenant Workers](#multi-tenant-workers). Requires Camunda 8.9+.               |

## Multi-Tenant Workers

A worker activates jobs for a fixed tenant set (`TenantIds` / `TenantId`), or delegates the choice to the server with `TenantFilter`:

| `TenantFilter`      | Behavior                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `null` / `PROVIDED` | Activate jobs for the tenants named in `TenantIds` / `TenantId`, falling back to `CAMUNDA_TENANT_IDS`, then the default tenant. |
| `ASSIGNED`          | Activate jobs for whichever tenants are currently assigned to the authenticated client. No tenant IDs are sent.                 |

The fixed tenant set can also come from configuration, so a fleet of workers shares one tenant list:

```bash
export CAMUNDA_TENANT_IDS=acme,globex
```

```json
// appsettings.json — array or comma-separated string
{
  "Camunda": {
    "TenantIds": ["acme", "globex"]
  }
}
```

**Tenant precedence** (highest wins): `JobWorkerConfig.TenantIds` / `TenantId` > `CAMUNDA_TENANT_IDS` > `[CAMUNDA_DEFAULT_TENANT_ID]`. An empty `TenantIds` list counts as unset. `TenantFilter = ASSIGNED` opts out of the chain entirely — the configured tenant IDs are ignored, not sent.

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: MultiTenantWorker -->

```csharp
// Fixed tenant set — activate jobs for these tenants only
client.CreateJobWorker(
    new JobWorkerConfig
    {
        JobType = "process-order",
        JobTimeoutMs = 30_000,
        TenantIds = new[] { "acme", "globex" },
    },
    async (job, ct) => null);

// Dynamic tenant set — activate jobs for whichever tenants are currently
// assigned to the authenticated client. The server re-evaluates the
// assignment on every activation request, so tenants added or removed in
// Camunda take effect without restarting the worker.
client.CreateJobWorker(
    new JobWorkerConfig
    {
        JobType = "process-order",
        JobTimeoutMs = 30_000,
        TenantFilter = TenantFilterEnum.ASSIGNED,
    },
    async (job, ct) => null);
```

`ASSIGNED` re-reads the assignment on every activation request, so the worker picks up newly assigned tenants and drops removed ones without restarting and without the application querying or caching the tenant list. Notes:

- `ASSIGNED` cannot be combined with `TenantIds` or `TenantId` — the server would ignore them, so `CreateJobWorker` throws `ArgumentException` instead.
- `ASSIGNED` requires multi-tenancy to be enabled on the cluster; otherwise the activation request is rejected with HTTP 400.

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
