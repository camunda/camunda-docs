---
title: "Interface: JobWorkerConfig<In, Out, Headers>"
sidebar_label: "JobWorkerConfig<In, Out, Headers>"
mdx:
  format: md
---

# Interface: JobWorkerConfig\<In, Out, Headers\>

Defined in: [runtime/jobWorker.ts:14](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L14)

## Type Parameters

### In

`In` *extends* `z.ZodTypeAny` = `any`

### Out

`Out` *extends* `z.ZodTypeAny` = `any`

### Headers

`Headers` *extends* `z.ZodTypeAny` = `any`

## Properties

### autoStart?

```ts
optional autoStart: boolean;
```

Defined in: [runtime/jobWorker.ts:29](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L29)

Immediately start polling for work - default `true`

***

### customHeadersSchema?

```ts
optional customHeadersSchema: Headers;
```

Defined in: [runtime/jobWorker.ts:24](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L24)

Zod schema for custom headers in the activated job

***

### fetchVariables?

```ts
optional fetchVariables: In extends ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>> ? Extract<keyof output<In<In>>, string>[] : string[];
```

Defined in: [runtime/jobWorker.ts:44](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L44)

Optional list of variable names to fetch during activation

***

### inputSchema?

```ts
optional inputSchema: In;
```

Defined in: [runtime/jobWorker.ts:20](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L20)

Zod schema for variables in the activated job

***

### jobHandler()

```ts
jobHandler: (job) => "JOB_ACTION_RECEIPT" | Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobWorker.ts:27](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L27)

#### Parameters

##### job

[`Job`](../type-aliases/Job.md)\<`In`, `Headers`\>

#### Returns

`"JOB_ACTION_RECEIPT"` \| `Promise`\<`"JOB_ACTION_RECEIPT"`\>

***

### jobTimeoutMs

```ts
jobTimeoutMs: number;
```

Defined in: [runtime/jobWorker.ts:40](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L40)

Job activation timeout

***

### jobType

```ts
jobType: string;
```

Defined in: [runtime/jobWorker.ts:42](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L42)

Zeebe job type

***

### ~~maxBackoffTimeMs?~~

```ts
optional maxBackoffTimeMs: number;
```

Defined in: [runtime/jobWorker.ts:46](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L46)

#### Deprecated

Not used; pacing handled by long polling + client backpressure. Present only for migration compatibility.

***

### maxParallelJobs

```ts
maxParallelJobs: number;
```

Defined in: [runtime/jobWorker.ts:31](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L31)

concurrency limit

***

### outputSchema?

```ts
optional outputSchema: Out;
```

Defined in: [runtime/jobWorker.ts:22](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L22)

Zod schema for variables in the complete command

***

### pollIntervalMs?

```ts
optional pollIntervalMs: number;
```

Defined in: [runtime/jobWorker.ts:26](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L26)

Backoff between polls - default 1ms

***

### pollTimeoutMs?

```ts
optional pollTimeoutMs: number;
```

Defined in: [runtime/jobWorker.ts:38](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L38)

The request will be completed when at least one job is activated or after the requestTimeout.
If the requestTimeout = 0, the request will be completed after a default configured timeout in the broker.
To immediately complete the request when no job is activated set the requestTimeout to a negative value

***

### startupJitterMaxSeconds?

```ts
optional startupJitterMaxSeconds: number;
```

Defined in: [runtime/jobWorker.ts:55](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L55)

Maximum random delay (in seconds) before the worker starts polling.
When multiple application instances restart simultaneously, this spreads out
initial activation requests to avoid saturating the server.
`0` (the default) means no delay.

***

### validateSchemas?

```ts
optional validateSchemas: boolean;
```

Defined in: [runtime/jobWorker.ts:60](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L60)

Validate any provided input, output, customheader schema
default: false

***

### workerName?

```ts
optional workerName: string;
```

Defined in: [runtime/jobWorker.ts:48](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L48)

Optional explicit name
