---
id: job-workers
title: Job Workers
sidebar_label: Job Workers
sidebar_position: 8
mdx:
  format: md
---

# Job Workers

Job workers long-poll for available jobs, execute a callback, and automatically complete or fail the job based on the return value. Workers are available on `CamundaAsyncClient`.

```python
import asyncio
from camunda_orchestration_sdk import CamundaAsyncClient, WorkerConfig
from camunda_orchestration_sdk.runtime.job_worker import JobContext

async def handle_job(job_context: JobContext) -> dict:
    variables = job_context.variables.to_dict()
    job_context.log.info(f"Processing job {job_context.job_key}: {variables}")
    # Return a dict to set output variables
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

Job workers support multiple execution strategies to match your workload type. Set `execution_strategy` in `WorkerConfig` or let the SDK auto-detect.

| Strategy | How it runs your handler | Best for |
|----------|--------------------------|----------|
| `"auto"` (default) | Auto-detects: `"async"` for `async def` handlers, `"thread"` for sync handlers | Most use cases — sensible defaults without configuration |
| `"async"` | Runs on a dedicated `asyncio` event loop | I/O-bound async work (HTTP calls, database queries) |
| `"thread"` | Runs in a `ThreadPoolExecutor` | Blocking I/O (file system, synchronous HTTP libraries) |
| `"process"` | Runs in a `ProcessPoolExecutor` | CPU-bound work that needs to escape the GIL (image processing, ML inference) |

**Auto-detection logic:** If your handler is an `async def`, the strategy defaults to `"async"`. If it's a regular `def`, the strategy defaults to `"thread"`. You can override this explicitly:

```python
# Force thread pool for a sync handler
config = WorkerConfig(
    job_type="io-bound-task",
    job_timeout_milliseconds=30_000,
    execution_strategy="thread",
)

# Force process pool for CPU-heavy work
config = WorkerConfig(
    job_type="image-processing",
    job_timeout_milliseconds=120_000,
    execution_strategy="process",
)
```

**Process strategy caveats:** The `"process"` strategy serialises (pickles) your handler and `JobContext` to send them to a worker process. This means:

- Your handler function and its closure must be picklable (top-level functions work; lambdas and closures over unpicklable objects do not).
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
| `execution_strategy` | `"auto"` | `"auto"`, `"async"`, `"thread"`, or `"process"` |
| `fetch_variables` | `None` | List of variable names to fetch (None = all) |
| `worker_name` | `"camunda-python-sdk-worker"` | Identifier for this worker in Camunda |
