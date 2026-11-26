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

## Job variables are untrusted input

Job variables reach your handler from the server, but their **content is set by whoever can
write variables into the process instance**, and that is not only whoever started it. It is
also whoever published or correlated a message that carries variables, whatever completed an
earlier job, user task or connector step with a result (including workers owned by other
teams), and anyone who can set or update variables through the API. For a process started
from a public form, an inbound connector or another team's service, that is not you. Treat
`job.variables()` and `job.variables_as::<T>()` as untrusted input and validate them before
use, exactly as you would an HTTP request body. A value that was valid when an earlier step
produced it may have been overwritten since.

Custom headers are a different trust boundary: they are authored in the BPMN model, so they
come from whoever can deploy a process rather than from whoever wrote a variable. That is
a much smaller set of people, but it is still server-supplied data arriving over the network,
so validate `job.custom_headers()` before acting on it too.

What the SDK does:

- **Deserialization is JSON-shaped.** Variables and custom headers arrive as
  `HashMap<String, serde_json::Value>`. `variables_as::<T>()` deserializes only into the
  type you name. There is no mechanism that instantiates an arbitrary type chosen by the
  payload — Rust has no pickling analogue here — so a payload cannot select what it is
  deserialized into.
- **Nesting depth is bounded at 128 levels.** That bound is `serde_json`'s default recursion
  limit, applied when the activation response is parsed, and it is what stops a deeply
  nested payload from recursing without bound. The SDK inherits it rather than choosing it.
- **Each job's variables are its own.** Every activated job is moved into its own handler
  task, so no variable map is shared or mutated across concurrently running jobs.
- **The SDK never logs the variable map.** Its log lines on the job path carry an error or a
  job type, never the payload. Note the limit of that guarantee: it covers the SDK logging
  variables _directly_, not every way variable-derived text can reach a diagnostic. A failed
  follow-up command is logged as `CamundaError::Api`, whose `Display` includes the server's
  response body; and a panicking handler is logged with its panic message, which is whatever
  the handler put there — an `expect` on a failed typed deserialization can include the
  rejected value. If your logs must not contain variable-derived text, keep it out of your
  panic messages and consider what your cluster echoes in error bodies.

What the SDK does **not** do:

- It enforces **no size limit of its own** on an activation response. Bound the payload at
  the source — fetch only the variables you need with
  `JobWorkerConfig::fetch_variables(["orderId", "amount"])`, and keep large data out of
  process variables.
- It does **not validate** variable contents: no schema, no range, no string-length check.
  A `String` variable may be empty, enormous, or hold markup, SQL or a path; a number may be
  any `f64`. Validate in your handler before acting on it.

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

The API clears a date with an empty string, while `null` or omitting it preserves the
value. The generated models that carry such dates (`models::JobResultCorrections`, and
`models::Changeset` for updating a user task) keep them typed as
`Option<Option<chrono::DateTime<FixedOffset>>>`: `None` preserves the value,
`Some(Some(date))` sets it, and `Some(None)` clears it and is sent as `""`. Each such model
has `clear_<field>()` and `is_<field>_cleared()` for this:

```rust
use camunda_orchestration_sdk::apis::user_task_api::UpdateUserTaskParams;
use camunda_orchestration_sdk::models::{Changeset, UserTaskUpdateRequest};

let mut changeset = Changeset::new();
changeset.clear_due_date(); // sent as "dueDate": ""
changeset.follow_up_date = Some(Some("2026-12-01T09:00:00+01:00".parse()?));

client
    .update_user_task(UpdateUserTaskParams {
        user_task_key,
        user_task_update_request: Some(UserTaskUpdateRequest {
            changeset: Some(Some(changeset)),
            ..UserTaskUpdateRequest::new()
        }),
    })
    .await?;
```

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
`adHocSubProcess`, on the wire). A hand-built `models::JobResult` is accepted too; clear
a date in it with `JobResultCorrections::clear_due_date()` /
`clear_follow_up_date()`.

> **Falcon command stream (nanobpmn gateways):** job results are sent over REST only. The
> Falcon command stream's completion frame has no field for a result, so when a worker is
> receiving jobs over the stream, a handler that returns a job result has its job
> **failed** (never completed — that would approve a denied task) with a message saying
> so. To use job results against a nanobpmn gateway, set `CAMUNDA_FORCE_REST=true` so
> workers use the REST transport. Against stock Camunda the stream is never used, so this
> does not apply.
