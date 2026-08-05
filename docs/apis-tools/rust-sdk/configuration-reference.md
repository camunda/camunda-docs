---
id: configuration-reference
title: "Configuration reference"
sidebar_label: "Configuration reference"
sidebar_position: 6
mdx:
  format: md
---

# Configuration reference

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

| Variable                                                                       | Purpose                                                                                                                                                        |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CAMUNDA_REST_ADDRESS`                                                         | Base cluster address. `/v2` is appended automatically.                                                                                                         |
| `ZEEBE_REST_ADDRESS`                                                           | Alias for `CAMUNDA_REST_ADDRESS`.                                                                                                                              |
| `CAMUNDA_AUTH_STRATEGY`                                                        | `OAUTH` \| `BASIC` \| `NONE`.                                                                                                                                  |
| `CAMUNDA_CLIENT_ID` / `CAMUNDA_CLIENT_SECRET`                                  | OAuth client credentials.                                                                                                                                      |
| `CAMUNDA_OAUTH_URL`                                                            | OAuth token endpoint.                                                                                                                                          |
| `CAMUNDA_TOKEN_AUDIENCE`                                                       | OAuth `audience` parameter.                                                                                                                                    |
| `CAMUNDA_OAUTH_SCOPE`                                                          | OAuth `scope` parameter.                                                                                                                                       |
| `CAMUNDA_BASIC_AUTH_USERNAME` / `CAMUNDA_BASIC_AUTH_PASSWORD`                  | Basic-auth credentials.                                                                                                                                        |
| `CAMUNDA_DEFAULT_TENANT_ID`                                                    | Default tenant id (alias `CAMUNDA_TENANT_ID`). Injected into deploys, instance creation, messages, signals, decisions, and worker activation when none is set. |
| `CAMUNDA_SDK_BACKPRESSURE_PROFILE`                                             | Adaptive backpressure profile: `BALANCED` (default, adaptive gating) or `LEGACY` (observe-only, no gating).                                                    |
| `CAMUNDA_OAUTH_CACHE_DIR`                                                      | Directory for the cross-process OAuth token cache. Unset disables disk caching (in-memory only).                                                               |
| `CAMUNDA_SDK_LOG_LEVEL`                                                        | SDK log level for `CamundaClient::init_logging`: `OFF` \| `ERROR` \| `WARN` \| `INFO` (default) \| `DEBUG` \| `TRACE`.                                         |
| `CAMUNDA_SDK_EVENTUAL_POLL_DEFAULT_MS`                                         | Default timeout for `CamundaClient::eventual` consistency polling (default `10000`).                                                                           |
| `CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS`                                          | Max attempts for transient-error retry of initiating operations (default `4`; `1` disables retry).                                                             |
| `CAMUNDA_SDK_HTTP_RETRY_BASE_DELAY_MS` / `CAMUNDA_SDK_HTTP_RETRY_MAX_DELAY_MS` | Full-jitter backoff bounds for HTTP retry (defaults `250` / `5000`).                                                                                           |
| `CAMUNDA_MTLS_CERT` / `CAMUNDA_MTLS_CERT_PATH`                                 | Client certificate (inline PEM or file path) for mutual TLS.                                                                                                   |
| `CAMUNDA_MTLS_KEY` / `CAMUNDA_MTLS_KEY_PATH`                                   | Client private key (inline PEM or file path) for mutual TLS.                                                                                                   |
| `CAMUNDA_MTLS_CA` / `CAMUNDA_MTLS_CA_PATH`                                     | Additional CA root (inline PEM or file path) to trust.                                                                                                         |
| `CAMUNDA_MTLS_KEY_PASSPHRASE`                                                  | Passphrase for an encrypted client key (not supported by the default `native-tls` backend; errors clearly if set).                                             |
| `CAMUNDA_WORKER_NAME`                                                          | Default worker name for `CamundaClient::worker_config`.                                                                                                        |
| `CAMUNDA_WORKER_MAX_CONCURRENT_JOBS`                                           | Default max concurrent jobs per worker.                                                                                                                        |
| `CAMUNDA_WORKER_TIMEOUT` / `CAMUNDA_WORKER_REQUEST_TIMEOUT`                    | Default job-activation and long-poll timeouts (ms).                                                                                                            |
| `CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS`                                    | Max random startup delay before a worker's first poll, to spread activation stampedes.                                                                         |
