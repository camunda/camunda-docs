---
title: "Configuration"
sidebar_label: "Configuration"
mdx:
  format: md
---

# Configuration

Configuration is resolved from explicit options first, then environment variables, then built-in defaults.

## AuthStrategy

Authentication strategy.

### Variants

| Variant | Payload | Description                         |
| ------- | ------- | ----------------------------------- |
| `OAuth` | —       | OAuth 2.0 client-credentials grant. |
| `Basic` | —       | HTTP Basic authentication.          |
| `None`  | —       | No authentication.                  |

## Authentication

Resolves and applies authentication to outgoing requests.

Cloning an `Authentication` shares the same underlying OAuth token cache.

### Methods

| Method        | Description                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `apply`       | Apply authentication to a generated-client `Configuration`, refreshing the OAuth token if necessary. |
| `from_config` | Build an `Authentication` from resolved configuration.                                               |
| `strategy`    | The configured strategy.                                                                             |

## CamundaConfig

Resolved SDK configuration.

### Fields

| Field                      | Type                  | Description                                                                                                                                                                                      |
| -------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `rest_address`             | `String`              | Base REST address of the Orchestration Cluster, including the `/v2` suffix.                                                                                                                      |
| `auth_strategy`            | `AuthStrategy`        | Authentication strategy.                                                                                                                                                                         |
| `client_id`                | `Option<String>`      | OAuth 2.0 client id (client-credentials grant).                                                                                                                                                  |
| `client_secret`            | `Option<String>`      | OAuth 2.0 client secret.                                                                                                                                                                         |
| `oauth_url`                | `Option<String>`      | OAuth 2.0 token endpoint URL.                                                                                                                                                                    |
| `token_audience`           | `Option<String>`      | OAuth token audience (sent as the `audience` form parameter).                                                                                                                                    |
| `oauth_scope`              | `Option<String>`      | OAuth scope (optional).                                                                                                                                                                          |
| `oauth_cache_dir`          | `Option<String>`      | Directory for the on-disk OAuth token cache (`CAMUNDA_OAUTH_CACHE_DIR`). When set, fetched tokens are persisted so they survive process restarts.                                                |
| `basic_auth_username`      | `Option<String>`      | Basic-auth username.                                                                                                                                                                             |
| `basic_auth_password`      | `Option<String>`      | Basic-auth password.                                                                                                                                                                             |
| `default_tenant_id`        | `Option<String>`      | Default tenant id applied to operations that accept one.                                                                                                                                         |
| `backpressure_profile`     | `BackpressureProfile` | Adaptive backpressure profile (`CAMUNDA_SDK_BACKPRESSURE_PROFILE`).                                                                                                                              |
| `log_level`                | `LogLevel`            | SDK log level (`CAMUNDA_SDK_LOG_LEVEL`).                                                                                                                                                         |
| `eventual_poll_default_ms` | `u64`                 | Default per-operation timeout, in milliseconds, for eventual-consistency polling helpers (`CAMUNDA_SDK_EVENTUAL_POLL_DEFAULT_MS`).                                                               |
| `retry`                    | `RetryConfig`         | Transient-error HTTP retry policy.                                                                                                                                                               |
| `tls`                      | `TlsConfig`           | TLS / mutual-TLS configuration.                                                                                                                                                                  |
| `worker_defaults`          | `WorkerDefaults`      | Default job-worker settings sourced from `CAMUNDA_WORKER_*`.                                                                                                                                     |
| `falcon`                   | `bool`                | Whether to upgrade to the nanobpmn command-stream transport when the gateway advertises it (`CAMUNDA_FALCON`, default on). When off, the SDK stays on pure REST even against a nanobpmn gateway. |

### Methods

| Method                    | Description                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------- |
| `from_env`                | Resolve configuration from process environment variables.                             |
| `from_env_with_overrides` | Resolve configuration from environment variables, with `overrides` taking precedence. |

## ConsistencyOptions

Options controlling an eventual-consistency poll.

### Fields

| Field             | Type               | Description                                                                                                                            |
| ----------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `timeout`         | `Option<Duration>` | Maximum time to keep polling before giving up. `None` uses the SDK default (`CAMUNDA_SDK_EVENTUAL_POLL_DEFAULT_MS`).                   |
| `interval`        | `Duration`         | Delay between polling attempts.                                                                                                        |
| `retry_not_found` | `bool`             | Treat a `404` (not-found) result as "not yet consistent" and keep polling, rather than failing. Useful right after creating an entity. |

### Methods

| Method            | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `interval`        | Set the delay between polling attempts.                          |
| `retry_not_found` | Whether to treat `404` as "not yet consistent" (default `true`). |
| `timeout`         | Set an explicit overall timeout.                                 |

## LogLevel

SDK log level, controlling the verbosity of the SDK's structured logging.

### Variants

| Variant | Payload | Description               |
| ------- | ------- | ------------------------- |
| `Off`   | —       | Suppress all SDK logging. |
| `Error` | —       |                           |
| `Warn`  | —       |                           |
| `Info`  | —       |                           |
| `Debug` | —       |                           |
| `Trace` | —       |                           |

### Methods

| Method       | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `to_tracing` | The matching `tracing::Level`, or `None` when logging is off. |

## RetryConfig

Transient-error HTTP retry policy (`CAMUNDA_SDK_HTTP_RETRY_*`).

Initiating operations that fail with a retryable signal (HTTP 429/503, or a network
error) are retried with exponential backoff and full jitter.

### Fields

| Field           | Type  | Description                                      |
| --------------- | ----- | ------------------------------------------------ |
| `max_attempts`  | `u32` | Maximum number of attempts (1 disables retries). |
| `base_delay_ms` | `u64` | Base backoff delay, in milliseconds.             |
| `max_delay_ms`  | `u64` | Maximum backoff delay, in milliseconds.          |

## TlsConfig

TLS / mutual-TLS configuration (`CAMUNDA_MTLS_*`).

A client certificate (`cert` + `key`) enables mutual TLS; a `ca` enables trusting a
private certificate authority. Inline PEM values take precedence over the `*_path`
file locations.

### Fields

| Field            | Type             | Description                                                             |
| ---------------- | ---------------- | ----------------------------------------------------------------------- |
| `cert`           | `Option<String>` | Inline client-certificate PEM (`CAMUNDA_MTLS_CERT`).                    |
| `key`            | `Option<String>` | Inline client-key PEM (`CAMUNDA_MTLS_KEY`).                             |
| `ca`             | `Option<String>` | Inline CA-certificate PEM (`CAMUNDA_MTLS_CA`).                          |
| `cert_path`      | `Option<String>` | Path to a client-certificate PEM (`CAMUNDA_MTLS_CERT_PATH`).            |
| `key_path`       | `Option<String>` | Path to a client-key PEM (`CAMUNDA_MTLS_KEY_PATH`).                     |
| `ca_path`        | `Option<String>` | Path to a CA-certificate PEM (`CAMUNDA_MTLS_CA_PATH`).                  |
| `key_passphrase` | `Option<String>` | Passphrase for an encrypted client key (`CAMUNDA_MTLS_KEY_PASSPHRASE`). |

### Methods

| Method          | Description                                   |
| --------------- | --------------------------------------------- |
| `is_configured` | Whether any TLS material has been configured. |

## WorkerDefaults

Default job-worker settings sourced from `CAMUNDA_WORKER_*`. Used to seed
`JobWorkerConfig` defaults.

### Fields

| Field                        | Type     | Description                                                                             |
| ---------------------------- | -------- | --------------------------------------------------------------------------------------- |
| `timeout_ms`                 | `i64`    | Job activation timeout, in milliseconds (`CAMUNDA_WORKER_TIMEOUT`).                     |
| `max_concurrent_jobs`        | `i32`    | Maximum concurrent jobs per worker (`CAMUNDA_WORKER_MAX_CONCURRENT_JOBS`).              |
| `request_timeout_ms`         | `i64`    | Long-poll request timeout, in milliseconds (`CAMUNDA_WORKER_REQUEST_TIMEOUT`).          |
| `name`                       | `String` | Worker name reported to the engine (`CAMUNDA_WORKER_NAME`).                             |
| `startup_jitter_max_seconds` | `u64`    | Maximum random startup delay, in seconds (`CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS`). |
