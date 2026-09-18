---
title: "Function: eventually()"
sidebar_label: "eventually()"
mdx:
  format: md
---

# Function: eventually()

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
function eventually<A, E, R>(
  effect,
  predicate,
  opts
): Effect<A, EventualConsistencyTimeout | E, R>;
```

Poll `effect` on the Effect `Clock` until `predicate` holds, timing out to
[EventualConsistencyTimeout](../classes/EventualConsistencyTimeout.md) once `waitUpTo` elapses. Because it uses the
Effect `Clock` (not `Date.now`/`setTimeout`), `TestClock.adjust` advances it
deterministically in tests — no real-clock burn.

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

### predicate

(`a`) => `boolean`

### opts

#### interval?

`Input`

#### waitUpTo

`Input`

## Returns

`Effect`\<`A`,
\| [`EventualConsistencyTimeout`](../classes/EventualConsistencyTimeout.md)
\| `E`, `R`\>
