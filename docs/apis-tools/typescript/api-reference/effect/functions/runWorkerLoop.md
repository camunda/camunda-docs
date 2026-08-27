---
title: "Function: runWorkerLoop()"
sidebar_label: "runWorkerLoop()"
mdx:
  format: md
---

# Function: runWorkerLoop()

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
function runWorkerLoop<A, R>(
  config
): Effect<void, DomainError, CamundaEffect | R>;
```

The worker loop: drains [activateJobsStream](activateJobsStream.md), running the handler for each job
with bounded `concurrency` (the backpressure knob), and acknowledging via
`completeJob`/`failJob`/`throwJobError` per the handler's typed outcome.

## Type Parameters

### A

`A` _extends_ [`CompleteVars`](../type-aliases/CompleteVars.md)

### R

`R` = `never`

## Parameters

### config

[`EffectWorkerConfig`](../interfaces/EffectWorkerConfig.md)\<`A`, `R`\>

## Returns

`Effect`\<`void`, [`DomainError`](../type-aliases/DomainError.md), [`CamundaEffect`](../classes/CamundaEffect.md) \| `R`\>
