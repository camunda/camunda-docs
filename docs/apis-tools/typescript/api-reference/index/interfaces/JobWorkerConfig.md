---
title: "Interface: JobWorkerConfig<In, Out, Headers>"
sidebar_label: "JobWorkerConfig<In, Out, Headers>"
mdx:
  format: md
---

# Interface: JobWorkerConfig\<In, Out, Headers\>

## Type Parameters

### In

`In` _extends_ `z.ZodTypeAny` = `any`

### Out

`Out` _extends_ `z.ZodTypeAny` = `any`

### Headers

`Headers` _extends_ `z.ZodTypeAny` = `any`

## Properties

### autoStart?

```ts
autoStart?: boolean;
```

Immediately start polling for work - default `true`

---

### customHeadersSchema?

```ts
customHeadersSchema?: Headers;
```

Zod schema for custom headers in the activated job

---

### fetchVariables?

```ts
fetchVariables?: In extends ZodTypeAny<unknown, unknown, $ZodTypeInternals<unknown, unknown>> ? Extract<keyof output<In>, string>[] : string[];
```

Optional list of variable names to fetch during activation

---

### inputSchema?

```ts
inputSchema?: In;
```

Zod schema for variables in the activated job

---

### jobHandler

```ts
jobHandler: (job) => "JOB_ACTION_RECEIPT" | (Promise<"JOB_ACTION_RECEIPT">);
```

Your handler for an activated job.

**`job.variables` are untrusted input.** They arrive from the Orchestration Cluster,
but their content is set by whoever started the process instance or wrote to it since
— a form, an API caller, an upstream service, a message payload. Treat every value as
attacker-controlled: validate it before using it in a query, a file path, a shell
command, a URL or a template.

`job.customHeaders` are defined during modelling and reach you from the deployed
process model, so they are controlled by whoever deploys processes rather than by
whoever starts an instance — a narrower trust boundary, not an absent one.

What the SDK does for you:

- **JSON only.** Variables are deserialized as plain JSON. No constructor is invoked
  and no user class is instantiated from the payload — there is no mechanism here that
  can turn a payload into an arbitrary object.
- **No sharing between jobs.** Each activated job owns its own variables object;
  nothing is shared or mutated across concurrently running jobs.

What it does _not_ do:

- **No size or depth limit.** The SDK enforces no limit of its own on a variable
  payload, in addition to whatever the cluster accepts.
- **No shape validation by default.** [validateSchemas](#validateschemas) is `false` unless you
  set it; with it enabled and an [inputSchema](#inputschema) supplied, variables that do not
  match are rejected and the job is failed before your handler runs. That is the
  supported way to constrain the shape of what reaches this function.

See the "Job variables are untrusted input" section of the README.

#### Parameters

##### job

[`Job`](../type-aliases/Job.md)\<`In`, `Headers`\>

#### Returns

`"JOB_ACTION_RECEIPT"` \| `Promise`\<`"JOB_ACTION_RECEIPT"`\>

---

### jobTimeoutMs?

```ts
jobTimeoutMs?: number;
```

Job activation timeout in ms — default `60000`. Overridden by CAMUNDA_WORKER_TIMEOUT env var.

---

### jobType

```ts
jobType: string;
```

Zeebe job type

---

### ~~maxBackoffTimeMs?~~

```ts
maxBackoffTimeMs?: number;
```

#### Deprecated

Not used; pacing handled by long polling + client backpressure. Present only for migration compatibility.

---

### maxParallelJobs?

```ts
maxParallelJobs?: number;
```

Concurrency limit — default `10`. Overridden by CAMUNDA_WORKER_MAX_CONCURRENT_JOBS env var.

---

### outputSchema?

```ts
outputSchema?: Out;
```

Zod schema for variables in the complete command

---

### pollBackoffMaxMs?

```ts
pollBackoffMaxMs?: number;
```

Ceiling (ms) of the between-failed-poll exponential backoff. Default `30000`.

---

### pollBackoffMinMs?

```ts
pollBackoffMinMs?: number;
```

Floor (ms) of the exponential backoff applied between _failed_ activation
requests (connection refused, connect timeout, broker restart, LAN blip …).
The first retry waits ≈ this/2–this ms; subsequent consecutive failures
double the window up to [pollBackoffMaxMs](#pollbackoffmaxms), with jitter, and reset to
zero on the first successful poll. Default `1000`. Set to `0` to disable backoff (failed polls then fall back to [pollIntervalMs](#pollintervalms) rather than retrying immediately).

---

### pollIntervalMs?

```ts
pollIntervalMs?: number;
```

Backoff between polls - default 1ms

---

### pollTimeoutMs?

```ts
pollTimeoutMs?: number;
```

The request will be completed when at least one job is activated or after the requestTimeout.
If the requestTimeout = 0, the request will be completed after a default configured timeout in the broker.
To immediately complete the request when no job is activated set the requestTimeout to a negative value

---

### startupJitterMaxSeconds?

```ts
startupJitterMaxSeconds?: number;
```

Maximum random delay (in seconds) before the worker starts polling.
When multiple application instances restart simultaneously, this spreads out
initial activation requests to avoid saturating the server.
`0` (the default) means no delay.

---

### validateSchemas?

```ts
validateSchemas?: boolean;
```

Validate any provided input, output, customheader schema
default: false

---

### withLease?

```ts
withLease?: boolean;
```

Activate jobs with a lease — default `false`.

When `true`, each activated job is assigned a distinct, opaque lease token
(`ActivatedJobResult.jobLeaseToken`) that is automatically threaded back into the
fenced `complete` / `fail` / `error` commands. The lease fences those commands
against a superseded activation of the same job (e.g. after a timeout and
re-activation by another worker): a command carrying a stale token is rejected
rather than racing the newer activation. Once a job type is leased, it is served
only to leasing workers of that type, so a homogeneous fleet per job type is
recommended.

Note: the marker-derived non-null `jobLeaseToken` projection applies to the
direct `activateJobs` client call; a worker `jobHandler` intentionally keeps
the base `Job<...>` shape (`jobLeaseToken` remains optional/nullable) because the
token is threaded back into fenced commands automatically — handlers do not
need to read it.

---

### workerName?

```ts
workerName?: string;
```

Optional explicit name
