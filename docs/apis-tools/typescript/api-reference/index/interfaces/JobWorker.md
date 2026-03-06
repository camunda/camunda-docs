---
title: "Interface: JobWorker"
sidebar_label: "JobWorker"
mdx:
  format: md
---

# Interface: JobWorker

Defined in: [runtime/jobWorker.ts:79](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L79)

## Accessors

### activeJobs

#### Get Signature

```ts
get activeJobs(): number;
```

Defined in: [runtime/jobWorker.ts:106](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L106)

##### Returns

`number`

***

### name

#### Get Signature

```ts
get name(): string;
```

Defined in: [runtime/jobWorker.ts:103](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L103)

##### Returns

`string`

***

### stopped

#### Get Signature

```ts
get stopped(): boolean;
```

Defined in: [runtime/jobWorker.ts:109](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L109)

##### Returns

`boolean`

## Methods

### start()

```ts
start(): void;
```

Defined in: [runtime/jobWorker.ts:113](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L113)

#### Returns

`void`

***

### stop()

```ts
stop(): void;
```

Defined in: [runtime/jobWorker.ts:127](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L127)

#### Returns

`void`

***

### stopGracefully()

```ts
stopGracefully(opts?): Promise<{
  remainingJobs: number;
  timedOut: boolean;
}>;
```

Defined in: [runtime/jobWorker.ts:146](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobWorker.ts#L146)

Gracefully stop the worker: prevent new polls, allow any in-flight activation to finish
without cancellation, and wait for currently active jobs to drain (be acknowledged) up to waitUpToMs.
If timeout is reached, falls back to hard stop logic (cancels activation if still pending).

#### Parameters

##### opts?

###### checkIntervalMs?

`number`

###### waitUpToMs?

`number`

#### Returns

`Promise`\<\{
  `remainingJobs`: `number`;
  `timedOut`: `boolean`;
\}\>
