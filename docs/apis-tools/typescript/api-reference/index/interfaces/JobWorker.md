---
title: "Interface: JobWorker"
sidebar_label: "JobWorker"
mdx:
  format: md
---

# Interface: JobWorker

Defined in: [runtime/jobWorker.ts:78](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L78)

## Accessors

### activeJobs

#### Get Signature

```ts
get activeJobs(): number;
```

Defined in: [runtime/jobWorker.ts:119](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L119)

##### Returns

`number`

---

### name

#### Get Signature

```ts
get name(): string;
```

Defined in: [runtime/jobWorker.ts:116](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L116)

##### Returns

`string`

---

### stopped

#### Get Signature

```ts
get stopped(): boolean;
```

Defined in: [runtime/jobWorker.ts:122](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L122)

##### Returns

`boolean`

## Methods

### start()

```ts
start(): void;
```

Defined in: [runtime/jobWorker.ts:126](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L126)

#### Returns

`void`

---

### stop()

```ts
stop(): void;
```

Defined in: [runtime/jobWorker.ts:140](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L140)

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

Defined in: [runtime/jobWorker.ts:159](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobWorker.ts#L159)

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
