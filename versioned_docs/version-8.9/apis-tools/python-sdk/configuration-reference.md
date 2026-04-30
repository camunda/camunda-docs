---
id: configuration-reference
title: Configuration reference
sidebar_label: Configuration reference
sidebar_position: 15
mdx:
  format: md
---

# Configuration reference

All `CAMUNDA_*` environment variables recognised by the SDK. These can also be passed as keys in the `configuration={...}` dict.

<!-- BEGIN_CONFIG_REFERENCE -->

| Variable                                    | Default                                      | Description                                                                                    |
| ------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `ZEEBE_REST_ADDRESS`                        | `http://localhost:8080/v2`                   | REST API base URL (alias for CAMUNDA_REST_ADDRESS).                                            |
| `CAMUNDA_REST_ADDRESS`                      | `http://localhost:8080/v2`                   | REST API base URL. `/v2` is appended automatically if missing.                                 |
| `CAMUNDA_TOKEN_AUDIENCE`                    | `zeebe.camunda.io`                           | OAuth token audience.                                                                          |
| `CAMUNDA_OAUTH_URL`                         | `https://login.cloud.camunda.io/oauth/token` | OAuth token endpoint URL.                                                                      |
| `CAMUNDA_CLIENT_ID`                         | —                                            | OAuth client ID.                                                                               |
| `CAMUNDA_CLIENT_SECRET`                     | —                                            | OAuth client secret.                                                                           |
| `CAMUNDA_CLIENT_AUTH_CLIENTID`              | —                                            | Alias for CAMUNDA_CLIENT_ID.                                                                   |
| `CAMUNDA_CLIENT_AUTH_CLIENTSECRET`          | —                                            | Alias for CAMUNDA_CLIENT_SECRET.                                                               |
| `CAMUNDA_AUTH_STRATEGY`                     | `NONE`                                       | Authentication strategy: NONE, OAUTH, or BASIC. Auto-inferred from credentials if omitted.     |
| `CAMUNDA_BASIC_AUTH_USERNAME`               | —                                            | Basic auth username. Required when CAMUNDA_AUTH_STRATEGY=BASIC.                                |
| `CAMUNDA_BASIC_AUTH_PASSWORD`               | —                                            | Basic auth password. Required when CAMUNDA_AUTH_STRATEGY=BASIC.                                |
| `CAMUNDA_SDK_LOG_LEVEL`                     | `error`                                      | SDK log level: silent, error, warn, info, debug, trace, or silly.                              |
| `CAMUNDA_TOKEN_CACHE_DIR`                   | —                                            | Directory for OAuth token disk cache. Disabled if unset.                                       |
| `CAMUNDA_TOKEN_DISK_CACHE_DISABLE`          | `false`                                      | Disable OAuth token disk caching.                                                              |
| `CAMUNDA_SDK_BACKPRESSURE_PROFILE`          | `BALANCED`                                   | Backpressure profile: BALANCED (adaptive gating, default) or LEGACY (observe-only, no gating). |
| `CAMUNDA_TENANT_ID`                         | —                                            | Default tenant ID applied to all operations that accept a tenant_id parameter.                 |
| `CAMUNDA_WORKER_TIMEOUT`                    | —                                            | Default job timeout in milliseconds for all workers.                                           |
| `CAMUNDA_WORKER_MAX_CONCURRENT_JOBS`        | —                                            | Default maximum concurrent jobs per worker.                                                    |
| `CAMUNDA_WORKER_REQUEST_TIMEOUT`            | —                                            | Default long-poll request timeout in milliseconds for all workers.                             |
| `CAMUNDA_WORKER_NAME`                       | —                                            | Default worker name for all workers.                                                           |
| `CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS` | —                                            | Default maximum startup jitter in seconds for all workers.                                     |
| `CAMUNDA_MTLS_CERT_PATH`                    | —                                            | Path to client certificate (PEM) for mTLS.                                                     |
| `CAMUNDA_MTLS_KEY_PATH`                     | —                                            | Path to client private key (PEM) for mTLS.                                                     |
| `CAMUNDA_MTLS_CA_PATH`                      | —                                            | Path to CA certificate bundle (PEM) for mTLS. Optional.                                        |
| `CAMUNDA_MTLS_CERT`                         | —                                            | Inline PEM client certificate. Overrides CAMUNDA_MTLS_CERT_PATH.                               |
| `CAMUNDA_MTLS_KEY`                          | —                                            | Inline PEM client private key. Overrides CAMUNDA_MTLS_KEY_PATH.                                |
| `CAMUNDA_MTLS_CA`                           | —                                            | Inline PEM CA bundle. Overrides CAMUNDA_MTLS_CA_PATH.                                          |
| `CAMUNDA_MTLS_KEY_PASSPHRASE`               | —                                            | Passphrase for encrypted private key.                                                          |
| `CAMUNDA_LOAD_ENVFILE`                      | —                                            | Load configuration from a `.env` file. Set to `true` (or a file path).                         |

<!-- END_CONFIG_REFERENCE -->
