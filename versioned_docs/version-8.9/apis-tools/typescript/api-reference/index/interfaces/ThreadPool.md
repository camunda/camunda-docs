---
title: "Interface: ThreadPool"
sidebar_label: "ThreadPool"
mdx:
  format: md
---

# Interface: ThreadPool

## Accessors

### busyCount

#### Get Signature

```ts
get busyCount(): number;
```

Number of threads currently processing a job.

##### Returns

`number`

---

### idleCount

#### Get Signature

```ts
get idleCount(): number;
```

Number of threads that are ready and idle.

##### Returns

`number`

---

### onThreadReady

#### Set Signature

```ts
set onThreadReady(cb): void;
```

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

Resolves when all threads have been spawned and signalled ready.

##### Returns

`Promise`\<`void`\>

---

### size

#### Get Signature

```ts
get size(): number;
```

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

Find the first ready & idle thread.

#### Returns

`PoolWorker` \| `undefined`

---

### terminate()

```ts
terminate(): void;
```

Terminate all threads and reject any in-flight tasks.

#### Returns

`void`
