---
title: "Interface: JobWorker"
sidebar_label: "JobWorker"
mdx:
  format: md
---

# Interface: JobWorker

## Accessors

### activeJobs

#### Get Signature

```ts
get activeJobs(): number;
```

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

Begin polling for jobs. Safe to call at any point: the request is buffered
until the transport is ready, and redundant calls (including an explicit
call on an `autoStart` worker) are dropped rather than starting a second
poll loop. Once the worker is stopped, `start()` is a no-op.

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
