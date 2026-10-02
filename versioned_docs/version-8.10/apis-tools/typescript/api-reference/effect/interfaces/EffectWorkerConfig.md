---
title: "Interface: EffectWorkerConfig<A, R>"
sidebar_label: "EffectWorkerConfig<A, R>"
mdx:
  format: md
---

# Interface: EffectWorkerConfig\<A, R\>

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

## Extends

- [`ActivateJobsStreamOptions`](ActivateJobsStreamOptions.md)\<`R`\>

## Type Parameters

### A

`A` _extends_ [`CompleteVars`](../type-aliases/CompleteVars.md)

### R

`R` = `never`

## Properties

### activationRetrySchedule?

```ts
readonly optional activationRetrySchedule?: Schedule<unknown, DomainError, never, R>;
```

`Schedule` used to back off and retry a **failed activation request** (transport
outage, broker restart, transient server error). Runs on the Effect `Clock`.
When omitted, an activation failure fails the stream.

#### Inherited from

[`ActivateJobsStreamOptions`](ActivateJobsStreamOptions.md).[`activationRetrySchedule`](ActivateJobsStreamOptions.md#activationretryschedule)

---

### concurrency?

```ts
readonly optional concurrency?: number | "unbounded";
```

Max jobs processed concurrently (handler parallelism / backpressure). The
activation loop will not pull faster than handlers drain, and the activation
batch is capped to this value (when it is a finite number) so the worker never
leases more jobs than it can process at once. Default: the value of
[ActivateJobsStreamOptions.maxJobsToActivate](ActivateJobsStreamOptions.md#maxjobstoactivate) (or `10`).

---

### fetchVariables?

```ts
readonly optional fetchVariables?: readonly string[];
```

Restrict activation to these variable names.

#### Inherited from

[`ActivateJobsStreamOptions`](ActivateJobsStreamOptions.md).[`fetchVariables`](ActivateJobsStreamOptions.md#fetchvariables)

---

### handler

```ts
readonly handler: JobHandler<A, R>;
```

The Effect job handler.

---

### handlerRetrySchedule?

```ts
readonly optional handlerRetrySchedule?: Schedule<unknown, JobError, never, R>;
```

`Schedule` used to retry the **handler** in-process on a [RetryableJobError](../classes/RetryableJobError.md)
before the job is failed back to the broker. Runs on the Effect `Clock`
(virtual under `TestClock`). A [TerminalJobError](../classes/TerminalJobError.md) is never retried.

---

### jobTimeout?

```ts
readonly optional jobTimeout?: Input;
```

Per-job activation lock timeout (server-side). Default `60 seconds`.

#### Inherited from

[`ActivateJobsStreamOptions`](ActivateJobsStreamOptions.md).[`jobTimeout`](ActivateJobsStreamOptions.md#jobtimeout)

---

### maxJobsToActivate?

```ts
readonly optional maxJobsToActivate?: number;
```

Max jobs to activate per poll (the activation batch size). Default `10`.

#### Inherited from

[`ActivateJobsStreamOptions`](ActivateJobsStreamOptions.md).[`maxJobsToActivate`](ActivateJobsStreamOptions.md#maxjobstoactivate)

---

### pollInterval?

```ts
readonly optional pollInterval?: Input;
```

Delay between polls that returned **no** jobs, on the Effect `Clock` (so it is
virtual under `TestClock`). A poll that returns jobs schedules the next poll
immediately. Default `1 second`.

#### Inherited from

[`ActivateJobsStreamOptions`](ActivateJobsStreamOptions.md).[`pollInterval`](ActivateJobsStreamOptions.md#pollinterval)

---

### requestTimeout?

```ts
readonly optional requestTimeout?: Input;
```

Long-poll request timeout. `0` (the default) lets the broker hold the request
for its configured default; a negative value returns immediately when idle.

#### Inherited from

[`ActivateJobsStreamOptions`](ActivateJobsStreamOptions.md).[`requestTimeout`](ActivateJobsStreamOptions.md#requesttimeout)

---

### type

```ts
readonly type: string;
```

The job type to activate.

---

### workerName?

```ts
readonly optional workerName?: string;
```

Worker name recorded on the activation request. Defaults to `effect-worker-<type>-<n>`, where `<n>` is an incrementing per-process counter.

#### Inherited from

[`ActivateJobsStreamOptions`](ActivateJobsStreamOptions.md).[`workerName`](ActivateJobsStreamOptions.md#workername)
