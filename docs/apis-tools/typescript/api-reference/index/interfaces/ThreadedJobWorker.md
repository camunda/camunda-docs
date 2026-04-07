---
title: "Interface: ThreadedJobWorker"
sidebar_label: "ThreadedJobWorker"
mdx:
  format: md
---

# Interface: ThreadedJobWorker

Defined in: [runtime/threadedJobWorker.ts:106](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L106)

A job worker that runs handler logic in a shared pool of worker_threads,
keeping the main Node.js event loop free for polling and I/O.

The thread pool is owned by CamundaClient and shared across all threaded workers.
Each thread is generic — the handler module path is sent with each job,
and threads cache loaded handlers by module path.

## Accessors

### activeJobs

#### Get Signature

```ts
get activeJobs(): number;
```

Defined in: [runtime/threadedJobWorker.ts:148](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L148)

##### Returns

`number`

---

### busyThreads

#### Get Signature

```ts
get busyThreads(): number;
```

Defined in: [runtime/threadedJobWorker.ts:159](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L159)

Number of threads currently processing a job (across all workers).

##### Returns

`number`

---

### name

#### Get Signature

```ts
get name(): string;
```

Defined in: [runtime/threadedJobWorker.ts:145](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L145)

##### Returns

`string`

---

### poolSize

#### Get Signature

```ts
get poolSize(): number;
```

Defined in: [runtime/threadedJobWorker.ts:155](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L155)

Number of threads in the shared pool.

##### Returns

`number`

---

### ready

#### Get Signature

```ts
get ready(): Promise<void>;
```

Defined in: [runtime/threadedJobWorker.ts:163](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L163)

Resolves when the shared thread pool has finished initialising.

##### Returns

`Promise`\<`void`\>

---

### stopped

#### Get Signature

```ts
get stopped(): boolean;
```

Defined in: [runtime/threadedJobWorker.ts:151](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L151)

##### Returns

`boolean`

## Methods

### start()

```ts
start(): void;
```

Defined in: [runtime/threadedJobWorker.ts:167](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L167)

#### Returns

`void`

---

### stop()

```ts
stop(): void;
```

Defined in: [runtime/threadedJobWorker.ts:181](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L181)

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

Defined in: [runtime/threadedJobWorker.ts:195](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadedJobWorker.ts#L195)

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
