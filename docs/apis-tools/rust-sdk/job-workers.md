---
id: job-workers
title: "Job workers"
sidebar_label: "Job workers"
sidebar_position: 10
mdx:
  format: md
---

# Job workers

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

```rust
use camunda_orchestration_sdk::{JobAction, JobWorkerConfig};

let worker = client.create_job_worker(
    JobWorkerConfig::new("payment-service")
        .max_jobs_to_activate(20)
        .worker_name("payment-worker"),
);

worker
    .run(|job| async move {
        println!("handling job {}", job.key());
        JobAction::complete_with(serde_json::json!({ "paid": true }))
    })
    .await?;
```

A handler returns a `JobAction`:

- `JobAction::complete()` / `JobAction::complete_with(vars)` — complete the job.
- `JobAction::complete_with_result(result)` /
  `JobAction::complete_with_variables_and_result(vars, result)` — complete the job with a
  job result (see [Job corrections](#job-corrections-user-task-listeners) and
  [Ad-hoc sub-process results](#ad-hoc-sub-process-results)).
- `JobAction::fail("message")` — fail the job (retries decremented by the engine).
- `JobAction::error("ERROR_CODE")` — throw a catchable BPMN error.
- `JobAction::leave()` — take no action; the job remains activated until timeout.

The `Job` exposes `key()`, `job_type()`, `process_instance_key()`, `variables()`, and
`variables_as::<T>()` for typed deserialization.

Enable **job leasing** with `JobWorkerConfig::new("...").with_lease(true)`. Each activated
job then carries a lease token that the worker sends back on complete, fail, and
throw-error, so the engine fences the command against a superseded activation (for example
after the job timed out and another worker picked it up). Leasing is off by default and
needs a server that supports it: rather than silently sending unfenced commands, a worker
that asked for a lease and is handed a job without a token stops with
`CamundaError::LeaseNotHonored`.

For managed lifecycle, register workers on the client and stop them all gracefully:

```rust
// Spawn managed workers; the client retains them in its registry.
client.spawn_worker(client.worker_config("payment-service"), |job| async move {
    JobAction::complete_with(serde_json::json!({ "paid": true }))
});

// ... later, on shutdown: drain in-flight jobs and stop every worker gracefully.
client.stop_all_workers().await?;
```

> For complete, runnable programs see
> [`examples/worker.rs`](https://github.com/camunda/orchestration-cluster-api-rust/blob/main/examples/worker.rs)
> and
> [`examples/deploy_start_and_work.rs`](https://github.com/camunda/orchestration-cluster-api-rust/blob/main/examples/deploy_start_and_work.rs).

## Job corrections (user task listeners)

When a job worker handles a
[user task listener](../../components/concepts/user-task-listeners.md),
it can correct task properties (assignee, due date, candidate groups, etc.) as part of the
completion by returning a `UserTaskResult`:

```rust
use camunda_orchestration_sdk::{
    JobAction, JobWorkerConfig, UserTaskCorrections, UserTaskResult,
};

client
    .create_job_worker(JobWorkerConfig::new("io.camunda:userTaskListener"))
    .run(|_job| async move {
        JobAction::complete_with_variables_and_result(
            serde_json::json!({ "reviewed": true }),
            UserTaskResult::new().corrections(
                UserTaskCorrections::new()
                    .assignee("corrected-user")
                    .candidate_groups(["managers"])
                    .clear_follow_up_date()
                    .priority(80),
            ),
        )
    })
    .await?;
```

To deny a task completion (reject the work):

```rust
use camunda_orchestration_sdk::{JobAction, UserTaskResult};

JobAction::complete_with_result(UserTaskResult::deny("Insufficient documentation"))
```

| `UserTaskCorrections` setter | Type                                       | To clear                  |
| ---------------------------- | ------------------------------------------ | ------------------------- |
| `assignee`                   | `impl Into<String>`                        | `.assignee("")`           |
| `due_date`                   | `impl Into<chrono::DateTime<FixedOffset>>` | `.clear_due_date()`       |
| `follow_up_date`             | `impl Into<chrono::DateTime<FixedOffset>>` | `.clear_follow_up_date()` |
| `candidate_users`            | iterator of strings                        | an empty list             |
| `candidate_groups`           | iterator of strings                        | an empty list             |
| `priority`                   | `i32` (0–100)                              | —                         |

An attribute you do not set preserves the persisted value. A cleared date is sent as
`""`; setting and clearing the same date overrides each other, so the last call wins.

## Ad-hoc sub-process results

A job worker for an
[ad-hoc sub-process](../../components/modeler/bpmn/ad-hoc-subprocesses.md)
decides which elements to activate, and whether the sub-process is done, by returning an
`AdHocSubProcessResult`:

```rust
use camunda_orchestration_sdk::{AdHocSubProcessResult, JobAction};

JobAction::complete_with_result(
    AdHocSubProcessResult::new()
        .activate_element("collect-documents")
        .activate_element_with("review", serde_json::json!({ "reviewer": "alice" }))
        .completion_condition_fulfilled(false)
        .cancel_remaining_instances(false),
)
```

Both builders convert into a `CompletionResult`, which wraps the generated
`models::JobResult` (whose variant sets the `type` discriminator, `userTask` /
`adHocSubProcess`, on the wire) together with any cleared dates. A hand-built
`models::JobResult` is accepted too, but the generated model types the dates as date-times
and so cannot clear them — use `UserTaskCorrections` for that.

> **Falcon command stream (nanobpmn gateways):** job results are sent over REST only. The
> Falcon command stream's completion frame has no field for a result, so when a worker is
> receiving jobs over the stream, a handler that returns a job result has its job
> **failed** (never completed — that would approve a denied task) with a message saying
> so. To use job results against a nanobpmn gateway, set `CAMUNDA_FORCE_REST=true` so
> workers use the REST transport. Against stock Camunda the stream is never used, so this
> does not apply.
