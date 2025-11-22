---
id: backpressure
title: Manage backpressure using the TypeScript SDK
description: Client-side adaptive backpressure
---

Learn how to manage backpressure using the TypeScript SDK.

## Backpressure management

The Orchestration Cluster (REST) API client implements adaptive backpressure management, intelligently managing retry and backoff in response to the backpressure signal from the server. The SDK uses global backpressure management to throttle operations when the server is responding with backpressure.

This behavior is controlled by the `CAMUNDA_SDK_BACKPRESSURE_PROFILE` environment variable, and is enabled by default.

When enabled, SDK calls do not fail when the server responds with a backpressure signal. Rather, they are retried after an increasing back off period. Further SDK calls during server backpressure are delayed, rather than needing to receive the backpressure signal. When a retried operation succeeds, the backpressure status of the SDK is downgraded, and the throttling is released. This allows the SDK to match the performance envelope of the server and optimise throughput. This adaptive mechanism leads to up to 2x-5x higher performance under load. See [this presentation](https://www.camundacon.com/event-session/camundacon-new-york-2025/patterns-to-use-today-to-make-camunda-8-apps-even-more-reliable?on_demand=true) for a demonstration.

To disable SDK backpressure management and throw immediately when the server responds with a backpressure signal, set `CAMUNDA_SDK_BACKPRESSURE_PROFILE=LEGACY`.
