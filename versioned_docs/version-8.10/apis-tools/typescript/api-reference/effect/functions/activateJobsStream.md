---
title: "Function: activateJobsStream()"
sidebar_label: "activateJobsStream()"
mdx:
  format: md
---

# Function: activateJobsStream()

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
function activateJobsStream<R>(
  type,
  options?
): Stream<ActivatedJobResult, DomainError, CamundaEffect | R>;
```

A `Stream` of activated jobs of `type`. Repeatedly calls `activateJobs` (through the
`/effect` client `Layer`, i.e. the same backpressure-aware runtime the Promise worker
uses) and emits each activated job. The between-empty-polls delay and the optional
activation-retry `Schedule` both run on the Effect `Clock`, so `TestClock.adjust`
advances them deterministically in tests.

## Type Parameters

### R

`R` = `never`

## Parameters

### type

`string`

### options?

[`ActivateJobsStreamOptions`](../interfaces/ActivateJobsStreamOptions.md)\<`R`\> = `{}`

## Returns

`Stream`\<[`ActivatedJobResult`](../../index/type-aliases/ActivatedJobResult.md), [`DomainError`](../type-aliases/DomainError.md), [`CamundaEffect`](../classes/CamundaEffect.md) \| `R`\>
