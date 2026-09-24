---
title: "Runtime"
sidebar_label: "Runtime"
mdx:
  format: md
---

# Runtime

Error types returned by every SDK call, and the adaptive backpressure manager that paces requests when the cluster pushes back.

## BackpressureManager

Adaptive backpressure manager shared (via `Arc`) by an SDK client and all its clones.

Initiating operations call `acquire` before issuing a request and
`release` afterwards, recording the outcome with
`record_healthy_hint` on success or
`record_backpressure` on a backpressure signal. Drain
operations (job completion / failure) bypass the gate entirely.

### Methods

| Method                | Description                                                                     |
| --------------------- | ------------------------------------------------------------------------------- |
| `acquire`             | Acquire a permit, awaiting until one is available.                              |
| `new`                 | Create a manager for the given profile, resolving its cadence through `clock`.  |
| `record_backpressure` | Record a backpressure signal from the server.                                   |
| `record_healthy_hint` | Record a successful (non-backpressure) completion, triggering passive recovery. |
| `release`             | Release a permit and wake one waiter. In the `Legacy` profile this is a no-op.  |
| `severity`            | The current severity level.                                                     |
| `state`               | A snapshot of the manager's internal state, for observability.                  |

## BackpressureProfile

Backpressure tuning profile, configured via `CAMUNDA_SDK_BACKPRESSURE_PROFILE`.

### Variants

| Variant    | Payload | Description                                           |
| ---------- | ------- | ----------------------------------------------------- |
| `Balanced` | —       | Adaptive global concurrency control (default).        |
| `Legacy`   | —       | Observe-only: record signals but never gate requests. |

## BackpressureSeverity

Backpressure severity level reported by the manager.

### Variants

| Variant   | Payload | Description                                    |
| --------- | ------- | ---------------------------------------------- |
| `Healthy` | —       | No recent backpressure.                        |
| `Soft`    | —       | Backpressure observed; mild throttling.        |
| `Severe`  | —       | Sustained backpressure; aggressive throttling. |

## BackpressureState

A point-in-time snapshot of the manager's internal state, for observability.

### Fields

| Field             | Type                   | Description                                                    |
| ----------------- | ---------------------- | -------------------------------------------------------------- |
| `severity`        | `BackpressureSeverity` | Current severity level.                                        |
| `consecutive`     | `u32`                  | Consecutive backpressure signals since the last healthy decay. |
| `permits_max`     | `Option<u32>`          | Current permit cap, or `None` when unlimited.                  |
| `permits_current` | `u32`                  | Permits currently held.                                        |
| `waiters`         | `u32`                  | Number of callers queued waiting for a permit.                 |
| `backoff_ms`      | `u64`                  | Current backoff-at-floor delay in milliseconds.                |

## CamundaError

Errors returned by the Camunda SDK.

### Variants

| Variant                      | Payload                                 | Description                                                                                                               |
| ---------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `Config`                     | `(String)`                              | Configuration was invalid or incomplete (e.g. missing OAuth credentials).                                                 |
| `Auth`                       | `(String)`                              | Failed to obtain or refresh an authentication token.                                                                      |
| `Network`                    | `(Error)`                               | A network-level failure occurred (connection, TLS, timeout).                                                              |
| `Io`                         | `(Error)`                               | An I/O failure occurred (e.g. while streaming a multipart upload).                                                        |
| `Api`                        | `{ status: u16, body: Option<String> }` | The server returned a non-success HTTP status.                                                                            |
| `Serialization`              | `(Error)`                               | A response payload could not be (de)serialized.                                                                           |
| `Validation`                 | `(String)`                              | A domain-type or input constraint was violated before sending the request.                                                |
| `Backpressure`               | `(String)`                              | The client-side backpressure controller rejected the request to avoid unbounded memory growth (waiter queue at capacity). |
| `EventualConsistencyTimeout` | `{ elapsed_ms: u64 }`                   | An eventual-consistency polling helper timed out before its predicate was met.                                            |

### Methods

| Method   | Description                                                   |
| -------- | ------------------------------------------------------------- |
| `status` | The HTTP status code, if this is a `CamundaError::Api` error. |

## Clock

Time and waiting, as the SDK runtime sees them.

Implementations must be cheap to clone behind an `Arc` and safe to share across tasks
and threads.

### Methods

| Method     | Description                                                      |
| ---------- | ---------------------------------------------------------------- |
| `now`      | A monotonic reading, for deadlines and elapsed-time measurement. |
| `now_wall` | A wall-clock reading, for state that outlives the process.       |
| `sleep`    | Wait for `duration`.                                             |

## ClockController

The engine-side clock an `EngineClock` drives.

Implemented for `CamundaClient` in terms of the
`PUT /clock` and `POST /clock/reset` endpoints. It exists as a trait so the pin
semantics can be tested without a running engine.

### Methods

| Method  | Description                                                         |
| ------- | ------------------------------------------------------------------- |
| `pin`   | Pin the engine clock to an absolute instant, in epoch milliseconds. |
| `reset` | Return the engine clock to real time.                               |

## EngineClock

A clock bound to the engine's own clock.

A wait does not pass time locally -- it moves the _engine_ forward and reports the new
instant. Process instances, timers and the SDK therefore agree on what time it is,
which a purely local test clock cannot achieve.

```rust
let control = CamundaClient::from_env()?;
let clock: Arc<dyn Clock> = Arc::new(EngineClock::new(Arc::new(control)));

// Anything the SDK waits on now advances the engine instead of real time.
let client = CamundaClient::new(CamundaOptions::new().with_clock(clock))?;
```

A wait resolves against an instant read before the engine is contacted, so waits
that overlap -- those that read the clock before any of them lands -- settle at a
single instant instead of summing. A wait that begins after an earlier one has
landed reads the new time and composes from it, which is the intended behaviour: it
really did start later.

### Methods

| Method      | Description                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `is_pinned` | Whether the engine clock is currently pinned by this clock.                                                                  |
| `new`       | Bind to an engine. The clock starts unpinned, following real time until the first wait or `pin_to`.                          |
| `pin_to`    | Move the engine clock to an absolute instant, in epoch milliseconds.                                                         |
| `reset`     | Return the engine to real time. Readings follow live time again afterwards, rather than freezing at the last pinned instant. |

## LiveClock

Real time.

`now` and `sleep` are both tokio's, so they share one timeline: under
`#[tokio::test(start_paused = true)]` this clock is already virtual, and a poll loop
settles without waiting. That covers cadence in tests; it does not bind the engine's
clock, which is what an engine-bound implementation is for.

## Result

Convenience alias used throughout the SDK.

```rust
pub type Result<T> = std::result::Result<T, CamundaError>;
```
