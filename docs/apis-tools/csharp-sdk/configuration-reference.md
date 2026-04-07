---
id: configuration-reference
title: "Configuration Reference"
sidebar_label: "Configuration Reference"
sidebar_position: 5
mdx:
  format: md
---

# Configuration Reference

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

The SDK uses environment variables for configuration, matching the [JS SDK](https://github.com/camunda/orchestration-cluster-api-js) conventions:

| Variable                               | Description                                                     | Default              |
| -------------------------------------- | --------------------------------------------------------------- | -------------------- |
| `CAMUNDA_REST_ADDRESS`                 | Cluster REST API address                                        | —                    |
| `CAMUNDA_AUTH_STRATEGY`                | `NONE`, `OAUTH`, or `BASIC`                                     | Auto-detected        |
| `CAMUNDA_CLIENT_ID`                    | OAuth client ID                                                 | —                    |
| `CAMUNDA_CLIENT_SECRET`                | OAuth client secret                                             | —                    |
| `CAMUNDA_OAUTH_URL`                    | OAuth token endpoint                                            | —                    |
| `CAMUNDA_TOKEN_AUDIENCE`               | OAuth audience                                                  | —                    |
| `CAMUNDA_OAUTH_GRANT_TYPE`             | OAuth grant type                                                | `client_credentials` |
| `CAMUNDA_OAUTH_SCOPE`                  | OAuth scope                                                     | —                    |
| `CAMUNDA_OAUTH_TIMEOUT_MS`             | OAuth token request timeout (ms)                                | `5000`               |
| `CAMUNDA_OAUTH_RETRY_MAX`              | Max OAuth token fetch retries                                   | `5`                  |
| `CAMUNDA_OAUTH_RETRY_BASE_DELAY_MS`    | OAuth retry base delay (ms)                                     | `1000`               |
| `CAMUNDA_BASIC_AUTH_USERNAME`          | Basic auth username                                             | —                    |
| `CAMUNDA_BASIC_AUTH_PASSWORD`          | Basic auth password                                             | —                    |
| `CAMUNDA_DEFAULT_TENANT_ID`            | Default tenant ID                                               | `<default>`          |
| `CAMUNDA_SDK_LOG_LEVEL`                | Log level (`error`, `warn`, `info`, `debug`, `trace`, `silent`) | `error`              |
| `CAMUNDA_SDK_VALIDATION`               | Validation mode (see below)                                     | `req:none,res:none`  |
| `CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS`  | Total HTTP retry attempts (initial + retries)                   | `3`                  |
| `CAMUNDA_SDK_HTTP_RETRY_BASE_DELAY_MS` | HTTP retry base backoff (ms)                                    | `100`                |
| `CAMUNDA_SDK_HTTP_RETRY_MAX_DELAY_MS`  | HTTP retry max backoff cap (ms)                                 | `2000`               |
| `CAMUNDA_SDK_EVENTUAL_POLL_DEFAULT_MS` | Default eventual consistency poll interval (ms)                 | `500`                |
| `ZEEBE_REST_ADDRESS`                   | Alias for `CAMUNDA_REST_ADDRESS`                                | —                    |
| `CAMUNDA_MTLS_CERT`                    | Inline PEM client certificate                                   | —                    |
| `CAMUNDA_MTLS_KEY`                     | Inline PEM client private key                                   | —                    |
| `CAMUNDA_MTLS_CA`                      | Inline PEM CA bundle                                            | —                    |
| `CAMUNDA_MTLS_CERT_PATH`               | Path to client certificate (PEM)                                | —                    |
| `CAMUNDA_MTLS_KEY_PATH`                | Path to client private key (PEM)                                | —                    |
| `CAMUNDA_MTLS_CA_PATH`                 | Path to CA bundle (PEM)                                         | —                    |
| `CAMUNDA_MTLS_KEY_PASSPHRASE`          | Passphrase for encrypted private key                            | —                    |

For backpressure configuration variables, see [Global Backpressure](resilience.md#global-backpressure-adaptive-concurrency).
