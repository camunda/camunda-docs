---
id: reliability-convenience-features
title: "Reliability & convenience features"
sidebar_label: "Reliability & convenience features"
sidebar_position: 8
mdx:
  format: md
---

# Reliability & convenience features

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The runtime mirrors the JS/Python/C# SDKs:

- **Transient HTTP retry** — initiating operations retry `429`/`502`/`503`/`504` and network
  errors with full-jitter backoff (`CAMUNDA_SDK_HTTP_RETRY_*`). Drain operations are never
  retried blindly.
- **Eventual-consistency polling** — `client.eventual(opts, op)` / `eventual_until(opts, op,
predicate)` retry `404` reads (the symptom of replication lag) until consistent or the
  window elapses.
- **Mutual TLS** — client cert/key/CA from `CAMUNDA_MTLS_*` (inline PEM or file path).
- **OAuth disk token cache** — set `CAMUNDA_OAUTH_CACHE_DIR` to share tokens across processes
  (atomic write, namespaced per client/audience).
- **Default-tenant injection** — `CAMUNDA_DEFAULT_TENANT_ID` is applied automatically wherever
  a tenant is accepted.
- **Configurable logging** — `client.init_logging()` installs a `tracing` subscriber filtered
  to `CAMUNDA_SDK_LOG_LEVEL`.
- **Facade convenience methods** — `cancel_process_instance`, `get_process_instance`,
  `publish_message`, `correlate_message`, `broadcast_signal`, `evaluate_decision`,
  `search_variables` / `search_variables_as::<T>()`.
- **Worker lifecycle** — `client.spawn_worker(..)` registers managed workers;
  `running_workers()` lists them and `stop_all_workers().await` drains and stops them all
  gracefully. Per-worker control via the [`JobWorkerHandle`] returned from
  [`JobWorker::spawn`].
