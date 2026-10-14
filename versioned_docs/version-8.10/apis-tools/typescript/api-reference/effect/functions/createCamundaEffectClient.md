---
title: "Function: createCamundaEffectClient()"
sidebar_label: "createCamundaEffectClient()"
mdx:
  format: md
---

# Function: createCamundaEffectClient()

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
function createCamundaEffectClient(options?): CamundaEffectClient;
```

Create an Effect-flavoured Camunda client.

Every `CamundaClient` method becomes `(...args) => Effect.Effect<Awaited<R>,
DomainError, never>`. Failures are narrowed into the tagged [DomainError](../type-aliases/DomainError.md)
union so callers use `Effect.catchTag`/`catchTags`. The underlying throwing
client is reachable via the `.inner` escape hatch.

## Parameters

### options?

[`CamundaOptions`](../../index/interfaces/CamundaOptions.md)

## Returns

[`CamundaEffectClient`](../type-aliases/CamundaEffectClient.md)

## Description

Camunda Effect Client. See the README and [this test](https://github.com/camunda/orchestration-cluster-api-js/blob/main/tests-integration/effect.test.ts) for example usage.
