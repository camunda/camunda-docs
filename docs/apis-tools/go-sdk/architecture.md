---
id: architecture
title: "Architecture"
sidebar_label: "Architecture"
sidebar_position: 2
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
- **FALCON command stream** — an opt-in upgrade for
  [nanobpmn](https://github.com/jwulf/nano-bpm) gateways (an API/behaviour superset
  of Camunda 8). The gateway is probed once via `GET /v2/topology`; when it
  advertises the command stream, `CreateProcessInstance` is routed over a
  credit-metered WebSocket (a flood of creates queues on the submission-credit
  window instead of being shed with 503s) and `NewJobWorker` receives _pushed_
  jobs over the same stream instead of long-polling. The link fails over across
  cluster nodes and supports both `ws://` and `wss://` (deriving TLS from the
  cluster address). Against stock Camunda — or if the stream cannot be established
  — the SDK stays on its byte-identical REST path. Enabled by default; disable with
  `CAMUNDA_FALCON=false` / `WithFalcon(false)`, or force pure REST (e.g. behind a
  WebSocket-blocking proxy) with `CAMUNDA_FORCE_REST=1` / `WithForceREST(true)`.
