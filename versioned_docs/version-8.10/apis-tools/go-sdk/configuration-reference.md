---
id: configuration-reference
title: "Configuration reference"
sidebar_label: "Configuration reference"
sidebar_position: 7
mdx:
  format: md
---

# Configuration reference

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

`CAMUNDA_*` variables are canonical; the `ZEEBE_*` names are accepted as
fallbacks for compatibility with older tooling. Functional options take
precedence over both.

## Connection

| Variable                                          | Default                 | Description                                                            |
| ------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| `CAMUNDA_REST_ADDRESS` / `ZEEBE_REST_ADDRESS`     | `http://localhost:8080` | Orchestration Cluster REST base address.                               |
| `CAMUNDA_GRPC_ADDRESS` / `ZEEBE_GRPC_ADDRESS`     | `localhost:26500`       | Zeebe gRPC gateway address (`host:port`) for the streaming job worker. |
| `CAMUNDA_DEFAULT_TENANT_ID` / `CAMUNDA_TENANT_ID` | —                       | Default tenant id applied to operations that accept one.               |

## Authentication

| Variable                                               | Default  | Description                                                                     |
| ------------------------------------------------------ | -------- | ------------------------------------------------------------------------------- |
| `CAMUNDA_AUTH_STRATEGY`                                | inferred | `OAUTH`, `BASIC`, or `NONE`. Inferred from the supplied credentials when unset. |
| `CAMUNDA_CLIENT_ID` / `ZEEBE_CLIENT_ID`                | —        | OAuth 2.0 client id (client-credentials grant).                                 |
| `CAMUNDA_CLIENT_SECRET` / `ZEEBE_CLIENT_SECRET`        | —        | OAuth 2.0 client secret.                                                        |
| `CAMUNDA_OAUTH_URL` / `ZEEBE_AUTHORIZATION_SERVER_URL` | —        | OAuth 2.0 token endpoint URL.                                                   |
| `CAMUNDA_TOKEN_AUDIENCE`                               | —        | OAuth token audience.                                                           |
| `CAMUNDA_TOKEN_SCOPE`                                  | —        | OAuth token scope.                                                              |
| `CAMUNDA_OAUTH_CACHE_DIR`                              | —        | Directory for the on-disk OAuth token cache.                                    |
| `CAMUNDA_BASIC_AUTH_USERNAME`                          | —        | HTTP Basic authentication username.                                             |
| `CAMUNDA_BASIC_AUTH_PASSWORD`                          | —        | HTTP Basic authentication password.                                             |

## Reliability

| Variable                               | Default    | Description                                                 |
| -------------------------------------- | ---------- | ----------------------------------------------------------- |
| `CAMUNDA_SDK_BACKPRESSURE_PROFILE`     | `BALANCED` | `BALANCED` (gates) or `LEGACY` (observe-only).              |
| `CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS`  | —          | Max transient-error retry attempts.                         |
| `CAMUNDA_SDK_HTTP_RETRY_BASE_DELAY_MS` | —          | Base backoff delay for retries, in milliseconds.            |
| `CAMUNDA_SDK_HTTP_RETRY_MAX_DELAY_MS`  | —          | Max backoff delay for retries, in milliseconds.             |
| `CAMUNDA_SDK_EVENTUAL_POLL_DEFAULT_MS` | —          | Default eventual-consistency poll timeout, in milliseconds. |
| `CAMUNDA_SDK_LOG_LEVEL`                | `info`     | `off`, `error`, `warn`, `info`, `debug`, or `trace`.        |

## Job workers

| Variable                                                                | Default          | Description                                             |
| ----------------------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
| `CAMUNDA_WORKER_NAME`                                                   | hostname-derived | Default worker name.                                    |
| `CAMUNDA_WORKER_TIMEOUT`                                                | —                | Default job activation timeout, in milliseconds.        |
| `CAMUNDA_WORKER_MAX_CONCURRENT_JOBS` / `CAMUNDA_WORKER_MAX_JOBS_ACTIVE` | —                | Default max concurrently-activated jobs per worker.     |
| `CAMUNDA_WORKER_REQUEST_TIMEOUT`                                        | —                | Default activate-jobs request timeout, in milliseconds. |
| `CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS`                             | —                | Max random startup delay for workers, in seconds.       |

## Transport

| Variable             | Default | Description                                                                        |
| -------------------- | ------- | ---------------------------------------------------------------------------------- |
| `CAMUNDA_FALCON`     | `true`  | Enable the FALCON command-stream transport upgrade when the gateway advertises it. |
| `CAMUNDA_FORCE_REST` | —       | Force the pure-REST path even when the gateway advertises FALCON.                  |

Invalid values are rejected at construction with a configuration error rather
than being silently coerced, so a typo in a deployment manifest fails the process
at startup instead of at first request.
