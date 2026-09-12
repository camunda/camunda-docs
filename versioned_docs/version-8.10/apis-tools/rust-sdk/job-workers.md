---
id: job-workers
title: "Job workers"
sidebar_label: "Job workers"
sidebar_position: 9
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
- `JobAction::fail("message")` — fail the job (retries decremented by the engine).
- `JobAction::error("ERROR_CODE")` — throw a catchable BPMN error.
- `JobAction::leave()` — take no action; the job remains activated until timeout.

The `Job` exposes `key()`, `job_type()`, `process_instance_key()`, `variables()`, and
`variables_as::<T>()` for typed deserialization.

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
