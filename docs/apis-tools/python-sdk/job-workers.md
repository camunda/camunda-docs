---
id: job-workers
title: Job Workers
sidebar_label: Job Workers
sidebar_position: 10
mdx:
  format: md
---

# Job Workers

Job workers long-poll for available jobs, execute a callback, and automatically complete or fail the job based on the return value. Workers are available on `CamundaAsyncClient`.

By default, handlers receive a `ConnectedJobContext` — an extended context that includes a `client` reference back to the `CamundaAsyncClient`, so your handler can make API calls during job execution. If you use the `"process"` execution strategy, handlers receive a plain `JobContext` instead (the client cannot be pickled across process boundaries).

```python
import asyncio
from camunda_orchestration_sdk import CamundaAsyncClient, WorkerConfig
from camunda_orchestration_sdk.runtime.job_worker import ConnectedJobContext

async def handle_job(job_context: ConnectedJobContext) -> dict:
    variables = job_context.variables.to_dict()
    job_context.log.info(f"Processing job {job_context.job_key}: {variables}")
    # You can use job_context.client to make API calls:
    # await job_context.client.send_message(...)
    return {"result": "processed"}

async def main():
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

## Job Logger

Each `JobContext` exposes a `log` property — a scoped logger automatically bound with the job's context (job type, worker name, and job key). Use it inside your handler for structured, per-job log output:

```python
async def handler(job: JobContext) -> dict:
    job.log.info(f"Starting work on {job.job_key}")
    # ... do work ...
    job.log.debug("Work completed successfully")
    return {"done": True}
```

The job logger inherits the SDK's logger configuration (loguru by default, or whatever you passed via `logger=`). If you injected a custom logger into the client, job handlers will use a child of that same logger.

> **Note:** When using the `"process"` execution strategy, the job logger silently degrades to a no-op (`NullLogger`) because loggers cannot be pickled across process boundaries. The worker's main-process logger still records all job lifecycle events (activation, completion, failure, errors). If you need per-job logging from a process-isolated handler, configure a logger inside the handler itself.

## Execution Strategies

Job workers support multiple execution strategies to match your workload type. Pass `execution_strategy` as a keyword argument to `create_job_worker`, or let the SDK auto-detect.

| Strategy | How it runs your handler | Best for |
|----------|--------------------------|----------|
| `"auto"` (default) | Auto-detects: `"async"` for `async def` handlers, `"thread"` for sync handlers | Most use cases — sensible defaults without configuration |
| `"async"` | Runs on a dedicated `asyncio` event loop | I/O-bound async work (HTTP calls, database queries) |
| `"thread"` | Runs in a `ThreadPoolExecutor` | Blocking I/O (file system, synchronous HTTP libraries) |
| `"process"` | Runs in a `ProcessPoolExecutor` | CPU-bound work that needs to escape the GIL (image processing, ML inference) |

**Auto-detection logic:** If your handler is an `async def`, the strategy defaults to `"async"`. If it's a regular `def`, the strategy defaults to `"thread"`. You can override this explicitly:

```python
from camunda_orchestration_sdk.runtime.job_worker import ConnectedJobContext, JobContext

# Force thread pool for a sync handler (receives ConnectedJobContext)
def io_handler(job: ConnectedJobContext) -> dict:
    return {"done": True}

client.create_job_worker(
    config=WorkerConfig(job_type="io-bound-task", job_timeout_milliseconds=30_000),
    callback=io_handler,
    execution_strategy="thread",
)

# Force process pool for CPU-heavy work (receives plain JobContext)
def cpu_handler(job: JobContext) -> dict:
    return {"computed": True}

client.create_job_worker(
    config=WorkerConfig(job_type="image-processing", job_timeout_milliseconds=120_000),
    callback=cpu_handler,
    execution_strategy="process",
)
```

**Process strategy caveats:** The `"process"` strategy serialises (pickles) your handler and its context to send them to a worker process. Because the SDK client cannot be pickled, handlers running under this strategy receive a plain `JobContext` (without a `client` attribute) instead of `ConnectedJobContext`. This means:

- Your handler function and its closure must be picklable (top-level functions work; lambdas and closures over unpicklable objects do not).
- Your handler must accept `JobContext`, not `ConnectedJobContext` — the type checker enforces this via overloaded signatures on `create_job_worker`.
- `job.log` degrades to a silent no-op logger in the child process (see [Job Logger](#job-logger)).
- There is additional overhead per job from serialisation and inter-process communication.

## Worker Configuration

`WorkerConfig` supports:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `job_type` | *(required)* | The BPMN service task type to poll for |
| `job_timeout_milliseconds` | *(required)* | How long the worker has to complete the job |
| `request_timeout_milliseconds` | `0` | Long-poll request timeout (0 = server default) |
| `max_concurrent_jobs` | `10` | Maximum jobs executing concurrently |
| `fetch_variables` | `None` | List of variable names to fetch (None = all) |
| `worker_name` | `"camunda-python-sdk-worker"` | Identifier for this worker in Camunda |

The following are keyword-only arguments on `create_job_worker`, not part of `WorkerConfig`:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `execution_strategy` | `"auto"` | `"auto"`, `"async"`, `"thread"`, or `"process"`. Controls how the handler is invoked and which context type it receives. |
| `startup_jitter_max_seconds` | `0` | Maximum random delay (in seconds) before the worker starts polling. When multiple application instances restart simultaneously, this spreads out initial activation requests to avoid saturating the server. A value of `0` (the default) means no delay. |
