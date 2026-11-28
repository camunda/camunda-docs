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

| Variable                                          | Default                 | Description                                                                                                                                                                                              |
| ------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CAMUNDA_REST_ADDRESS` / `ZEEBE_REST_ADDRESS`     | `http://localhost:8080` | Orchestration Cluster REST base address.                                                                                                                                                                 |
| `CAMUNDA_REST_ADDRESS_EXACT`                      | —                       | Use `CAMUNDA_REST_ADDRESS` exactly as provided, without appending the `/v2` suffix (for gateway/reverse-proxy fronted deployments).                                                                      |
| `CAMUNDA_GRPC_ADDRESS` / `ZEEBE_GRPC_ADDRESS`     | `localhost:26500`       | Zeebe gRPC gateway address (`host:port`) for the streaming job worker.                                                                                                                                   |
| `CAMUNDA_DEFAULT_TENANT_ID` / `CAMUNDA_TENANT_ID` | —                       | Default tenant id applied to operations that accept one.                                                                                                                                                 |
| `CAMUNDA_USER_AGENT`                              | —                       | Application identifier (e.g. `my-app/1.2`) appended after the SDK's `camunda-orchestration-sdk-go/<version>` User-Agent token on REST, OAuth and gRPC requests. Never replaces it. Also `WithUserAgent`. |

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

| Variable                                   | Default                     | Description                                                                         |
| ------------------------------------------ | --------------------------- | ----------------------------------------------------------------------------------- |
| `CAMUNDA_FALCON`                           | `true`                      | Enable the FALCON command-stream transport upgrade when the gateway advertises it.  |
| `CAMUNDA_FORCE_REST`                       | —                           | Force the pure-REST path even when the gateway advertises FALCON.                   |
| `CAMUNDA_SDK_HTTP_MAX_IDLE_CONNS`          | `256`, grown to fit workers | Max idle (keep-alive) HTTP connections across all hosts. Setting it pins the value. |
| `CAMUNDA_SDK_HTTP_MAX_IDLE_CONNS_PER_HOST` | `256`, grown to fit workers | Max idle (keep-alive) HTTP connections per host. Setting it pins the value.         |

The SDK never uses `http.DefaultTransport` directly: it clones it and sizes the
idle-connection pool for job-worker workloads. Go's default pool keeps only 2
idle connections per host, so a worker with many jobs in flight otherwise opens
and closes a TCP connection per call — churning sockets into `TIME_WAIT`,
exhausting ephemeral ports, and roughly halving throughput at moderate
concurrency.

The 256 default is a floor: each time you create a job worker (`NewJobWorker`
or `NewStreamJobWorker`) the SDK grows the pool so it covers the sum of all the
client's workers' `MaxConcurrentJobs` plus one activation poll per worker. For
example, 50 workers × 32 concurrent jobs raises both limits to 1,650. The pool
is resized by swapping in a resized clone of the SDK's own transport, so
in-flight requests are never disturbed. The pool never shrinks.

Explicit settings always win: a value set through
`CAMUNDA_SDK_HTTP_MAX_IDLE_CONNS(_PER_HOST)` or `WithMaxIdleConns(PerHost)` pins
that limit and turns off automatic growth for it. A transport supplied with
`WithTransport` / `WithHTTPClient` is never touched. When pinning
`CAMUNDA_SDK_HTTP_MAX_IDLE_CONNS_PER_HOST`, remember that
`CAMUNDA_SDK_HTTP_MAX_IDLE_CONNS` caps the idle pool across all hosts, so raise
it too (or set `0` for no global limit).

For full control, supply your own HTTP plumbing:

```go
// WithTransport replaces the base RoundTripper; the SDK's retry, backpressure
// and auth layers still apply on top of it.
client, err := camunda.New(camunda.WithTransport(&http.Transport{
	MaxIdleConns:        1024,
	MaxIdleConnsPerHost: 1024,
}))
```

```go
// WithHTTPClient replaces the whole HTTP client; it is used as-is, so the
// SDK's retry, backpressure, auth and TLS layers are bypassed.
client, err := camunda.New(camunda.WithHTTPClient(&http.Client{
	Transport: &http.Transport{MaxIdleConnsPerHost: 1024},
	Timeout:   30 * time.Second,
}))
```

The two options are mutually exclusive — setting both fails `New` with a
configuration error.

Invalid values are rejected at construction with a configuration error rather
than being silently coerced, so a typo in a deployment manifest fails the process
at startup instead of at first request.
