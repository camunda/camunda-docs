---
title: "TypeScript SDK API Reference"
sidebar_label: "Overview"
sidebar_position: 0
mdx:
  format: md
---

# Camunda 8 Orchestration Cluster TypeScript SDK

Type‑safe, promise‑based client for the Camunda 8 Orchestration Cluster REST API.

## Highlights

- Strong TypeScript models (requests, responses, discriminated unions)
- Branded key types to prevent mixing IDs at compile time
- Optional request/response schema validation (Zod) via a single env variable
- OAuth2 client‑credentials & Basic auth (token cache, early refresh, jittered retry, singleflight)
- Optional mTLS (Node) with inline or \*\_PATH environment variables
- Cancelable promises for all operations
- Eventual consistency helper for polling endpoints
- Immutable, deep‑frozen configuration accessible through a factory‑created client instance
- Automatic body-level tenantId defaulting: if a request body supports an optional tenantId and you omit it, the SDK fills it from CAMUNDA_DEFAULT_TENANT_ID (path params are never auto-filled)
- Automatic transient HTTP retry (429, 503, network) with exponential backoff + full jitter (configurable via CAMUNDA_SDK_HTTP_RETRY\*). Non-retryable 500s fail fast. Pluggable strategy surface (default uses p-retry when available, internal fallback otherwise).

## Install

```bash
npm install @camunda8/orchestration-cluster-api
```

Runtime support:

- Node 20+ (native fetch & File; Node 18 needs global File polyfill)
- Modern browsers (Chromium, Firefox, Safari) – global `fetch` & `File` available

For older Node versions supply a fetch ponyfill AND a `File` shim (or upgrade). For legacy browsers, add a fetch polyfill (e.g. `whatwg-fetch`).

## Versioning

This SDK does **not** follow traditional semver. The **major.minor** version tracks the Camunda server version, so you can easily match the SDK to your deployment target (e.g. SDK `8.9.x` targets Camunda `8.9`).

**Patch releases** contain fixes, features, and occasionally **breaking type changes**. A breaking type change typically means an upstream API definition fix that corrects the shape of a request or response model — your code may stop type-checking even though it worked before.

When this happens, we signal it in the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-js/releases).

**Recommended approach:**

- **Ride the latest** — accept that types may shift and update your code when it happens. This keeps you on the most accurate API surface.
- **Pin and review** — pin to a specific patch version in `package.json` and review the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-js/releases) before upgrading:

  ```json
  "@camunda8/orchestration-cluster-api": "8.9.3"
  ```

## Quick Start (Zero‑Config – Recommended)

Keep configuration out of application code. Let the factory read `CAMUNDA_*` variables from the environment (12‑factor style). This makes rotation, secret management, and environment promotion safer & simpler.

```ts
import createCamundaClient from "@camunda8/orchestration-cluster-api";

// Zero‑config construction: reads CAMUNDA_* from process.env. If no configuration is present, defaults to Camunda 8 Run on localhost.
const camunda = createCamundaClient();

const topology = await camunda.getTopology();
console.log("Brokers:", topology.brokers?.length ?? 0);
```

Typical `.env` (example):

```bash
CAMUNDA_REST_ADDRESS=https://cluster.example   # SDK will use https://cluster.example/v2/... unless /v2 already present
CAMUNDA_AUTH_STRATEGY=OAUTH
CAMUNDA_CLIENT_ID=***
CAMUNDA_CLIENT_SECRET=***
CAMUNDA_DEFAULT_TENANT_ID=<default>   # optional: override default tenant resolution
CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS=4  # optional: total attempts (initial + 3 retries)
CAMUNDA_SDK_HTTP_RETRY_BASE_DELAY_MS=100  # optional: base backoff (ms)
CAMUNDA_SDK_HTTP_RETRY_MAX_DELAY_MS=2000  # optional: cap (ms)
```

> Prefer environment / secret manager injection over hard‑coding values in source. Treat the SDK like a leaf dependency: construct once near process start, pass the instance where needed.

> **Why zero‑config?**
>
> - Separation of concerns: business code depends on an interface, not on secret/constants wiring.
> - 12‑Factor alignment: config lives in the environment → simpler promotion (dev → staging → prod).
> - Secret rotation & incident response: rotate credentials without a code change or redeploy of application containers built with baked‑in values.
> - Immutable start: single hydration pass prevents drift / mid‑request mutations.
> - Test ergonomics: swap an `.env.test` (or injected vars) without touching source; create multiple clients for multi‑tenant tests.
> - Security review: fewer code paths handling secrets; scanners & vault tooling work at the boundary.
> - Deploy portability: same artifact runs everywhere; only the environment differs.
> - Observability clarity: configuration diffing is an ops concern, not an application code diff.

### Advanced: Programmatic Overrides

Use only when you must supply or mutate configuration dynamically (e.g. multi‑tenant routing, tests, ephemeral preview environments) or in the browser. Keys mirror their `CAMUNDA_*` env names.

```ts
const camunda = createCamundaClient({
  config: {
    CAMUNDA_REST_ADDRESS: "https://cluster.example",
    CAMUNDA_AUTH_STRATEGY: "BASIC",
    CAMUNDA_BASIC_AUTH_USERNAME: "alice",
    CAMUNDA_BASIC_AUTH_PASSWORD: "secret",
  },
});
```

### Advanced: Custom Fetch Implementation

Inject a custom `fetch` to add tracing, mock responses, instrumentation, circuit breakers, etc.

```ts
const camunda = createCamundaClient({
  fetch: (input, init) => {
    // inspect / modify request here
    return fetch(input, init);
  },
});
```

### Reconfiguration At Runtime (Rare)

You can call `client.configure({ config: { ... } })` to re‑hydrate. The exposed `client.getConfig()` stays `Readonly` and deep‑frozen. Prefer creating a new client instead of mutating a shared one in long‑lived services.

## Validation

This allows you to validate that requests to the API from your application and responses from the API have the expected types and shape declared in the type system.

This protects your application from runtime bugs or errors in the type system leading to undefined states hitting your business logic.

Recommended to use `fanatical` or `strict` in development and then switch to `strict` or `warn` in production.

Or you can just YOLO it and leave it on `none` all the time.

Controlled by `CAMUNDA_SDK_VALIDATION` (or `config` override). Grammar:

```
none | warn | strict | req:<mode>[,res:<mode>] | res:<mode>[,req:<mode>]
<mode> = none|warn|strict|fanatical
```

Examples:

```bash
CAMUNDA_SDK_VALIDATION=warn           # warn on both
CAMUNDA_SDK_VALIDATION=req:strict,res:warn # strict on requests, warn on responses
CAMUNDA_SDK_VALIDATION=none
```

Behavior:

- `none` - no validation performed
- `warn` - emit warning on invalid shape
- `strict` - fail on type mismatch or missing required fields
- `fanatical` - fail on type mismatch, missing required fields, or unknown additional fields

## Advanced HTTP Retry: Cockatiel Adapter (Optional)

The SDK includes built‑in transient HTTP retry (429, 503, network errors) using a p‑retry based engine plus a fallback implementation. For advanced resilience patterns (circuit breakers, timeouts, custom classification, combining policies) you can integrate [cockatiel](https://github.com/connor4312/cockatiel).

### When To Use Cockatiel

- You need different retry policies per operation (e.g. idempotent GET vs mutating POST)
- You want circuit breaking, hedging, timeout, or bulkhead controls
- You want to add custom classification (e.g. retry certain 5xx only on safe verbs)

### Disable Built‑In HTTP Retries

Set `CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS=1` so the SDK does only the initial attempt; then wrap operations with cockatiel.

### Minimal Example (Single Operation)

```ts
import { createCamundaClient } from "@camunda8/orchestration-cluster-api";
import { retry, ExponentialBackoff, handleAll } from "cockatiel";

const client = createCamundaClient({
  config: {
    CAMUNDA_REST_ADDRESS: "https://cluster.example",
    CAMUNDA_AUTH_STRATEGY: "NONE",
    CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS: 1, // disable SDK automatic retries
  } as any,
});

// Policy: up to 5 attempts total (1 + 4 retries) with exponential backoff & jitter
const policy = retry(handleAll, {
  maxAttempts: 5,
  backoff: new ExponentialBackoff({
    initialDelay: 100,
    maxDelay: 2000,
    jitter: true,
  }),
});

// Wrap getTopology
const origGetTopology = client.getTopology.bind(client);
client.getTopology = (() => policy.execute(() => origGetTopology())) as any;

const topo = await client.getTopology();
console.log(topo.brokers?.length);
```

### Bulk Wrapping All Operations

```ts
import { createCamundaClient } from "@camunda8/orchestration-cluster-api";
import { retry, ExponentialBackoff, handleAll } from "cockatiel";

const client = createCamundaClient({
  config: {
    CAMUNDA_REST_ADDRESS: "https://cluster.example",
    CAMUNDA_AUTH_STRATEGY: "OAUTH",
    CAMUNDA_CLIENT_ID: process.env.CAMUNDA_CLIENT_ID,
    CAMUNDA_CLIENT_SECRET: process.env.CAMUNDA_CLIENT_SECRET,
    CAMUNDA_OAUTH_URL: process.env.CAMUNDA_OAUTH_URL,
    CAMUNDA_TOKEN_AUDIENCE: "zeebe.camunda.io",
    CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS: 1,
  } as any,
});

const retryPolicy = retry(handleAll, {
  maxAttempts: 4,
  backoff: new ExponentialBackoff({
    initialDelay: 150,
    maxDelay: 2500,
    jitter: true,
  }),
});

const skip = new Set([
  "logger",
  "configure",
  "getConfig",
  "withCorrelation",
  "deployResourcesFromFiles",
]);
for (const key of Object.keys(client)) {
  const val: any = (client as any)[key];
  if (typeof val === "function" && !key.startsWith("_") && !skip.has(key)) {
    const original = val.bind(client);
    (client as any)[key] = (...a: any[]) =>
      retryPolicy.execute(() => original(...a));
  }
}

// Now every public operation is wrapped.
```

## Support Logger (Node Only)

For diagnostics during support interactions you can enable an auxiliary file logger that captures a sanitized snapshot of environment & configuration plus selected runtime events.

Enable by setting one of:

```bash
CAMUNDA_SUPPORT_LOG_ENABLED=true        # canonical
```

Optional override for output path (default is `./camunda-support.log` in the current working directory):

```bash
CAMUNDA_SUPPORT_LOG_FILE_PATH=/var/log/camunda-support.log
```

Behavior:

- File is created eagerly on first client construction (one per process; if the path exists a numeric suffix is appended to avoid clobbering).
- Initial preamble includes SDK package version, timestamp, and redacted environment snapshot.
- Secrets (client secret, passwords, mTLS private key, etc.) are automatically masked or truncated.
- Designed to be low‑impact: append‑only, newline‑delimited JSON records may be added in future releases for deeper inspection (current version writes the preamble only unless additional events are wired).

Recommended usage:

```bash
CAMUNDA_SUPPORT_LOG_ENABLED=1 CAMUNDA_SDK_LOG_LEVEL=debug node app.js
```

Keep the file only as long as needed for troubleshooting; it may contain sensitive non‑secret operational metadata. Do not commit it to version control.

To disable, unset the env variable or set `CAMUNDA_SUPPORT_LOG_ENABLED=false`.

Refer to `./docs/CONFIG_REFERENCE.md` for the full list of related environment variables.

### Custom Classification Example

Retry only network errors + 429/503, plus optionally 500 on safe GET endpoints you mark:

```ts
import { retry, ExponentialBackoff, handleWhen } from "cockatiel";

const classify = handleWhen((err) => {
  const status = (err as any)?.status;
  if (status === 429 || status === 503) return true;
  if (status === 500 && (err as any).__opVerb === "GET") return true; // custom tagging optional
  return err?.name === "TypeError"; // network errors from fetch
});

const policy = retry(classify, {
  maxAttempts: 5,
  backoff: new ExponentialBackoff({
    initialDelay: 100,
    maxDelay: 2000,
    jitter: true,
  }),
});
```

### Notes

- Keep SDK retries disabled to prevent duplicate layers.
- SDK synthesizes `Error` objects with a `status` for retry-significant HTTP responses (429, 503, 500), enabling classification.
- You can tag errors (e.g. assign `err.__opVerb`) in a wrapper if verb-level logic is needed.
- Future improvement: an official `retryStrategy` injection hook—current approach is non-invasive.

> Combine cockatiel retry with a circuit breaker, timeout, or bulkhead policy for more robust behavior in partial outages.

## Global Backpressure (Adaptive Concurrency)

The client now includes an internal global backpressure manager that adaptively throttles the number of _initiating_ in‑flight operations when the cluster signals resource exhaustion. It complements (not replaces) per‑request HTTP retry.

### Signals Considered

An HTTP response is treated as a backpressure signal when it is classified retryable **and** matches one of:

- `429` (Too Many Requests) – always
- `503` with `title === "RESOURCE_EXHAUSTED"`
- `500` whose RFC 9457 / 7807 `detail` text contains `RESOURCE_EXHAUSTED`

All other 5xx / 503 variants are treated as non‑retryable (fail fast) and do **not** influence the adaptive gate.

### How It Works

1. Normal state starts with effectively unlimited concurrency (no global semaphore enforced) until the first backpressure event.
2. On the first signal the manager boots with a provisional concurrency cap (e.g. 16) and immediately reduces it (soft state).
3. Repeated consecutive signals escalate severity to `severe`, applying a stronger reduction factor.
4. Successful (non‑backpressure) completions trigger passive recovery checks that gradually restore permits over time if the system stays quiet.
5. Quiet periods (no signals for a configurable decay interval) downgrade severity (`severe → soft → healthy`) and reset the consecutive counter when fully healthy.

The policy is intentionally conservative: it only engages after genuine pressure signals and recovers gradually to avoid oscillation.

### Exempt Operations

Certain operations that help drain work or complete execution are _exempt_ from gating so they are never queued behind initiating calls:

- `completeJob`
- `failJob`
- `throwJobError`
- `completeUserTask`

These continue immediately even during severe backpressure to promote system recovery.

### Interaction With HTTP Retry

Per‑request retry still performs exponential backoff + jitter for classified transient errors. The adaptive concurrency layer sits _outside_ retry:

1. A call acquires a permit (unless exempt) before its first attempt.
2. Internal retry re‑attempts happen _within_ the held permit.
3. On final success the permit is released and a healthy hint is recorded (possible gradual recovery).
4. On final failure (non‑retryable or attempts exhausted) the permit is released; a 429 on the terminal attempt still records backpressure.

This design prevents noisy churn (permits would not shrink/expand per retry attempt) and focuses on admission control of distinct logical operations.

### Observability

Enable debug logging (`CAMUNDA_SDK_LOG_LEVEL=debug` or `trace`) to see events emitted under the scoped logger `bp` (e.g. `backpressure.permits.scale`, `backpressure.permits.recover`, `backpressure.severity`). These are trace‑level; use `trace` for the most granular insight.

### Configuration

Current release ships with defaults tuned for conservative behavior. Adaptive gating is controlled by a profile (no separate boolean toggle). Use the `LEGACY` profile for observe‑only mode (no global gating, still records severity). Otherwise choose a tuning profile and optionally override individual knobs.

Tuning environment variables (all optional; defaults shown):

| Variable                                        | Default    | Description                                                                                     |
| ----------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| `CAMUNDA_SDK_BACKPRESSURE_INITIAL_MAX`          | `16`       | Bootstrap concurrency cap once the first signal is observed (null/unlimited before any signal). |
| `CAMUNDA_SDK_BACKPRESSURE_SOFT_FACTOR`          | `70`       | Percentage multiplier applied on each soft backpressure event (70 => 0.70x permits).            |
| `CAMUNDA_SDK_BACKPRESSURE_SEVERE_FACTOR`        | `50`       | Percentage multiplier when entering or re-triggering in severe state.                           |
| `CAMUNDA_SDK_BACKPRESSURE_RECOVERY_INTERVAL_MS` | `1000`     | Interval between passive recovery checks.                                                       |
| `CAMUNDA_SDK_BACKPRESSURE_RECOVERY_STEP`        | `1`        | Permits regained per recovery interval until reaching the bootstrap cap.                        |
| `CAMUNDA_SDK_BACKPRESSURE_DECAY_QUIET_MS`       | `2000`     | Quiet period to downgrade severity (`severe→soft→healthy`).                                     |
| `CAMUNDA_SDK_BACKPRESSURE_FLOOR`                | `1`        | Minimum concurrency floor while degraded.                                                       |
| `CAMUNDA_SDK_BACKPRESSURE_SEVERE_THRESHOLD`     | `3`        | Consecutive signals required to enter severe state.                                             |
| `CAMUNDA_SDK_BACKPRESSURE_PROFILE`              | `BALANCED` | Preset profile: BALANCED, CONSERVATIVE, AGGRESSIVE, LEGACY (LEGACY = observe-only, no gating).  |

#### Profiles

Profiles supply coordinated defaults when you don't want to reason about individual knobs. Any explicitly set knob env var overrides the profile value.

| Profile      | initialMax | softFactor% | severeFactor% | recoveryIntervalMs | recoveryStep | quietDecayMs | floor | severeThreshold | Intended Use                                                    |
| ------------ | ---------- | ----------- | ------------- | ------------------ | ------------ | ------------ | ----- | --------------- | --------------------------------------------------------------- |
| BALANCED     | 16         | 70          | 50            | 1000               | 1            | 2000         | 1     | 3               | General workloads with moderate spikes                          |
| CONSERVATIVE | 12         | 60          | 40            | 1200               | 1            | 2500         | 1     | 2               | Protect cluster under tighter capacity / cost constraints       |
| AGGRESSIVE   | 24         | 80          | 60            | 800                | 2            | 1500         | 2     | 4               | High throughput scenarios aiming to utilize headroom quickly    |
| LEGACY       | n/a        | 70          | 50            | 1000               | 1            | 2000         | 1     | 3               | Observe signals only (severity metrics) without adaptive gating |

Select via:

```bash
CAMUNDA_SDK_BACKPRESSURE_PROFILE=AGGRESSIVE
```

Then optionally override a single parameter, e.g.:

```bash
CAMUNDA_SDK_BACKPRESSURE_PROFILE=AGGRESSIVE
CAMUNDA_SDK_BACKPRESSURE_INITIAL_MAX=32
```

If the profile name is unrecognized the SDK falls back to BALANCED silently (future versions may emit a warning).

Factors use integer percentages to avoid floating point drift in env parsing; the SDK converts them to multipliers internally (e.g. `70` -> `0.7`).

If you have concrete tuning needs, open an issue describing workload patterns (operation mix, baseline concurrency, observed broker limits) to help prioritize which knobs to surface.

## Job Workers (Polling API)

The SDK provides a lightweight polling job worker for service task job types using `createJobWorker`. It activates jobs in batches (respecting a concurrency limit), validates variables (optional), and offers action helpers on each job.

### Minimal Example

```ts
import createCamundaClient from "@camunda8/orchestration-cluster-api";
import { z } from "zod";

const client = createCamundaClient();

// Define schemas (optional)
const Input = z.object({ orderId: z.string() });
const Output = z.object({ processed: z.boolean() });

const worker = client.createJobWorker({
  jobType: "process-order",
  maxParallelJobs: 10,
  timeoutMs: 15_000, // long‑poll timeout (server side requestTimeout)
  pollIntervalMs: 100, // delay between polls when no jobs / at capacity
  // Optional: only fetch specific variables during activation
  fetchVariables: ["orderId"],
  inputSchema: Input, // validates incoming variables if validateSchemas true
  outputSchema: Output, // validates variables passed to complete(...)
  validateSchemas: true, // set false for max throughput (skip Zod)
  autoStart: true, // default true; start polling immediately
  jobHandler: (job) => {
    // Access typed variables
    const vars = job.variables; // inferred from Input schema
    // Do work...
    return job.complete({ variables: { processed: true } });
  },
});

// Later, on shutdown:
process.on("SIGINT", () => {
  worker.stop();
});
```

Note on variable fetching:

- `fetchVariables: string[]` limits variables returned on activated jobs to the specified keys. If omitted, all visible variables at activation scope are returned. This maps to the REST API field `fetchVariable`.

TypeScript inference:

- When you provide `inputSchema`, the type of `fetchVariables` is constrained to the keys of the inferred `variables` type from that schema. Example:

```ts
const Input = z.object({ orderId: z.string(), amount: z.number() });
client.createJobWorker({
  jobType: "process-order",
  maxParallelJobs: 5,
  jobTimeoutMs: 30_000,
  inputSchema: Input,
  // Only allows 'orderId' | 'amount' here at compile-time
  fetchVariables: ["orderId", "amount"],
  jobHandler: async (job) => job.complete(),
});
```

- Without `inputSchema`, `fetchVariables` defaults to `string[]`.

### Job Handler Semantics

Your `jobHandler` must ultimately invoke exactly one of:

- `job.complete({ variables? })` OR `job.complete()`
- `job.fail({ errorMessage, retries?, retryBackoff? })`
- `job.cancelWorkflow({})` (cancels the process instance)
- `job.error({ errorCode, errorMessage? })` (throws a business error)
- `job.ignore()` (marks as done locally without reporting to broker – can be used for decoupled flows)

Each action returns an opaque unique symbol receipt (`JobActionReceipt`). The handler's declared return type (`Promise<JobActionReceipt>`) is intentional:

Why this design:

- Enforces a single terminal code path: every successful handler path should end by returning the sentinal obtained by invoking an action.
- Enables static reasoning: TypeScript can identify if your handler has a code path that does not acknowledge the job (catch unintended behavior early).
- Makes test assertions simple: e.g. `expect(await job.complete()).toBe(JobActionReceipt)`.

Acknowledgement lifecycle:

- Calling any action (`complete`, `fail`, `cancelWorkflow`, `ignore`) sets `job.acknowledged = true` internally. This surfaces multiple job resolution code paths at runtime.
- If the handler resolves (returns the symbol manually or via an action) without any acknowledgement having occurred, the worker logs `job.handler.noAction` and locally marks the job finished WITHOUT informing the broker (avoids a leak of the in-memory slot, but the broker will eventually time out and re-dispatch the job).

Recommended usage:

- Always invoke an action; if you truly mean to skip broker acknowledgement (for example: forwarding a job to another system which will complete it) use `job.ignore()`.

Example patterns:

```ts
// GOOD: explicit completion
return job.complete({ variables: { processed: true } });

// GOOD: No-arg completion example, sentinel stored for ultimate return
const ack = await job.complete();
// ...
return ack;

// GOOD: explicit ignore
const ack = await job.ignore();
```

```ts
// No-arg completion example
```

### Concurrency & Backpressure

Set `maxParallelJobs` to the maximum number of jobs you want actively processing concurrently. The worker will long‑poll for up to the remaining capacity each cycle. Global backpressure (adaptive concurrency) still applies to the underlying REST calls; activation itself is a normal operation.

### Validation

If `validateSchemas` is true:

- Incoming `variables` are parsed with `inputSchema` (fail => job is failed with a validation error message).
- Incoming `customHeaders` parsed with `customHeadersSchema` if provided.
- Completion payload `variables` parsed with `outputSchema` (warns & proceeds on failure).

### Graceful Shutdown

Use `await worker.stopGracefully({ waitUpToMs?, checkIntervalMs? })` to drain without force‑cancelling the current activation request.

```ts
// Attempt graceful drain for up to 8 seconds
const { remainingJobs, timedOut } = await worker.stopGracefully({
  waitUpToMs: 8000,
});
if (timedOut) {
  console.warn("Graceful stop timed out; remaining jobs:", remainingJobs);
}
```

Behavior:

- Stops scheduling new polls immediately.
- Lets any in‑flight activation finish (not cancelled proactively).
- Waits for active jobs to acknowledge (complete/fail/cancelWorkflow/ignore).
- On timeout: falls back to hard stop semantics (cancels activation) and logs `worker.gracefulStop.timeout` at debug.

For immediate termination call `worker.stop()` (or `client.stopAllWorkers()`) which cancels the in‑flight activation if present.

Activation cancellations during stop are logged at debug (`activation.cancelled`) instead of error noise.

### Multiple Workers

You can register multiple workers on a single client instance—one per job type is typical. The client exposes `client.getWorkers()` for inspection and `client.stopAllWorkers()` for coordinated shutdown.

### Receipt Type (Unique Symbol)

Action methods return a unique symbol (not a string) to avoid accidental misuse and allow internal metrics. If you store the receipt, annotate its type as `JobActionReceipt` to preserve uniqueness:

```ts
import { JobActionReceipt } from "@camunda8/orchestration-cluster-api";
const receipt: JobActionReceipt = await job.complete({
  variables: { processed: true },
});
```

If you ignore the return value you don’t need to import the symbol.

### When Not To Use The Worker

- Extremely latency‑sensitive tasks where a push mechanism or streaming protocol is required.
- Massive fan‑out requiring custom partitioning strategies (implement a custom activator loop instead).
- Browser environments (long‑lived polling + secret handling often unsuitable).

For custom strategies you can still call `client.activateJobs(...)`, manage concurrency yourself, and use `completeJob` / `failJob` directly.

### Guarantees & Caveats

- Never increases latency for healthy clusters (no cap until first signal).
- Cannot create fairness across multiple _processes_; it is per client instance in a single process. Scale your worker pool with that in mind.
- Not a replacement for server‑side quotas or external rate limiters—it's a cooperative adaptive limiter.

### Opt‑Out

To bypass adaptive concurrency while still collecting severity metrics use:

```bash
CAMUNDA_SDK_BACKPRESSURE_PROFILE=LEGACY
```

This reverts to only per‑request retry for transient errors (no global gating) while keeping observability.

### Inspecting State Programmatically

Call `client.getBackpressureState()` to obtain:

```ts
{
  severity: "healthy" | "soft" | "severe";
  consecutive: number; // consecutive backpressure signals observed
  permitsMax: number | null; // current concurrency cap (null => unlimited/not engaged)
  permitsCurrent: number; // currently acquired permits
  waiters: number; // queued operations waiting for a permit
}
```

---

## Authentication

Set `CAMUNDA_AUTH_STRATEGY` to `NONE` (default), `BASIC`, or `OAUTH`.

Basic:

```
CAMUNDA_AUTH_STRATEGY=BASIC
CAMUNDA_BASIC_AUTH_USERNAME=alice
CAMUNDA_BASIC_AUTH_PASSWORD=supersecret
```

OAuth (client credentials):

```
CAMUNDA_AUTH_STRATEGY=OAUTH
CAMUNDA_CLIENT_ID=yourClientId
CAMUNDA_CLIENT_SECRET=yourSecret
CAMUNDA_OAUTH_URL=https://idp.example/oauth/token   # if required by your deployment
```

Optional audience / retry / timeout vars are also read if present (see generated config reference).

Auth helper features (automatic inside the client):

- Disk + memory token cache
- Early refresh with skew handling
- Exponential backoff & jitter
- Singleflight suppression of concurrent refreshes
- Hook: `client.onAuthHeaders(h => ({ ...h, 'X-Trace': 'abc' }))`
- Force refresh: `await client.forceAuthRefresh()`
- Clear caches: `client.clearAuthCache({ disk: true, memory: true })`

### Token Caching & Persistence

The SDK always keeps the active OAuth access token in memory. Optional disk persistence (Node only) is enabled by setting:

```bash
CAMUNDA_OAUTH_CACHE_DIR=/path/to/cache
```

When present and running under Node, each distinct credential context (combination of `oauthUrl | clientId | audience | scope`) is hashed to a filename:

```
<CAMUNDA_OAUTH_CACHE_DIR>/camunda_oauth_token_cache_<hash>.json
```

Writes are atomic (`.tmp` + rename) and use file mode `0600` (owner read/write). On process start the SDK attempts to load the persisted file to avoid an unnecessary token fetch; if the token is near expiry it will still perform an early refresh (5s skew window plus additional safety buffer based on 5% or 30s minimum).

Clearing / refreshing:

- Programmatic clear: `client.clearAuthCache({ disk: true, memory: true })`
- Memory only: `client.clearAuthCache({ memory: true, disk: false })`
- Force new token (ignores freshness): `await client.forceAuthRefresh()`

Disable disk persistence by simply omitting `CAMUNDA_OAUTH_CACHE_DIR` (memory cache still applies). For short‑lived or serverless functions you may prefer no disk cache to minimize I/O; for long‑running workers disk caching reduces cold‑start latency and load on the identity provider across restarts / rolling deploys.

Security considerations:

- Ensure the directory has restrictive ownership/permissions; the SDK creates files with `0600` but will not alter parent directory permissions.
- Tokens are bearer credentials; treat the directory like a secrets store and avoid including it in container image layers or backups.
- If you rotate credentials (client secret) the filename hash changes; old cache files become unused and can be pruned safely.

Browser usage: There is no disk concept—if executed in a browser the SDK (when strategy OAUTH) attempts to store the token in `sessionStorage` (tab‑scoped). Closing the tab clears the cache; a new tab will fetch a fresh token.

If you need a custom persistence strategy (e.g. Redis / encrypted keychain), wrap the client and periodically call `client.forceAuthRefresh()` while storing and re‑injecting the token via a headers hook; first measure whether the built‑in disk cache already meets your needs.

## mTLS (Node only)

Provide inline or path variables (inline wins):

```
CAMUNDA_MTLS_CERT / CAMUNDA_MTLS_CERT_PATH
CAMUNDA_MTLS_KEY  / CAMUNDA_MTLS_KEY_PATH
CAMUNDA_MTLS_CA   / CAMUNDA_MTLS_CA_PATH (optional)
CAMUNDA_MTLS_KEY_PASSPHRASE (optional)
```

If both cert & key are available an https.Agent is attached to all outbound calls (including token fetches).

## Branded Keys

Import branded key helpers directly:

```ts
import {
  ProcessDefinitionKey,
  ProcessInstanceKey,
} from "@camunda8/orchestration-cluster";

const defKey = ProcessDefinitionKey.assumeExists("2251799813686749");
// @ts-expect-error – cannot assign def key to instance key
const bad: ProcessInstanceKey = defKey;
```

They are zero‑cost runtime strings with compile‑time separation.

## Cancelable Operations

All methods return a `CancelablePromise<T>`:

```ts
const p = camunda.searchProcessInstances({
  filter: { processDefinitionKey: defKey },
});
setTimeout(() => p.cancel(), 100); // best‑effort cancel
try {
  await p; // resolves if not cancelled
} catch (e) {
  if (isSdkError(e) && e.name === "CancelSdkError") {
    console.log("Operation cancelled");
  } else throw e;
}
```

Notes:

- Rejects with `CancelSdkError`.
- Cancellation classification runs first so aborted fetches are never downgraded to generic network errors.
- Abort is immediate and idempotent; underlying fetch is signalled.

## Functional (fp-ts style) Surface (Opt-In Subpath)

@experimental - this feature is not guaranteed to be tested or stable.

The main entry stays minimal. To opt in to a TaskEither-style facade & helper combinators import from the dedicated subpath:

```ts
import {
  createCamundaFpClient,
  retryTE,
  withTimeoutTE,
  eventuallyTE,
  isLeft,
} from "@camunda8/orchestration-cluster/fp";

const fp = createCamundaFpClient();
const deployTE = fp.deployResourcesFromFiles(["./bpmn/process.bpmn"]);
const deployed = await deployTE();
if (isLeft(deployed)) throw deployed.left; // DomainError union

// Chain with fp-ts (optional) – the returned thunks are structurally compatible with TaskEither
// import { pipe } from 'fp-ts/function'; import * as TE from 'fp-ts/TaskEither';
```

Why a subpath?

- Keeps base bundle lean for the 80% use case.
- No hard dependency on `fp-ts` at runtime; only structural types.
- Advanced users can compose with real `fp-ts` without pulling the effect model into the default import path.

Exports available from `.../fp`:

- `createCamundaFpClient` – typed facade (methods return `() => Promise<Either<DomainError,T>>`).
- Type guards: `isLeft`, `isRight`.
- Error / type aliases: `DomainError`, `TaskEither`, `Either`, `Left`, `Right`, `Fpify`.
- Combinators: `retryTE`, `withTimeoutTE`, `eventuallyTE`.

DomainError union currently includes:

- `CamundaValidationError`
- `EventualConsistencyTimeoutError`
- HTTP-like error objects (status/body/message) produced by transport
- Generic `Error`

You can refine left-channel typing later by mapping HTTP status codes or discriminator fields.

## Eventual Consistency Polling

Some endpoints accept consistency management options. Pass a `consistency` block (where supported) with `waitUpToMs` and optional `pollIntervalMs` (default 500). If the condition is not met within timeout an `EventualConsistencyTimeoutError` is thrown.

To consume eventual polling in a non‑throwing fashion set the client error mode before invoking an eventually consistent method:
At present the canonical client operates in throwing mode. Non‑throwing adaptation (Result / fp-ts) is achieved via the functional wrappers rather than mutating the base client.

### Options

`consistency` object fields (all optional except `waitUpToMs`):

| Field            | Type                                      | Description                                                                                                                                                                                                      |
| ---------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `waitUpToMs`     | `number`                                  | Maximum total time to wait before failing. `0` disables polling and returns the first response immediately.                                                                                                      |
| `pollIntervalMs` | `number`                                  | Base delay between attempts (minimum enforced at 10ms). Defaults to `500` or the value of `CAMUNDA_SDK_EVENTUAL_POLL_DEFAULT_MS` if provided.                                                                    |
| `predicate`      | `(result) => boolean \| Promise<boolean>` | Custom success condition. If omitted, non-GET endpoints default to: first 2xx body whose `items` array (if present) is non-empty.                                                                                |
| `trace`          | `boolean`                                 | When true, logs each 200 response body (truncated ~1KB) before predicate evaluation and emits a success line with elapsed time when the predicate passes. Requires log level `debug` (or `trace`) to see output. |
| `onAttempt`      | `(info) => void`                          | Callback after each attempt: `{ attempt, elapsedMs, remainingMs, status, predicateResult, nextDelayMs }`.                                                                                                        |
| `onComplete`     | `(info) => void`                          | Callback when predicate succeeds: `{ attempts, elapsedMs }`. Not called on timeout.                                                                                                                              |

### Trace Logging

Enable by setting `trace: true` inside `consistency`. Output appears under the `eventual` log scope at level `debug` so you must raise the SDK log level (e.g. `CAMUNDA_SDK_LOG_LEVEL=debug`).

Emitted lines (examples):

```
[camunda-sdk][debug][eventual] op=searchJobs attempt=3 trace body={"items":[]}
[camunda-sdk][debug][eventual] op=searchJobs attempt=5 status=200 predicate=true elapsed=742ms totalAttempts=5
```

Use this to understand convergence speed and data shape evolution during tests or to diagnose slow propagation.

### Example

```ts
const jobs = await camunda.searchJobs({
  filter: { type: "payment" },
  consistency: {
    waitUpToMs: 5000,
    pollIntervalMs: 200,
    trace: true,
    predicate: (r) =>
      Array.isArray(r.items) && r.items.some((j) => j.state === "CREATED"),
  },
});
```

On timeout an `EventualConsistencyTimeoutError` includes diagnostic fields: `{ attempts, elapsedMs, lastStatus, lastResponse, operationId }`.

## Logging

Per‑client logger; no global singleton. The level defaults from `CAMUNDA_SDK_LOG_LEVEL` (default `error`).

```ts
const client = createCamundaClient({
  log: {
    level: "info",
    transport: (evt) => {
      // evt: { level, scope, ts, args, code?, data? }
      console.log(JSON.stringify(evt));
    },
  },
});

const log = client.logger("worker");
log.debug(() => ["expensive detail only if enabled", { meta: 1 }]);
log.code("info", "WORK_START", "Starting work loop", { pid: process.pid });
```

Lazy args (functions with zero arity) are only invoked if the level is enabled.

Update log level / transport at runtime via `client.configure({ log: { level: 'debug' } })`.

### Default Behaviour

Without any explicit `log` option:

- Level = `error` (unless `CAMUNDA_SDK_LOG_LEVEL` is set)
- Transport = console (`console.error` / `console.warn` / `console.log`)
- Only `error` level internal events are emitted (e.g. strict validation failure summaries, fatal auth issues)
- No info/debug/trace noise by default

To silence everything set level to `silent`:

```bash
CAMUNDA_SDK_LOG_LEVEL=silent
```

To enable debug logs via env:

```bash
CAMUNDA_SDK_LOG_LEVEL=debug
```

### Unsafe Deep Diagnostics (`silly`)

Setting `CAMUNDA_SDK_LOG_LEVEL=silly` enables the deepest diagnostics. In addition to everything at `trace`, the SDK will emit HTTP request and response body previews for all HTTP methods under the `telemetry` scope (log line contains `http.body`). This can leak sensitive information (secrets, PII). A warning (`log.level.silly.enabled`) is emitted on client construction. Use only for short‑lived local debugging; never enable in production or share captured logs externally. Body output is truncated (max ~4KB) and form-data parts identify uploaded files as `[File]`.

### Bring Your Own Logger

Provide a `transport` function to forward structured `LogEvent` objects into any logging library.

#### Pino

```ts
import pino from 'pino';
import createCamundaClient from '@camunda8/orchestration-cluster';

const p = pino();
const client = createCamundaClient({
  log: {
    level: 'info',
    transport: e => {
      const lvl = e.level === 'trace' ? 'debug' : e.level; // map trace
      p.child({ scope: e.scope, code: e.code }).[lvl]({ ts: e.ts, data: e.data, args: e.args }, e.args.filter(a=>typeof a==='string').join(' '));
    }
  }
});
```

#### Winston

```ts
import winston from "winston";
import createCamundaClient from "@camunda8/orchestration-cluster";

const w = winston.createLogger({
  transports: [new winston.transports.Console()],
});
const client = createCamundaClient({
  log: {
    level: "debug",
    transport: (e) => {
      const lvl = e.level === "trace" ? "silly" : e.level; // winston has 'silly'
      w.log({
        level: lvl,
        message: e.args.filter((a) => typeof a === "string").join(" "),
        scope: e.scope,
        code: e.code,
        data: e.data,
        ts: e.ts,
      });
    },
  },
});
```

#### loglevel

```ts
import log from "loglevel";
import createCamundaClient from "@camunda8/orchestration-cluster";

log.setLevel("info"); // host app level
const client = createCamundaClient({
  log: {
    level: "info",
    transport: (e) => {
      if (e.level === "silent") return;
      const method = (
        ["error", "warn", "info", "debug"].includes(e.level) ? e.level : "debug"
      ) as "error" | "warn" | "info" | "debug";
      (log as any)[method](
        `[${e.scope}]`,
        e.code ? `${e.code}:` : "",
        ...e.args
      );
    },
  },
});
```

#### Notes

- Map `trace` to the nearest available level if your logger lacks it.
- Use `log.code(level, code, msg, data)` for machine-parsable events.
- Redact secrets before logging if you add token contents to custom messages.
- Reconfigure later: `client.configure({ log: { level: 'warn' } })` updates only that client.
- When the effective level is `debug` (or `trace`), the client emits a lazy `config.hydrated` event on construction and `config.reconfigured` on `configure()`, each containing the redacted effective configuration `{ config: { CAMUNDA_... } }`. Secrets are already masked using the SDK's redaction rules.

## Errors

May throw:

- Network / fetch failures
- Non‑2xx HTTP responses
- Validation errors (strict mode)
- `EventualConsistencyTimeoutError`
- `CancelSdkError` on cancellation

### Typed Error Handling

All SDK-thrown operational errors normalize to a discriminated union (`SdkError`) when they originate from HTTP, network, auth, or validation layers. Use the guard `isSdkError` to narrow inside a catch:

```ts
import { createCamundaClient } from "@camunda8/orchestration-cluster-api";
import { isSdkError } from "@camunda8/orchestration-cluster-api/dist/runtime/errors";

const client = createCamundaClient();

try {
  await client.getTopology();
} catch (e) {
  if (isSdkError(e)) {
    switch (e.name) {
      case "HttpSdkError":
        console.error("HTTP failure", e.status, e.operationId);
        break;
      case "ValidationSdkError":
        console.error("Validation issue on", e.operationId, e.side, e.issues);
        break;
      case "AuthSdkError":
        console.error("Auth problem", e.message, e.status);
        break;
      case "CancelSdkError":
        console.error("Operation cancelled", e.operationId);
        break;
      case "NetworkSdkError":
        console.error("Network layer error", e.message);
        break;
    }
    return;
  }
  // Non-SDK (programmer) error; rethrow or wrap
  throw e;
}
```

Guarantees:

- HTTP errors expose `status` and optional `operationId`.
- If the server returns RFC 9457 / RFC 7807 Problem Details JSON (`type`, `title`, `status`, `detail`, `instance`) these fields are passed through on the `HttpSdkError` when present.
- Validation errors expose `side` and `operationId`.
- Classification is best-effort; unknown shapes fall back to `NetworkSdkError`.

> Advanced: You can still layer your own domain errors on top (e.g. translate certain status codes) by mapping `SdkError` into custom discriminants.

### Functional / Non‑Throwing Variant - EXPERIMENTAL

_Note that this feature is experimental and subject to change._

If you prefer FP‑style explicit error handling instead of exceptions, use the result client wrapper:

```ts
import {
  createCamundaResultClient,
  isOk,
} from "@camunda8/orchestration-cluster";

const camundaR = createCamundaResultClient();
const res = await camundaR.createDeployment({ resources: [file] });
if (isOk(res)) {
  console.log("Deployment key", res.value.deployments[0].deploymentKey);
} else {
  console.error("Deployment failed", res.error);
}
```

API surface differences:

- All async operation methods return `Promise<Result<T>>` where `Result<T> = { ok: true; value: T } | { ok: false; error: unknown }`.
- No exceptions are thrown for HTTP / validation errors (cancellation and programmer errors like invalid argument sync throws are still converted to `{ ok:false }`).
- The original throwing client is available via `client.inner` if you need to mix styles.

Helpers:

```ts
import { isOk, isErr } from "@camunda8/orchestration-cluster";
```

When to use:

- Integrating with algebraic effects / functional pipelines.
- Avoiding try/catch nesting in larger orchestration flows.
- Converting to libraries expecting an Either/Result pattern.

### fp-ts Adapter (TaskEither / Either) - EXPERIMENTAL

_Note that this feature is experimental and subject to change._

For projects using `fp-ts`, wrap the throwing client in a lazy `TaskEither` facade:

```ts
import { createCamundaFpClient } from "@camunda8/orchestration-cluster";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

const fp = createCamundaFpClient();

const deployTE = fp.createDeployment({ resources: [file] }); // TaskEither<unknown, ExtendedDeploymentResult>

pipe(
  deployTE(), // invoke the task (returns Promise<Either>)
  (then) => then // typical usage would use TE.match / TE.fold; shown expanded for clarity
);

// With helpers
const task = fp.createDeployment({ resources: [file] });
const either = await task();
if (either._tag === "Right") {
  console.log(either.right.deployments.length);
} else {
  console.error("Error", either.left);
}
```

Notes:

- No runtime dependency on `fp-ts`; adapter implements a minimal `Either` shape. Structural typing lets you lift into real `fp-ts` functions (`fromEither`, etc.).
- Each method becomes a function returning `() => Promise<Either<E,A>>` (a `TaskEither` shape). Invoke it later to execute.
- Cancellation: calling `.cancel()` on the original promise isn’t surfaced; if you need cancellation use the base client directly.
- For richer interop, you can map the returned factory to `TE.tryCatch` in userland.

## Pagination

Search endpoints expose typed request bodies that include pagination fields. Provide the desired page object; auto‑pagination is not (yet) bundled.

## Configuration Reference

Generated doc enumerating all supported environment variables (types, defaults, conditional requirements, redaction rules) is produced at build time:

```
./docs/CONFIG_REFERENCE.md
```

## Deploying Resources (File-only)

The deployment endpoint requires each resource to have a filename (extension used to infer type: `.bpmn`, `.dmn`, `.form` / `.json`). Extensions influence server classification; incorrect or missing extensions may yield unexpected results. Pass an array of `File` objects (NOT plain `Blob`).

### Browser

```ts
const bpmnXml = `<definitions id="process" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL">...</definitions>`;
const file = new File([bpmnXml], "order-process.bpmn", {
  type: "application/xml",
});
const result = await camunda.createDeployment({ resources: [file] });
console.log(result.deployments.length);
```

From an existing Blob:

```ts
const blob: Blob = getBlob();
const file = new File([blob], "model.bpmn");
await camunda.createDeployment({ resources: [file] });
```

### Node (Recommended Convenience)

Use the built-in helper `deployResourcesFromFiles(...)` to read local files and create `File` objects automatically. It returns the enriched `ExtendedDeploymentResult` (adds typed arrays: `processes`, `decisions`, `decisionRequirements`, `forms`, `resources`).

```ts
const result = await camunda.deployResourcesFromFiles([
  "./bpmn/order-process.bpmn",
  "./dmn/discount.dmn",
  "./forms/order.form",
]);

console.log(result.processes.map((p) => p.processDefinitionId));
console.log(result.decisions.length);
```

With explicit tenant (overriding tenant from configuration):

```ts
await camunda.deployResourcesFromFiles(["./bpmn/order-process.bpmn"], {
  tenantId: "tenant-a",
});
```

Error handling:

```ts
try {
  await camunda.deployResourcesFromFiles([]); // throws (empty array)
} catch (e) {
  console.error("Deployment failed:", e);
}
```

Manual construction alternative (if you need custom logic):

```ts
import { File } from "node:buffer";
const bpmnXml =
  '<definitions id="process" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"></definitions>';
const file = new File([Buffer.from(bpmnXml)], "order-process.bpmn", {
  type: "application/xml",
});
await camunda.createDeployment({ resources: [file] });
```

Helper behavior:

- Dynamically imports `node:fs/promises` & `node:path` (tree-shaken from browser bundles)
- Validates Node environment (throws in browsers)
- Lightweight MIME inference: `.bpmn|.dmn|.xml -> application/xml`, `.json|.form -> application/json`, fallback `application/octet-stream`
- Rejects empty path list

Empty arrays are rejected. Always use correct extensions so the server can classify each resource.

## Testing Patterns

Create isolated clients per test file:

```ts
const client = createCamundaClient({
  config: {
    CAMUNDA_REST_ADDRESS: "http://localhost:8080",
    CAMUNDA_AUTH_STRATEGY: "NONE",
  },
});
```

Inject a mock fetch:

```ts
const client = createCamundaClient({
  fetch: async (input, init) =>
    new Response(JSON.stringify({ ok: true }), { status: 200 }),
});
```

## API Documentation

Generate an HTML API reference site with TypeDoc (public entry points only):

```bash
npm run docs:api
```

Output: static site in `docs/api` (open `docs/api/index.html` in a browser or serve the folder, e.g. `npx http-server docs/api`). Entry points: `src/index.ts`, `src/logger.ts`, `src/fp/index.ts`. Internal generated code, scripts, tests are excluded and private / protected members are filtered. Regenerate after changing public exports.

## Contributing

We welcome issues and pull requests. Please read the [CONTRIBUTING.md](https://github.com/camunda/orchestration-cluster-api-js/blob/main/CONTRIBUTING.md) guide before opening a PR to understand:

- Deterministic builds policy (no committed timestamps) – see CONTRIBUTING
- Commit message conventions (Conventional Commits with enforced subject length)
- Release workflow & how to dry‑run semantic‑release locally
- Testing strategy (unit vs integration)
- Performance and security considerations

## License

Apache 2.0
