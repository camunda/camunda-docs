---
title: "Function: workerLayer()"
sidebar_label: "workerLayer()"
mdx:
  format: md
---

# Function: workerLayer()

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
function workerLayer<A, R>(config): Layer<never, never, CamundaEffect | R>;
```

A `Layer` that runs a Camunda Effect worker for the layer's lifetime. Compose it
with the `/effect` client `layer` (which provides its [CamundaEffect](../classes/CamundaEffect.md)
dependency) plus a `Layer` for the handler's own requirements `R`.

## Type Parameters

### A

`A` _extends_ [`CompleteVars`](../type-aliases/CompleteVars.md)

### R

`R` = `never`

## Parameters

### config

[`EffectWorkerConfig`](../interfaces/EffectWorkerConfig.md)\<`A`, `R`\>

## Returns

`Layer`\<`never`, `never`, [`CamundaEffect`](../classes/CamundaEffect.md) \| `R`\>
