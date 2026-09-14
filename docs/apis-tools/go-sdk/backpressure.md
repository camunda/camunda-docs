---
id: backpressure
title: "Backpressure"
sidebar_label: "Backpressure"
sidebar_position: 11
mdx:
  format: md
---

# Backpressure

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

A Camunda broker sheds load by rejecting commands (HTTP 429 / 503,
`RESOURCE_EXHAUSTED`). Rather than surfacing those to your code as a wall of
errors, the SDK gates outbound requests through an AIMD concurrency limiter —
the same additive-increase/multiplicative-decrease shape TCP uses. Throughput
rises while the cluster is healthy and backs off the moment it pushes back, so a
burst queues client-side instead of being shed:

```go
// BALANCED (the default) gates outbound requests through an AIMD concurrency
// limiter that reacts to broker backpressure (HTTP 429/503). LEGACY observes
// and reports, but never gates — use it to compare against older SDKs.
client, err := camunda.New(
	camunda.WithBackpressureProfile(camunda.ProfileLegacy),
)
```

`BALANCED` is the default and is what you want in production. `LEGACY` keeps the
controller's observability but never gates, which is useful when comparing
behavior against an older SDK or when an external system already governs
concurrency.
