---
title: "Class: CamundaEffect"
sidebar_label: "CamundaEffect"
mdx:
  format: md
---

# Class: CamundaEffect

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

`Context` service key for the Effect Camunda client. Compose worker/orchestration
code against this tag and provide [layer](../functions/layer.md) (or a test double) via `Layer`.

## Extends

- `Shape`\<`"CamundaEffect"`, [`CamundaEffectClient`](../type-aliases/CamundaEffectClient.md), `this`\>

## Constructors

### Constructor

```ts
new CamundaEffect(_): CamundaEffect;
```

#### Parameters

##### \_

`never`

#### Returns

`CamundaEffect`

#### Inherited from

```ts
Context.Service<CamundaEffect, CamundaEffectClient>()("CamundaEffect")
  .constructor;
```
