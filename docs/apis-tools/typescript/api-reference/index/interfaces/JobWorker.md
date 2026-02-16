---
title: "Interface: JobWorker"
sidebar_label: "JobWorker"
mdx:
  format: md
---

# Interface: JobWorker

Defined in: [runtime/jobWorker.ts:72](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L72)

## Accessors

### activeJobs

#### Get Signature

```ts
get activeJobs(): number;
```

Defined in: [runtime/jobWorker.ts:99](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L99)

##### Returns

`number`

---

### name

#### Get Signature

```ts
get name(): string;
```

Defined in: [runtime/jobWorker.ts:96](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L96)

##### Returns

`string`

---

### stopped

#### Get Signature

```ts
get stopped(): boolean;
```

Defined in: [runtime/jobWorker.ts:102](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L102)

##### Returns

`boolean`

## Methods

### start()

```ts
start(): void;
```

Defined in: [runtime/jobWorker.ts:106](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L106)

#### Returns

`void`

---

### stop()

```ts
stop(): void;
```

Defined in: [runtime/jobWorker.ts:113](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L113)

#### Returns

`void`

---

### stopGracefully()

```ts
stopGracefully(opts?): Promise<{
  remainingJobs: number;
  timedOut: boolean;
}>;
```

Defined in: [runtime/jobWorker.ts:132](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobWorker.ts#L132)

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
