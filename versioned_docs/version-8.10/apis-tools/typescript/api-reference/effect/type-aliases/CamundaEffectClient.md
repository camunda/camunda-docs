---
title: "Type Alias: CamundaEffectClient"
sidebar_label: "CamundaEffectClient"
mdx:
  format: md
---

# Type Alias: CamundaEffectClient

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
type CamundaEffectClient = Effectify<CamundaClient>;
```

The Effect-flavoured Camunda client. Every operation returns an `Effect`.
