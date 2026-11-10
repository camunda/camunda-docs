---
id: reproducible-jitter
title: "Reproducible jitter"
sidebar_label: "Reproducible jitter"
sidebar_position: 13
mdx:
  format: md
---

# Reproducible jitter

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Retry backoff, worker startup delay (`CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS`) and
FALCON endpoint selection draw from an injected `Random` rather than an ambient generator.
The default, `LiveRandom`, is seeded once per process from OS entropy. A `SeededRandom`
replays the same sequence for the same seed, so a test can assert the exact delays the SDK
schedules instead of a range:

```rust
use camunda_orchestration_sdk::{CamundaClient, CamundaOptions, SeededRandom};
use std::sync::Arc;

// Seeds from CAMUNDA_TEST_SEED when it is set, otherwise from a fresh seed.
let random = Arc::new(SeededRandom::from_env()?);
// Log the source: it names the seed and how to replay this run.
println!("{random}"); // SeededRandom(seed=...; replay with CAMUNDA_TEST_SEED=...)

let client = CamundaClient::new(CamundaOptions::new().with_random(random))?;
```

The seeded generator is specified across the Camunda SDKs, so one seed produces the same
draws in every language. A worker draws its startup delay when it is started (`run`,
`start` or `spawn`), not when its task first runs, so workers started in sequence draw in
that order however the runtime schedules them.

`std::hash::RandomState`, the only entropy std exposes, is banned in the runtime by
`clippy.toml` outside the `LiveRandom` adapter.
