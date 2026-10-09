---
id: clocks
title: "Clocks"
sidebar_label: "Clocks"
sidebar_position: 11
mdx:
  format: md
---

# Clocks

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Every wait and every elapsed-time measurement in the runtime -- retry backoff, the
backpressure gate, token refresh, job-worker polling, eventual-consistency polling --
resolves through an injected clock rather than ambient time.

| Clock                                 | Use                                                                        |
| ------------------------------------- | -------------------------------------------------------------------------- |
| `LiveClock`                           | real time; the default when nothing is injected                            |
| `#[tokio::test(start_paused = true)]` | tests; tokio virtualises its own timer, so cadence settles without waiting |
| `EngineClock`                         | drives the Camunda engine's clock and the SDK's together                   |

`start_paused` is the lighter-weight option, but it only virtualises _tokio's_ timer -- the
engine carries on in real time. A test whose process only completes once a BPMN timer fires
needs `EngineClock`.

## Waiting inside a handler

A `Job` carries its worker's clock, so a handler that needs to wait can do it on the same
clock as everything else:

```rust
use camunda_orchestration_sdk::{CamundaClient, JobAction, JobWorkerConfig};
use std::time::Duration;

let client = CamundaClient::from_env()?;
client
    .create_job_worker(JobWorkerConfig::new("payment"))
    .run(|job| async move {
        // Short coordination only -- a business wait belongs in the process
        // as a BPMN timer event.
        job.clock().sleep(Duration::from_millis(500)).await;
        JobAction::complete()
    })
    .await?;
```

Keep those waits short -- spacing a retry, letting a resource settle. **A long or business
wait belongs in the process as a BPMN timer event, not in a handler.** A handler that sleeps
for minutes holds a worker slot for the duration, risks the job timeout expiring underneath
it, and hides the delay from the process model, where it would otherwise be visible and
changeable without a redeploy.

## Driving the engine's clock

`EngineClock` pins the engine's clock instead of passing time locally:

```rust
use camunda_orchestration_sdk::{CamundaClient, CamundaOptions, Clock, EngineClock};
use std::sync::Arc;

// The control client issues the pin requests, and keeps real time itself.
let control = CamundaClient::from_env()?;
let clock: Arc<dyn Clock> = Arc::new(EngineClock::new(Arc::new(control)));

// Anything this client waits on now advances the engine instead of real time.
let client = CamundaClient::new(CamundaOptions::new().with_clock(clock))?;
```

A wait now moves the engine forward and reports the new instant, so the SDK and the engine
agree on what time it is. Overlapping waits settle at a single instant rather than summing:
ten concurrent one-second waits advance the engine by one second, not ten. `pin_to` and
`reset` are available directly for tests that need to move the engine without waiting.

Clock pinning is an alpha engine endpoint, intended for tests rather than production
clusters. Pass the control client the pin requests should travel on -- it keeps real time,
so the requests themselves are unaffected by the pinning.

## Writing your own

`Clock` is a public trait (`now`, `now_wall`, `sleep`); implement it and pass it to
`CamundaOptions::with_clock`. `ClockController` is the engine-side half, if you want
`EngineClock` to drive something other than a `CamundaClient`.

Ambient time is banned in the runtime by `clippy.toml` -- `Instant::now`, `SystemTime::now`,
`tokio::time::sleep` and friends -- so cadence cannot quietly drift back onto real time.
