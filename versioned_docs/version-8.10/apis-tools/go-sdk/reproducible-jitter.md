---
id: reproducible-jitter
title: "Reproducible jitter"
sidebar_label: "Reproducible jitter"
sidebar_position: 15
mdx:
  format: md
---

# Reproducible jitter

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Retry backoff, worker startup delay (`CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS`) and
FALCON endpoint selection draw from an injected `Random` rather than `math/rand`. The
default, `LiveRandom`, is the process-wide generator. A `SeededRandom` replays the same
sequence for the same seed, so a test can assert the exact delays the SDK schedules
instead of a range:

```go
// Seeds from CAMUNDA_TEST_SEED when it is set, otherwise from a fresh seed.
random, err := camunda.SeededRandomFromEnv()
if err != nil {
	return err
}
// Log the source: it names the seed and how to replay this run.
fmt.Println(random) // SeededRandom(seed=...; replay with CAMUNDA_TEST_SEED=...)

client, err := camunda.New(camunda.WithRandom(random))
```

The seeded generator is specified across the Camunda SDKs, so one seed produces the
same draws in every language. A worker draws its startup delay when it is built, not
when `Run` starts, so the delays follow construction order however the goroutines are
scheduled.

`math/rand` is banned in the runtime by `.golangci.yml`, alongside ambient time.
