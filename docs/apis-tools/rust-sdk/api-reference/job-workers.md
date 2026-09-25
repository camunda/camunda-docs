---
title: "Job workers"
sidebar_label: "Job workers"
mdx:
  format: md
---

# Job workers

Job workers poll for jobs of a given type, run a handler, and report the outcome back to the cluster.

## Job

A job delivered to a worker handler. Wraps the activated job with convenient
accessors for variables and custom headers.

### Methods

| Method                 | Description                                                                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clock`                | The clock this job's worker resolves cadence through. Handlers that need to wait must use this rather than `tokio::time::sleep`, so an injected clock controls them. |
| `custom_headers`       | The job custom headers.                                                                                                                                              |
| `element_id`           | The BPMN element id that created this job.                                                                                                                           |
| `job_type`             | The job type.                                                                                                                                                        |
| `key`                  | The job key, as a string.                                                                                                                                            |
| `process_instance_key` | The process instance key, as a string.                                                                                                                               |
| `raw`                  | The underlying generated activated-job model.                                                                                                                        |
| `retries`              | Remaining retries for this job.                                                                                                                                      |
| `variables`            | The job variables as a JSON map.                                                                                                                                     |
| `variables_as`         | Deserialize the job variables into a typed value.                                                                                                                    |

## JobAction

The action a handler asks the worker to take after processing a job.

### Variants

| Variant    | Payload                                                                                                    | Description                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `Complete` | `{ variables: Option<Value> }`                                                                             | Complete the job, optionally with output variables.                      |
| `Fail`     | `{ error_message: String, retries: Option<i32>, retry_backoff_ms: Option<i64>, variables: Option<Value> }` | Fail the job, decrementing retries (unless `retries` is set explicitly). |
| `Error`    | `{ error_code: String, error_message: Option<String>, variables: Option<Value> }`                          | Throw a BPMN error to be caught by an error boundary event.              |
| `Leave`    | —                                                                                                          | Take no action; the job remains activated until its timeout elapses.     |

### Methods

| Method          | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `complete`      | Complete the job with no output variables.                                  |
| `complete_with` | Complete the job with output variables.                                     |
| `error`         | Throw a BPMN error with the given error code.                               |
| `fail`          | Fail the job with an error message (retries are decremented by the engine). |
| `leave`         | Leave the job activated (take no action).                                   |

## JobHandler

Boxed, shareable job handler. You normally pass a closure to `JobWorker::run`
rather than constructing this directly.

```rust
pub type JobHandler = Arc<dyn Fn(Job) -> Pin<Box<dyn Future<Output = JobAction> + Send>> + Send + Sync>;
```

## JobWorker

A continuously-polling job worker. Build one via
`CamundaClient::create_job_worker`.

### Methods

| Method  | Description                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------- |
| `run`   | Run the worker loop, processing jobs with `handler` until stopped or an unrecoverable error occurs. |
| `spawn` | Spawn the worker loop and return a `JobWorkerHandle` for graceful shutdown.                         |
| `start` | Spawn the worker loop on the Tokio runtime, returning a `tokio::task::JoinHandle`.                  |

## JobWorkerConfig

Configuration for a `JobWorker`.

### Fields

| Field                        | Type                    | Description                                                                                                                                                                                                 |
| ---------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `job_type`                   | `String`                | The job type to poll for (required).                                                                                                                                                                        |
| `max_jobs_to_activate`       | `i32`                   | Maximum number of jobs to activate per poll. Also bounds in-flight concurrency.                                                                                                                             |
| `job_timeout_ms`             | `i64`                   | How long the engine reserves an activated job for this worker, in milliseconds.                                                                                                                             |
| `request_timeout_ms`         | `i64`                   | Long-poll timeout for the activate-jobs request, in milliseconds.                                                                                                                                           |
| `poll_interval_ms`           | `u64`                   | Delay between polls when the last poll returned no jobs, in milliseconds.                                                                                                                                   |
| `worker_name`                | `String`                | Worker name reported to the engine.                                                                                                                                                                         |
| `fetch_variables`            | `Option<Vec<String>>`   | Variable names to fetch with each job. `None` fetches all variables.                                                                                                                                        |
| `tenant_ids`                 | `Option<Vec<String>>`   | Tenant ids to activate jobs for.                                                                                                                                                                            |
| `startup_jitter_max_seconds` | `u64`                   | Maximum random startup delay before the first poll, in seconds. Spreads the initial activate-jobs stampede when many workers start at once.                                                                 |
| `on_ready`                   | `Option<ReadyCallback>` | Optional callback fired once when the worker becomes ready to receive jobs (Falcon subscription established, or REST poll loop entered). Set via `JobWorkerConfig::on_ready`. Excluded from `Debug` output. |

### Methods

| Method                       | Description                                                                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fetch_variables`            | Restrict fetched variables to the given names.                                                                                                                |
| `from_defaults`              | Create a config seeded from the SDK's resolved `WorkerDefaults` (env-driven), for the given job type. Builder methods can still override individual fields.   |
| `job_timeout_ms`             | Set the job activation timeout, in milliseconds.                                                                                                              |
| `max_jobs_to_activate`       | Set the maximum number of jobs activated per poll.                                                                                                            |
| `new`                        | Create a config for the given job type with sensible defaults.                                                                                                |
| `on_ready`                   | Register a callback fired once when this worker becomes ready to receive jobs (its Falcon subscription is established, or it has entered the REST poll loop). |
| `startup_jitter_max_seconds` | Set the maximum random startup delay (seconds) applied before the first poll.                                                                                 |
| `tenant_ids`                 | Set the tenant ids to activate jobs for.                                                                                                                      |
| `worker_name`                | Set the worker name.                                                                                                                                          |

## JobWorkerHandle

A handle to a spawned `JobWorker`, used to stop it and await its completion.

Dropping the handle does **not** stop the worker; call `JobWorkerHandle::stop` (or
`CamundaClient::stop_all_workers`) for a
graceful shutdown that lets in-flight jobs drain.

### Methods

| Method        | Description                                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `is_finished` | Whether the worker task has finished.                                                                                                     |
| `job_type`    | The job type this worker polls for.                                                                                                       |
| `shutdown`    | Signal the worker to stop and await its graceful shutdown.                                                                                |
| `stop`        | Signal the worker to stop. It finishes draining any in-flight jobs from the current batch, then exits before the next poll. Non-blocking. |
| `worker_name` | The worker name reported to the engine.                                                                                                   |

## ReadyCallback

Callback invoked once, when a worker becomes ready to receive jobs — i.e. its
Falcon command-stream subscription has been established, or (when Falcon is
unavailable) its REST poll loop has been entered. Useful for readiness gates and
probes; the SDK guarantees it fires at most once per worker run.

```rust
pub type ReadyCallback = Arc<dyn Fn() + Send + Sync>;
```
