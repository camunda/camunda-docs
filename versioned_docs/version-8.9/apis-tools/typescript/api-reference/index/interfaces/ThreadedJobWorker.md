---
title: "Interface: ThreadedJobWorker"
sidebar_label: "ThreadedJobWorker"
mdx:
  format: md
---

# Interface: ThreadedJobWorker

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

##### Returns

`number`

---

### busyThreads

#### Get Signature

```ts
get busyThreads(): number;
```

Number of threads currently processing a job (across all workers).

##### Returns

`number`

---

### name

#### Get Signature

```ts
get name(): string;
```

##### Returns

`string`

---

### poolSize

#### Get Signature

```ts
get poolSize(): number;
```

Number of threads in the shared pool.

##### Returns

`number`

---

### ready

#### Get Signature

```ts
get ready(): Promise<void>;
```

Resolves when the shared thread pool has finished initialising.

##### Returns

`Promise`\<`void`\>

---

### stopped

#### Get Signature

```ts
get stopped(): boolean;
```

##### Returns

`boolean`

## Methods

### start()

```ts
start(): void;
```

#### Returns

`void`

---

### stop()

```ts
stop(): void;
```

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
