---
id: architecture
title: "Architecture"
sidebar_label: "Architecture"
sidebar_position: 4
mdx:
  format: md
---

# Architecture

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

```
OpenAPI spec ──▶ openapi-generator ──▶ client/  (generated REST client, never hand-edited)
gateway.proto ──▶ buf              ──▶ pb/      (generated gRPC stubs, never hand-edited)
                                          │
                     ergonomic runtime ───┤  config · auth · backpressure · retry ·
                     (hand-written)        │  eventual consistency · job workers
                                          ▼
                                   CamundaClient  (the facade you use)
```

Cross-cutting concerns are implemented as a composable `http.RoundTripper` chain
(`backpressure → retry → auth → base`) injected into the generated client, so the
generated code stays pure and regenerable.

- **Configuration** — resolved from `CAMUNDA_*` environment variables (with
  `ZEEBE_*` fallbacks) and overridable via functional options. Validated
  fail-fast at construction.
- **Authentication** — OAuth 2.0 client-credentials (with in-memory + on-disk
  token cache), HTTP Basic, or None.
- **Adaptive backpressure** — an AIMD concurrency limiter that reacts to broker
  backpressure (HTTP 429 / 503 / `RESOURCE_EXHAUSTED`). `BALANCED` (default) gates;
  `LEGACY` observes only.
- **Transient retry** — exponential backoff with full jitter on 429/502/503/504
  and network errors.
- **Job workers** — a REST activate-jobs worker (`NewJobWorker`) and a gRPC
  `StreamActivatedJobs` streaming worker (`NewStreamJobWorker`). Both share one
  `JobHandler` contract: returning variables completes the job, returning a
  `*BpmnError` throws a BPMN error, and returning any other error fails the job
  (decrementing its retries). The streaming worker also runs a low-frequency REST
  sidecar poll (a safety net for jobs re-queued after a timeout or a brief
  reconnect); poll-activated jobs are acknowledged over REST, streamed jobs over
  gRPC. Set `WithStreamPollInterval` to tune or disable it.
