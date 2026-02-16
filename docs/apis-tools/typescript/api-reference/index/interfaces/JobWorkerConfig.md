---
title: "Interface: JobWorkerConfig<In, Out, Headers>"
sidebar_label: "JobWorkerConfig<In, Out, Headers>"
mdx:
  format: md
---

# Interface: JobWorkerConfig\<In, Out, Headers\>

Defined in: [runtime/jobWorker.ts:14](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L14)

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
optional autoStart: boolean;
```

Defined in: [runtime/jobWorker.ts:29](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L29)

Immediately start polling for work - default `true`

---

### customHeadersSchema?

```ts
optional customHeadersSchema: Headers;
```

Defined in: [runtime/jobWorker.ts:24](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L24)

Zod schema for custom headers in the activated job

---

### fetchVariables?

```ts
optional fetchVariables: In extends ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>> ? Extract<keyof output<In<In>>, string>[] : string[];
```

Defined in: [runtime/jobWorker.ts:44](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L44)

Optional list of variable names to fetch during activation

---

### inputSchema?

```ts
optional inputSchema: In;
```

Defined in: [runtime/jobWorker.ts:20](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L20)

Zod schema for variables in the activated job

---

### jobHandler()

```ts
jobHandler: (job) => "JOB_ACTION_RECEIPT" | Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobWorker.ts:27](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L27)

#### Parameters

##### job

[`Job`](../type-aliases/Job.md)\<`In`, `Headers`\>

#### Returns

`"JOB_ACTION_RECEIPT"` \| `Promise`\<`"JOB_ACTION_RECEIPT"`\>

---

### jobTimeoutMs

```ts
jobTimeoutMs: number;
```

Defined in: [runtime/jobWorker.ts:40](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L40)

Job activation timeout

---

### jobType

```ts
jobType: string;
```

Defined in: [runtime/jobWorker.ts:42](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L42)

Zeebe job type

---

### ~~maxBackoffTimeMs?~~

```ts
optional maxBackoffTimeMs: number;
```

Defined in: [runtime/jobWorker.ts:46](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L46)

#### Deprecated

Not used; pacing handled by long polling + client backpressure. Present only for migration compatibility.

---

### maxParallelJobs

```ts
maxParallelJobs: number;
```

Defined in: [runtime/jobWorker.ts:31](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L31)

concurrency limit

---

### outputSchema?

```ts
optional outputSchema: Out;
```

Defined in: [runtime/jobWorker.ts:22](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L22)

Zod schema for variables in the complete command

---

### pollIntervalMs?

```ts
optional pollIntervalMs: number;
```

Defined in: [runtime/jobWorker.ts:26](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L26)

Backoff between polls - default 1ms

---

### pollTimeoutMs?

```ts
optional pollTimeoutMs: number;
```

Defined in: [runtime/jobWorker.ts:38](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L38)

The request will be completed when at least one job is activated or after the requestTimeout.
If the requestTimeout = 0, the request will be completed after a default configured timeout in the broker.
To immediately complete the request when no job is activated set the requestTimeout to a negative value

---

### validateSchemas?

```ts
optional validateSchemas: boolean;
```

Defined in: [runtime/jobWorker.ts:53](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L53)

Validate any provided input, output, customheader schema
default: false

---

### workerName?

```ts
optional workerName: string;
```

Defined in: [runtime/jobWorker.ts:48](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L48)

Optional explicit name
