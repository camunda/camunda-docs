---
title: "Interface: ThreadedJobWorkerConfig<In, Out, Headers>"
sidebar_label: "ThreadedJobWorkerConfig<In, Out, Headers>"
mdx:
  format: md
---

# Interface: ThreadedJobWorkerConfig\<In, Out, Headers\>

Configuration for a threaded job worker.
Same as JobWorkerConfig but replaces `jobHandler` with `handlerModule`.

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

### handlerModule

```ts
handlerModule: string;
```

Absolute or relative path to a JS/TS module that exports a default handler function.
The function signature must be: `(job, client) => Promise<JobActionReceipt>`

---

### inputSchema?

```ts
optional inputSchema?: In;
```

Zod schema for variables in the activated job

---

### jobTimeoutMs?

```ts
optional jobTimeoutMs?: number;
```

Job activation timeout

---

### jobType

```ts
jobType: string;
```

Zeebe job type

---

### maxParallelJobs?

```ts
optional maxParallelJobs?: number;
```

concurrency limit

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

### threadPoolSize?

```ts
optional threadPoolSize?: number;
```

Number of threads in the shared pool (used only when the pool is first created;
subsequent workers share the existing pool).
Default: number of CPU cores available to the process.

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
