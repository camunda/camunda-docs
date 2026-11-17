---
title: "Function: layer()"
sidebar_label: "layer()"
mdx:
  format: md
---

# Function: layer()

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
function layer(options?): Layer<CamundaEffect>;
```

A `Layer` that constructs a [CamundaEffectClient](../type-aliases/CamundaEffectClient.md) and provides it as the
[CamundaEffect](../classes/CamundaEffect.md) service. Swap in a test double by providing a different
`Layer` for the same tag.

## Parameters

### options?

[`CamundaOptions`](../../index/interfaces/CamundaOptions.md)

## Returns

`Layer`\<[`CamundaEffect`](../classes/CamundaEffect.md)\>
