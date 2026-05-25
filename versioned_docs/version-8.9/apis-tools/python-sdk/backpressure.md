---
id: backpressure
title: Backpressure
sidebar_label: Backpressure
sidebar_position: 14
mdx:
  format: md
---

# Backpressure

The SDK includes built-in adaptive backpressure management that protects the Camunda cluster from overload. When the cluster returns backpressure signals (HTTP 429, 503, or `RESOURCE_EXHAUSTED`), the SDK automatically reduces outbound concurrency. When conditions improve, it gradually recovers — returning to full throughput with no manual intervention.

This is enabled by default with the `BALANCED` profile and requires no configuration. Operations that drain work from the cluster (completing jobs, failing jobs) are never throttled.

| Profile              | Behavior                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `BALANCED` (default) | Adaptive concurrency gating with AIMD-style permit management and exponential backoff at floor. |
| `LEGACY`             | Observe-only — records severity but never gates or queues requests.                             |

Set the profile via the `CAMUNDA_SDK_BACKPRESSURE_PROFILE` environment variable.
