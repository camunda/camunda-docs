---
id: job-workers
title: Job Workers
sidebar_label: Job Workers
sidebar_position: 11
mdx:
  format: md
---

# Job Workers

Job workers long-poll for available jobs, execute a callback, and automatically complete or fail the job based on the return value. Workers are available on `CamundaAsyncClient`.

Handlers receive a context object that includes a `client` reference, so your handler can make API calls during job execution. The context type depends on the execution strategy:

- **Async handlers** → `ConnectedJobContext` with `client: CamundaAsyncClient` (use `await`)
- **Thread handlers** → `SyncJobContext` with `client: CamundaClient` (call directly)
- **Process handlers** → plain `JobContext` (no client — cannot be pickled across process boundaries)

<!-- snippet-source: examples/readme.py | regions: ReadmeJobWorker -->

```python
import asyncio

from camunda_orchestration_sdk import CamundaAsyncClient, ConnectedJobContext, WorkerConfig

async def handle_job(job_context: ConnectedJobContext) -> dict[str, object]:
    variables = job_context.variables.to_dict()
    job_context.log.info(f"Processing job {job_context.job_key}: {variables}")
    return {"result": "processed"}

async def main() -> None:
    async with CamundaAsyncClient() as client:
        config = WorkerConfig(
            job_type="my-service-task",
            job_timeout_milliseconds=30_000,
        )
        client.create_job_worker(config=config, callback=handle_job)

        # Keep workers running until cancelled
        await client.run_workers()

asyncio.run(main())
```

## Using the Client in a Job Handler

Because `ConnectedJobContext` and `SyncJobContext` include a `client` reference, your handler can make API calls during job execution — for example, publishing a message to trigger another part of the process.

**Async handlers** (`execution_strategy="async"`) — `await` the client method directly:

<!-- snippet-source: examples/readme.py | regions: ReadmeAsyncHandler -->

```python
from camunda_orchestration_sdk import ConnectedJobContext, MessagePublicationRequest, MessagePublicationRequestVariables

async def handle_order(job: ConnectedJobContext) -> dict[str, object]:
    variables = job.variables.to_dict()
    order_id = variables["orderId"]

    await job.client.publish_message(
        data=MessagePublicationRequest(
            name="order-processed",
            correlation_key=order_id,
            time_to_live=60000,
            variables=MessagePublicationRequestVariables.from_dict({"orderId": order_id, "status": "completed"}),
        )
    )

    job.log.info(f"Published order-processed message for order {order_id}")
    return {"status": "done"}
```

**Sync (thread) handlers** (`execution_strategy="thread"`) — `job.client` is a sync `CamundaClient`, so call methods directly:

<!-- snippet-source: examples/readme.py | regions: ReadmeSyncHandler -->

```python
from camunda_orchestration_sdk import MessagePublicationRequest, MessagePublicationRequestVariables, SyncJobContext

def handle_order(job: SyncJobContext) -> dict[str, object]:
    variables = job.variables.to_dict()
    order_id = variables["orderId"]

    job.client.publish_message(
        data=MessagePublicationRequest(
            name="order-processed",
            correlation_key=order_id,
            time_to_live=60000,
            variables=MessagePublicationRequestVariables.from_dict({"orderId": order_id, "status": "completed"}),
        )
    )

    job.log.info(f"Published order-processed message for order {order_id}")
    return {"status": "done"}
```

> **Note:** The SDK automatically provides the right client type for each strategy — async handlers get `CamundaAsyncClient` (use `await`), thread handlers get `CamundaClient` (call directly). You don't need to create or manage these clients yourself.

## Job Logger

Each `JobContext` exposes a `log` property — a scoped logger automatically bound with the job's context (job type, worker name, and job key). Use it inside your handler for structured, per-job log output:

<!-- snippet-source: examples/readme.py | regions: ReadmeJobLogger -->

```python
async def handler(job: ConnectedJobContext) -> dict[str, object]:
    job.log.info(f"Starting work on {job.job_key}")
    # ... do work ...
    job.log.debug("Work completed successfully")
    return {"done": True}
```

The job logger inherits the SDK's logger configuration (loguru by default, or whatever you passed via `logger=`). If you injected a custom logger into the client, job handlers will use a child of that same logger.

> **Note:** When using the `"process"` execution strategy, the job logger silently degrades to a no-op (`NullLogger`) because loggers cannot be pickled across process boundaries. The worker's main-process logger still records all job lifecycle events (activation, completion, failure, errors). If you need per-job logging from a process-isolated handler, configure a logger inside the handler itself.

## Execution Strategies

Job workers support multiple execution strategies to match your workload type. Pass `execution_strategy` as a keyword argument to `create_job_worker`, or let the SDK auto-detect.

| Strategy           | How it runs your handler                                                       | Context type                              | Best for                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `"auto"` (default) | Auto-detects: `"async"` for `async def` handlers, `"thread"` for sync handlers | `ConnectedJobContext` or `SyncJobContext` | Most use cases — sensible defaults without configuration                                                             |
| `"async"`          | Runs on the main `asyncio` event loop                                          | `ConnectedJobContext` (async client)      | I/O-bound async work (HTTP calls, database queries). Best throughput for handlers that call remote systems over HTTP |
| `"thread"`         | Runs in a `ThreadPoolExecutor`                                                 | `SyncJobContext` (sync client)            | CPU-bound work, blocking I/O (file system, synchronous HTTP libraries)                                               |
| `"process"`        | Runs in a `ProcessPoolExecutor`                                                | `JobContext` (no client)                  | Heavy CPU-bound work that needs to escape the GIL (image processing, ML inference)                                   |

> **Choosing between `"async"` and `"thread"`:** If your job handler makes HTTP calls to remote systems (APIs, databases, microservices), `"async"` delivers the best performance — it can multiplex many concurrent jobs on a single thread without blocking. Use `"thread"` when your handler performs CPU-bound computation or calls synchronous libraries that would block the event loop.

**Auto-detection logic:** If your handler is an `async def`, the strategy defaults to `"async"`. If it's a regular `def`, the strategy defaults to `"thread"`. You can override this explicitly:

<!-- snippet-source: examples/readme.py | regions: ReadmeExecutionStrategies -->

```python
from camunda_orchestration_sdk import SyncJobContext, JobContext

# Force thread pool for a sync handler (receives SyncJobContext)
def io_handler(job: SyncJobContext) -> dict[str, object]:
    return {"done": True}

client.create_job_worker(
    config=WorkerConfig(job_type="io-bound-task", job_timeout_milliseconds=30_000),
    callback=io_handler,
    execution_strategy="thread",
)

# Force process pool for CPU-heavy work (receives plain JobContext)
def cpu_handler(job: JobContext) -> dict[str, object]:
    return {"computed": True}

client.create_job_worker(
    config=WorkerConfig(job_type="image-processing", job_timeout_milliseconds=120_000),
    callback=cpu_handler,
    execution_strategy="process",
)
```

**Process strategy caveats:** The `"process"` strategy serialises (pickles) your handler and its context to send them to a worker process. Because the SDK client cannot be pickled, handlers running under this strategy receive a plain `JobContext` (without a `client` attribute) instead of `ConnectedJobContext`/`SyncJobContext`. This means:

- Your handler function and its closure must be picklable (top-level functions work; lambdas and closures over unpicklable objects do not).
- Your handler must accept `JobContext`, not `ConnectedJobContext` or `SyncJobContext` — the type checker enforces this via overloaded signatures on `create_job_worker`.
- `job.log` degrades to a silent no-op logger in the child process (see [Job Logger](#job-logger)).
- There is additional overhead per job from serialisation and inter-process communication.

## Worker Configuration

`WorkerConfig` supports:

| Parameter                      | Default                             | Description                                    |
| ------------------------------ | ----------------------------------- | ---------------------------------------------- |
| `job_type`                     | _(required)_                        | The BPMN service task type to poll for         |
| `job_timeout_milliseconds`     | env / _(required)_                  | How long the worker has to complete the job    |
| `request_timeout_milliseconds` | env / `0`                           | Long-poll request timeout (0 = server default) |
| `max_concurrent_jobs`          | env / `10`                          | Maximum jobs executing concurrently            |
| `fetch_variables`              | `None`                              | List of variable names to fetch (None = all)   |
| `worker_name`                  | env / `"camunda-python-sdk-worker"` | Identifier for this worker in Camunda          |

The following are keyword-only arguments on `create_job_worker`, not part of `WorkerConfig`:

| Parameter                    | Default   | Description                                                                                                                                                                                                                                               |
| ---------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `execution_strategy`         | `"auto"`  | `"auto"`, `"async"`, `"thread"`, or `"process"`. Controls how the handler is invoked and which context type it receives.                                                                                                                                  |
| `startup_jitter_max_seconds` | env / `0` | Maximum random delay (in seconds) before the worker starts polling. When multiple application instances restart simultaneously, this spreads out initial activation requests to avoid saturating the server. A value of `0` (the default) means no delay. |

### Heritable Worker Defaults

Worker configuration fields marked "env" in the table above can be set globally via environment variables or the client constructor. Individual `WorkerConfig` values take precedence.

| Environment variable                        | Maps to                        |
| ------------------------------------------- | ------------------------------ |
| `CAMUNDA_WORKER_TIMEOUT`                    | `job_timeout_milliseconds`     |
| `CAMUNDA_WORKER_MAX_CONCURRENT_JOBS`        | `max_concurrent_jobs`          |
| `CAMUNDA_WORKER_REQUEST_TIMEOUT`            | `request_timeout_milliseconds` |
| `CAMUNDA_WORKER_NAME`                       | `worker_name`                  |
| `CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS` | `startup_jitter_max_seconds`   |

**Precedence:** explicit `WorkerConfig` value > environment variable / client constructor > hardcoded default.

Example — set defaults via environment variables:

```bash
export CAMUNDA_WORKER_TIMEOUT=30000
export CAMUNDA_WORKER_MAX_CONCURRENT_JOBS=32
```

<!-- snippet-source: examples/readme.py | regions: ReadmeWorkerDefaultsEnv -->

```python
# No need to set job_timeout_milliseconds on every worker — inherited from env
client.create_job_worker(
    config=WorkerConfig(job_type="payment-service"),
    callback=handle_payment,
)
client.create_job_worker(
    config=WorkerConfig(job_type="notification-service"),
    callback=handle_notification,
)
```

Example — set defaults via client constructor:

<!-- snippet-source: examples/readme.py | regions: ReadmeWorkerDefaultsClient -->

```python
client = CamundaAsyncClient(configuration={
    "CAMUNDA_WORKER_TIMEOUT": "30000",
    "CAMUNDA_WORKER_MAX_CONCURRENT_JOBS": "16",
    "CAMUNDA_WORKER_NAME": "my-app",
})

# Both workers inherit timeout, concurrency, and name
client.create_job_worker(
    config=WorkerConfig(job_type="payment-service"),
    callback=handle_payment,
)
client.create_job_worker(
    config=WorkerConfig(job_type="shipping-service"),
    callback=handle_shipping,
)
```

## Failing a Job

To explicitly fail a job with a custom error message, retry count, and backoff, raise `JobFailure` in your handler:

<!-- snippet-source: examples/readme.py | regions: ReadmeFailJob -->

```python
from camunda_orchestration_sdk import ConnectedJobContext, JobFailure

async def handle_job(job: ConnectedJobContext) -> dict[str, object]:
    if not job.variables.to_dict().get("required_field"):
        raise JobFailure(
            message="Missing required field",
            retries=2,
            retry_back_off=5000,  # milliseconds
        )
    return {"result": "ok"}
```

| Parameter        | Default      | Description                                                       |
| ---------------- | ------------ | ----------------------------------------------------------------- |
| `message`        | _(required)_ | Error message attached to the failure                             |
| `retries`        | `None`       | Remaining retries. `None` decrements the current retry count by 1 |
| `retry_back_off` | `0`          | Backoff before the next retry, in milliseconds                    |

If an unhandled exception escapes your handler, the job is automatically failed with the exception message and the retry count decremented by 1.

## Throwing a BPMN Error

To throw a [BPMN error](../../components/modeler/bpmn/error-events/error-events.md) from a job handler — for example, to trigger an error boundary event — raise `JobError`:

<!-- snippet-source: examples/readme.py | regions: ReadmeBpmnError -->

```python
from camunda_orchestration_sdk import ConnectedJobContext, JobError

async def handle_payment(job: ConnectedJobContext) -> dict[str, object]:
    variables = job.variables.to_dict()
    if variables.get("amount", 0) > 10_000:
        raise JobError(error_code="AMOUNT_TOO_HIGH", message="Payment exceeds limit")
    return {"status": "approved"}
```

| Parameter    | Default      | Description                                                    |
| ------------ | ------------ | -------------------------------------------------------------- |
| `error_code` | _(required)_ | The error code that is matched against BPMN error catch events |
| `message`    | `""`         | An optional error message for logging/diagnostics              |

The `error_code` must match the error code defined on a BPMN error catch event in your process model. If no catch event matches, the job becomes an incident.

## Job Corrections (User Task Listeners)

When a job worker handles a [user task listener](../../components/concepts/user-task-listeners.md), it can correct task properties (assignee, due date, candidate groups, etc.) as part of the completion. Return a `JobCompletionRequest` with a `result` containing `JobResultCorrections`:

<!-- snippet-source: examples/readme.py | regions: ReadmeJobCorrections -->

```python
from camunda_orchestration_sdk import ConnectedJobContext
from camunda_orchestration_sdk.models import (
    JobCompletionRequest,
    JobResultUserTask,
    JobResultCorrections,
)

async def validate_task(job: ConnectedJobContext) -> JobCompletionRequest:
    return JobCompletionRequest(
        result=JobResultUserTask(
            type_="userTask",
            corrections=JobResultCorrections(
                assignee="corrected-user",
                priority=80,
            ),
        ),
    )
```

To deny a task completion (reject the work), set `denied=True`:

<!-- snippet-source: examples/readme.py | regions: ReadmeJobCorrectionsDenied -->

```python
async def review_task(job: ConnectedJobContext) -> JobCompletionRequest:
    return JobCompletionRequest(
        result=JobResultUserTask(
            type_="userTask",
            denied=True,
            denied_reason="Insufficient documentation",
        ),
    )
```

| Correctable attribute | Type          | Clear value       |
| --------------------- | ------------- | ----------------- |
| `assignee`            | `str`         | Empty string `""` |
| `due_date`            | `datetime`    | Empty string `""` |
| `follow_up_date`      | `datetime`    | Empty string `""` |
| `candidate_users`     | `list[str]`   | Empty list `[]`   |
| `candidate_groups`    | `list[str]`   | Empty list `[]`   |
| `priority`            | `int` (0–100) | —                 |

Omitting an attribute or passing `None` preserves the persisted value. This works with all handler types (async, thread, and process).
