---
id: backpressure
title: "Backpressure"
sidebar_label: "Backpressure"
sidebar_position: 7
mdx:
  format: md
---

# Backpressure

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The client includes an adaptive global backpressure controller, mirroring the JS/Python
SDKs. Initiating operations (`create_process_instance`, `activate_jobs`, `deploy_resources`,
`topology`) pass through an AIMD-style concurrency gate that reacts to cluster backpressure
signals (HTTP `429` / `503` / `RESOURCE_EXHAUSTED`):

- Starts **unlimited**; on the first backpressure signal it boots to an initial permit cap
  and shrinks multiplicatively (soft ×0.70, severe ×0.50 after 3 consecutive signals) down
  to a floor of 1, with an escalating 25 ms → 2 s backoff while stuck at the floor.
- Recovers when quiet: additive growth while unhealthy, then multiplicative growth while
  healthy, returning to unlimited after a sustained-healthy period.
- **Drain operations** (`complete_job`, `fail_job`, `throw_job_error`) bypass the gate so
  in-flight work always drains, even while new load is being shed.

Set `CAMUNDA_SDK_BACKPRESSURE_PROFILE=LEGACY` to observe signals without gating. Inspect the
live state via `CamundaClient::backpressure_state`.
