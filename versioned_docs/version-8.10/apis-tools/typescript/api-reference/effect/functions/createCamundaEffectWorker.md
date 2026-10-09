---
title: "Function: createCamundaEffectWorker()"
sidebar_label: "createCamundaEffectWorker()"
mdx:
  format: md
---

# Function: createCamundaEffectWorker()

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
function createCamundaEffectWorker<A, R>(
  config
): Effect<CamundaEffectWorkerHandle, never, CamundaEffect | R | Scope>;
```

Create and start an Effect job worker, forked into the current `Scope`. The worker
runs until its scope closes (or [CamundaEffectWorkerHandle.interrupt](../interfaces/CamundaEffectWorkerHandle.md#interrupt) is run),
at which point it is interrupted and any in-flight job's lease is released.

Depends on the [CamundaEffect](../classes/CamundaEffect.md) service — provide the `/effect` client `layer`.

## Type Parameters

### A

`A` _extends_ [`CompleteVars`](../type-aliases/CompleteVars.md)

### R

`R` = `never`

## Parameters

### config

[`EffectWorkerConfig`](../interfaces/EffectWorkerConfig.md)\<`A`, `R`\>

## Returns

`Effect`\<[`CamundaEffectWorkerHandle`](../interfaces/CamundaEffectWorkerHandle.md), `never`, [`CamundaEffect`](../classes/CamundaEffect.md) \| `R` \| `Scope`\>

## Description

Camunda Effect Worker. See the README and [this test](https://github.com/camunda/orchestration-cluster-api-js/blob/main/tests-integration/effect-worker.test.ts) for example usage.
