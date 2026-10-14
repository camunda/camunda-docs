---
title: "Function: withTimeout()"
sidebar_label: "withTimeout()"
mdx:
  format: md
---

# Function: withTimeout()

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
function withTimeout<A, E, R>(
  effect,
  duration,
  onTimeout?
): Effect<A, EventualConsistencyTimeout | E, R>;
```

Fail an effect with a real interruption if it does not settle within `duration`
(true interruption, not a best-effort `Promise.race`).

## Type Parameters

### A

`A`

### E

`E`

### R

`R`

## Parameters

### effect

`Effect`\<`A`, `E`, `R`\>

### duration

`Input`

### onTimeout?

() =>
\| [`EventualConsistencyTimeout`](../classes/EventualConsistencyTimeout.md)
\| `E`

## Returns

`Effect`\<`A`,
\| [`EventualConsistencyTimeout`](../classes/EventualConsistencyTimeout.md)
\| `E`, `R`\>
