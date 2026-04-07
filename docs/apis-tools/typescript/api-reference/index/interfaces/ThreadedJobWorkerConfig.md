---
title: "Interface: ThreadedJobWorkerConfig<In, Out, Headers>"
sidebar_label: "ThreadedJobWorkerConfig<In, Out, Headers>"
mdx:
  format: md
---

# Interface: ThreadedJobWorkerConfig\<In, Out, Headers\>

Defined in: [runtime/threadedJobWorker.ts:40](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L40)

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

Defined in: [runtime/threadedJobWorker.ts:57](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L57)

Immediately start polling for work - default `true`

---

### customHeadersSchema?

```ts
optional customHeadersSchema?: Headers;
```

Defined in: [runtime/threadedJobWorker.ts:53](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L53)

Zod schema for custom headers in the activated job

---

### fetchVariables?

```ts
optional fetchVariables?: In extends ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>> ? Extract<keyof output<In>, string>[] : string[];
```

Defined in: [runtime/threadedJobWorker.ts:71](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L71)

Optional list of variable names to fetch during activation

---

### handlerModule

```ts
handlerModule: string;
```

Defined in: [runtime/threadedJobWorker.ts:47](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L47)

Absolute or relative path to a JS/TS module that exports a default handler function.
The function signature must be: `(job, client) => Promise<JobActionReceipt>`

---

### inputSchema?

```ts
optional inputSchema?: In;
```

Defined in: [runtime/threadedJobWorker.ts:49](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L49)

Zod schema for variables in the activated job

---

### jobTimeoutMs?

```ts
optional jobTimeoutMs?: number;
```

Defined in: [runtime/threadedJobWorker.ts:67](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L67)

Job activation timeout

---

### jobType

```ts
jobType: string;
```

Defined in: [runtime/threadedJobWorker.ts:69](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L69)

Zeebe job type

---

### maxParallelJobs?

```ts
optional maxParallelJobs?: number;
```

Defined in: [runtime/threadedJobWorker.ts:59](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L59)

concurrency limit

---

### outputSchema?

```ts
optional outputSchema?: Out;
```

Defined in: [runtime/threadedJobWorker.ts:51](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L51)

Zod schema for variables in the complete command

---

### pollIntervalMs?

```ts
optional pollIntervalMs?: number;
```

Defined in: [runtime/threadedJobWorker.ts:55](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L55)

Backoff between polls - default 1ms

---

### pollTimeoutMs?

```ts
optional pollTimeoutMs?: number;
```

Defined in: [runtime/threadedJobWorker.ts:65](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L65)

The request will be completed when at least one job is activated or after the requestTimeout.
If the requestTimeout = 0, the request will be completed after a default configured timeout in the broker.
To immediately complete the request when no job is activated set the requestTimeout to a negative value

---

### startupJitterMaxSeconds?

```ts
optional startupJitterMaxSeconds?: number;
```

Defined in: [runtime/threadedJobWorker.ts:80](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L80)

Maximum random delay (in seconds) before the worker starts polling.
When multiple application instances restart simultaneously, this spreads out
initial activation requests to avoid saturating the server.
`0` (the default) means no delay.

---

### threadPoolSize?

```ts
optional threadPoolSize?: number;
```

Defined in: [runtime/threadedJobWorker.ts:91](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L91)

Number of threads in the shared pool (used only when the pool is first created;
subsequent workers share the existing pool).
Default: number of CPU cores available to the process.

---

### validateSchemas?

```ts
optional validateSchemas?: boolean;
```

Defined in: [runtime/threadedJobWorker.ts:85](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L85)

Validate any provided input, output, customheader schema
default: false

---

### workerName?

```ts
optional workerName?: string;
```

Defined in: [runtime/threadedJobWorker.ts:73](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L73)

Optional explicit name
