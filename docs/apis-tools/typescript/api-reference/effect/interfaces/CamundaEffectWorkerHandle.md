---
title: "Interface: CamundaEffectWorkerHandle"
sidebar_label: "CamundaEffectWorkerHandle"
mdx:
  format: md
---

# Interface: CamundaEffectWorkerHandle

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

A handle to a running Effect worker.

## Properties

### interrupt

```ts
readonly interrupt: Effect<void>;
```

Interrupt the worker (also happens automatically when the owning scope closes).

---

### join

```ts
readonly join: Effect<void, DomainError>;
```

Completes when the worker loop ends (only on a fatal, non-retryable activation error).

---

### type

```ts
readonly type: string;
```

The job type this worker activates.
