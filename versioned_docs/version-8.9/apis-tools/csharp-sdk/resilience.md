---
id: resilience
title: "Resilience"
sidebar_label: "Resilience"
sidebar_position: 8
mdx:
  format: md
---

# Resilience

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

## HTTP Retry

Automatic retry with exponential backoff and jitter for transient failures (429, 503, 500, timeouts).

| Variable                               | Default | Description                        |
| -------------------------------------- | ------- | ---------------------------------- |
| `CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS`  | `3`     | Total attempts (initial + retries) |
| `CAMUNDA_SDK_HTTP_RETRY_BASE_DELAY_MS` | `100`   | Base backoff delay (ms)            |
| `CAMUNDA_SDK_HTTP_RETRY_MAX_DELAY_MS`  | `2000`  | Maximum backoff cap (ms)           |

## Global Backpressure (Adaptive Concurrency)

The client includes an adaptive backpressure manager that throttles the number of in-flight operations when the cluster signals resource exhaustion. It complements (not replaces) per-request HTTP retry.

### Signals Considered

An HTTP response is treated as a backpressure signal when it matches one of:

- `429` (Too Many Requests) — always
- `503` with `title === "RESOURCE_EXHAUSTED"`
- `500` whose RFC 9457 / 7807 `detail` text contains `RESOURCE_EXHAUSTED`

All other 5xx variants are treated as non-retryable (fail fast) and do **not** influence the adaptive gate.

### How It Works

1. Normal state starts with the concurrency cap from `CAMUNDA_SDK_BACKPRESSURE_INITIAL_MAX` (default 16).
2. On backpressure signals the manager reduces available permits using the soft factor (70% by default).
3. Repeated consecutive signals escalate severity to `severe`, applying a stronger reduction factor (50%).
4. Successful (non-backpressure) completions trigger passive recovery checks that gradually restore permits over time if the system stays quiet.
5. Quiet periods (no signals for a configurable decay interval) downgrade severity and reset the consecutive counter.

The policy is intentionally conservative: it only engages after genuine pressure signals and recovers gradually to avoid oscillation.

### Configuration

| Variable                                        | Default    | Description                                             |
| ----------------------------------------------- | ---------- | ------------------------------------------------------- |
| `CAMUNDA_SDK_BACKPRESSURE_PROFILE`              | `BALANCED` | Preset profile (see below)                              |
| `CAMUNDA_SDK_BACKPRESSURE_INITIAL_MAX`          | `16`       | Bootstrap concurrency cap                               |
| `CAMUNDA_SDK_BACKPRESSURE_SOFT_FACTOR`          | `70`       | Percentage multiplier on soft backpressure (70 → 0.70×) |
| `CAMUNDA_SDK_BACKPRESSURE_SEVERE_FACTOR`        | `50`       | Percentage multiplier on severe backpressure            |
| `CAMUNDA_SDK_BACKPRESSURE_RECOVERY_INTERVAL_MS` | `1000`     | Interval between passive recovery checks (ms)           |
| `CAMUNDA_SDK_BACKPRESSURE_RECOVERY_STEP`        | `1`        | Permits regained per recovery interval                  |
| `CAMUNDA_SDK_BACKPRESSURE_DECAY_QUIET_MS`       | `2000`     | Quiet period to downgrade severity (ms)                 |
| `CAMUNDA_SDK_BACKPRESSURE_FLOOR`                | `1`        | Minimum concurrency floor while degraded                |
| `CAMUNDA_SDK_BACKPRESSURE_SEVERE_THRESHOLD`     | `3`        | Consecutive signals required to enter severe state      |

### Profiles

Profiles supply coordinated defaults. Any explicitly set env var overrides the profile value.

| Profile        | initialMax | softFactor% | severeFactor% | recoveryMs | recoveryStep | quietDecayMs | floor | severeThreshold | Use case                     |
| -------------- | ---------- | ----------- | ------------- | ---------- | ------------ | ------------ | ----- | --------------- | ---------------------------- |
| `BALANCED`     | 16         | 70          | 50            | 1000       | 1            | 2000         | 1     | 3               | General workloads            |
| `CONSERVATIVE` | 12         | 60          | 40            | 1200       | 1            | 2500         | 1     | 2               | Tighter capacity constraints |
| `AGGRESSIVE`   | 24         | 80          | 60            | 800        | 2            | 1500         | 2     | 4               | High throughput scenarios    |
| `LEGACY`       | —          | —           | —             | —          | —            | —            | —     | —               | Observe-only (no gating)     |

Select via environment:

```bash
CAMUNDA_SDK_BACKPRESSURE_PROFILE=AGGRESSIVE
```

Override individual knobs on top of a profile:

```bash
CAMUNDA_SDK_BACKPRESSURE_PROFILE=AGGRESSIVE
CAMUNDA_SDK_BACKPRESSURE_INITIAL_MAX=32
```

The `LEGACY` profile disables adaptive gating entirely — signals are still tracked for observability but no concurrency limits are applied. Use this to opt out of backpressure management while retaining per-request retry.

### Inspecting State Programmatically

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: BackpressureState -->

```csharp
var state = client.GetBackpressureState();
// state.Severity: "healthy", "soft", or "severe"
// state.Consecutive: consecutive backpressure signals observed
// state.PermitsMax: current concurrency cap (null when LEGACY / not engaged)
```

## Eventual Consistency

Built-in polling for eventually consistent endpoints with configurable wait times and predicates.
