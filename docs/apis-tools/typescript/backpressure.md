---
id: backpressure
title: Manage backpressure with the TypeScript SDK
sidebar_label: Manage backpressure
description: Client-side adaptive backpressure
---

Learn how to manage backpressure with the TypeScript SDK.

## Manage backpressure

The Orchestration Cluster REST API client implements adaptive backpressure management.

- It automatically handles retries and backoff in response to backpressure signals from the server.
- The SDK applies global backpressure management to throttle operations when the server returns backpressure.

### Enable backpressure management

This behavior is controlled by the `CAMUNDA_SDK_BACKPRESSURE_PROFILE` environment variable and is enabled by default.

- When enabled, SDK calls do not fail when the server responds with a backpressure signal. Instead, the SDK retries these calls after an increasing backoff period. Additional SDK calls made during backpressure are delayed proactively rather than each needing to receive a backpressure signal.

- When a retried operation succeeds, the SDK reduces its internal backpressure status and removes throttling. This allows the SDK to match the server’s capacity and optimize throughput.

- This adaptive mechanism can lead to 2x–5x higher performance under load. See [Patterns to use today to make Camunda 8 apps even more reliable](https://www.camundacon.com/event-session/camundacon-new-york-2025/patterns-to-use-today-to-make-camunda-8-apps-even-more-reliable?on_demand=true) for a demonstration.

### Disable backpressure management

To disable SDK backpressure management and throw immediately when the server responds with a backpressure signal, set `CAMUNDA_SDK_BACKPRESSURE_PROFILE=LEGACY`.
