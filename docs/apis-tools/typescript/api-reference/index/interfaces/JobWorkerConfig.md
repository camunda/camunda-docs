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
optional autoStart?: boolean;
```

Immediately start polling for work - default `true`

---

### customHeadersSchema?

```ts
optional customHeadersSchema?: Headers;
```

Zod schema for custom headers in the activated job

---

### fetchVariables?

```ts
optional fetchVariables?: In extends ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>> ? Extract<keyof output<In>, string>[] : string[];
```

Optional list of variable names to fetch during activation

---

### inputSchema?

```ts
optional inputSchema?: In;
```

Zod schema for variables in the activated job

---

### jobHandler

```ts
jobHandler: (job) => "JOB_ACTION_RECEIPT" | Promise<"JOB_ACTION_RECEIPT">;
```

#### Parameters

##### job

[`Job`](../type-aliases/Job.md)\<`In`, `Headers`\>

#### Returns

`"JOB_ACTION_RECEIPT"` \| `Promise`\<`"JOB_ACTION_RECEIPT"`\>

---

### jobTimeoutMs?

```ts
optional jobTimeoutMs?: number;
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
optional maxBackoffTimeMs?: number;
```

#### Deprecated

Not used; pacing handled by long polling + client backpressure. Present only for migration compatibility.

---

### maxParallelJobs?

```ts
optional maxParallelJobs?: number;
```

Concurrency limit — default `10`. Overridden by CAMUNDA_WORKER_MAX_CONCURRENT_JOBS env var.

---

### outputSchema?

```ts
optional outputSchema?: Out;
```

Zod schema for variables in the complete command

---

### pollIntervalMs?

```ts
optional pollIntervalMs?: number;
```

Backoff between polls - default 1ms

---

### pollTimeoutMs?

```ts
optional pollTimeoutMs?: number;
```

The request will be completed when at least one job is activated or after the requestTimeout.
If the requestTimeout = 0, the request will be completed after a default configured timeout in the broker.
To immediately complete the request when no job is activated set the requestTimeout to a negative value

---

### startupJitterMaxSeconds?

```ts
optional startupJitterMaxSeconds?: number;
```

Maximum random delay (in seconds) before the worker starts polling.
When multiple application instances restart simultaneously, this spreads out
initial activation requests to avoid saturating the server.
`0` (the default) means no delay.

---

### validateSchemas?

```ts
optional validateSchemas?: boolean;
```

Validate any provided input, output, customheader schema
default: false

---

### workerName?

```ts
optional workerName?: string;
```

Optional explicit name
