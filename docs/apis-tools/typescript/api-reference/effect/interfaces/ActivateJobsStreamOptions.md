---
title: "Interface: ActivateJobsStreamOptions<R>"
sidebar_label: "ActivateJobsStreamOptions<R>"
mdx:
  format: md
---

# Interface: ActivateJobsStreamOptions\<R\>

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

## Extended by

- [`EffectWorkerConfig`](EffectWorkerConfig.md)

## Type Parameters

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

---

### fetchVariables?

```ts
readonly optional fetchVariables?: readonly string[];
```

Restrict activation to these variable names.

---

### jobTimeout?

```ts
readonly optional jobTimeout?: Input;
```

Per-job activation lock timeout (server-side). Default `60 seconds`.

---

### maxJobsToActivate?

```ts
readonly optional maxJobsToActivate?: number;
```

Max jobs to activate per poll (the activation batch size). Default `10`.

---

### pollInterval?

```ts
readonly optional pollInterval?: Input;
```

Delay between polls that returned **no** jobs, on the Effect `Clock` (so it is
virtual under `TestClock`). A poll that returns jobs schedules the next poll
immediately. Default `1 second`.

---

### requestTimeout?

```ts
readonly optional requestTimeout?: Input;
```

Long-poll request timeout. `0` (the default) lets the broker hold the request
for its configured default; a negative value returns immediately when idle.

---

### workerName?

```ts
readonly optional workerName?: string;
```

Worker name recorded on the activation request. Defaults to `effect-worker-<type>-<n>`, where `<n>` is an incrementing per-process counter.
