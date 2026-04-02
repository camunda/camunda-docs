---
title: "Interface: ThreadPool"
sidebar_label: "ThreadPool"
mdx:
  format: md
---

# Interface: ThreadPool

Defined in: [runtime/threadPool.ts:33](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadPool.ts#L33)

## Accessors

### busyCount

#### Get Signature

```ts
get busyCount(): number;
```

Defined in: [runtime/threadPool.ts:62](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadPool.ts#L62)

Number of threads currently processing a job.

##### Returns

`number`

---

### idleCount

#### Get Signature

```ts
get idleCount(): number;
```

Defined in: [runtime/threadPool.ts:67](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadPool.ts#L67)

Number of threads that are ready and idle.

##### Returns

`number`

---

### onThreadReady

#### Set Signature

```ts
set onThreadReady(cb): void;
```

Defined in: [runtime/threadPool.ts:72](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadPool.ts#L72)

Register a callback invoked whenever a thread becomes ready or idle.

##### Parameters

###### cb

(() => `void`) \| `undefined`

##### Returns

`void`

---

### ready

#### Get Signature

```ts
get ready(): Promise<void>;
```

Defined in: [runtime/threadPool.ts:52](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadPool.ts#L52)

Resolves when all threads have been spawned and signalled ready.

##### Returns

`Promise`\<`void`\>

---

### size

#### Get Signature

```ts
get size(): number;
```

Defined in: [runtime/threadPool.ts:57](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadPool.ts#L57)

Total number of threads in the pool.

##### Returns

`number`

## Methods

### dispatch()

```ts
dispatch(
   pw,
   jobData,
   handlerModule,
callbacks): Promise<void>;
```

Defined in: [runtime/threadPool.ts:85](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadPool.ts#L85)

Dispatch a serialized job to a specific idle worker.
The caller is responsible for checking idleness first.

#### Parameters

##### pw

`PoolWorker`

##### jobData

`Record`\<`string`, `unknown`\>

##### handlerModule

`string`

##### callbacks

###### onComplete

(`completionAction?`) => `void`

###### onError

(`err`) => `void`

#### Returns

`Promise`\<`void`\>

---

### getIdleWorker()

```ts
getIdleWorker(): PoolWorker | undefined;
```

Defined in: [runtime/threadPool.ts:77](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadPool.ts#L77)

Find the first ready & idle thread.

#### Returns

`PoolWorker` \| `undefined`

---

### terminate()

```ts
terminate(): void;
```

Defined in: [runtime/threadPool.ts:127](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/threadPool.ts#L127)

Terminate all threads and reject any in-flight tasks.

#### Returns

`void`
