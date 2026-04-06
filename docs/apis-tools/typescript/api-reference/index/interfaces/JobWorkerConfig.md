---
title: "Interface: JobWorkerConfig<In, Out, Headers>"
sidebar_label: "JobWorkerConfig<In, Out, Headers>"
mdx:
  format: md
---

# Interface: JobWorkerConfig\<In, Out, Headers\>

Defined in: [runtime/jobWorker.ts:13](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L13)

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

Defined in: [runtime/jobWorker.ts:28](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L28)

Immediately start polling for work - default `true`

---

### customHeadersSchema?

```ts
optional customHeadersSchema?: Headers;
```

Defined in: [runtime/jobWorker.ts:23](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L23)

Zod schema for custom headers in the activated job

---

### fetchVariables?

```ts
optional fetchVariables?: In extends ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>> ? Extract<keyof output<In>, string>[] : string[];
```

Defined in: [runtime/jobWorker.ts:43](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L43)

Optional list of variable names to fetch during activation

---

### inputSchema?

```ts
optional inputSchema?: In;
```

Defined in: [runtime/jobWorker.ts:19](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L19)

Zod schema for variables in the activated job

---

### jobHandler

```ts
jobHandler: (job) => "JOB_ACTION_RECEIPT" | Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobWorker.ts:26](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L26)

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

Defined in: [runtime/jobWorker.ts:39](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L39)

Job activation timeout — falls back to CAMUNDA_WORKER_TIMEOUT env var

---

### jobType

```ts
jobType: string;
```

Defined in: [runtime/jobWorker.ts:41](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L41)

Zeebe job type

---

### ~~maxBackoffTimeMs?~~

```ts
optional maxBackoffTimeMs?: number;
```

Defined in: [runtime/jobWorker.ts:45](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L45)

#### Deprecated

Not used; pacing handled by long polling + client backpressure. Present only for migration compatibility.

---

### maxParallelJobs?

```ts
optional maxParallelJobs?: number;
```

Defined in: [runtime/jobWorker.ts:30](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L30)

concurrency limit — falls back to CAMUNDA_WORKER_MAX_CONCURRENT_JOBS env var

---

### outputSchema?

```ts
optional outputSchema?: Out;
```

Defined in: [runtime/jobWorker.ts:21](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L21)

Zod schema for variables in the complete command

---

### pollIntervalMs?

```ts
optional pollIntervalMs?: number;
```

Defined in: [runtime/jobWorker.ts:25](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L25)

Backoff between polls - default 1ms

---

### pollTimeoutMs?

```ts
optional pollTimeoutMs?: number;
```

Defined in: [runtime/jobWorker.ts:37](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L37)

The request will be completed when at least one job is activated or after the requestTimeout.
If the requestTimeout = 0, the request will be completed after a default configured timeout in the broker.
To immediately complete the request when no job is activated set the requestTimeout to a negative value

---

### startupJitterMaxSeconds?

```ts
optional startupJitterMaxSeconds?: number;
```

Defined in: [runtime/jobWorker.ts:54](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L54)

Maximum random delay (in seconds) before the worker starts polling.
When multiple application instances restart simultaneously, this spreads out
initial activation requests to avoid saturating the server.
`0` (the default) means no delay.

---

### validateSchemas?

```ts
optional validateSchemas?: boolean;
```

Defined in: [runtime/jobWorker.ts:59](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L59)

Validate any provided input, output, customheader schema
default: false

---

### workerName?

```ts
optional workerName?: string;
```

Defined in: [runtime/jobWorker.ts:47](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L47)

Optional explicit name
