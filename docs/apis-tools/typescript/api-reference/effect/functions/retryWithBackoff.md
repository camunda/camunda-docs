---
title: "Function: retryWithBackoff()"
sidebar_label: "retryWithBackoff()"
mdx:
  format: md
---

# Function: retryWithBackoff()

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
function retryWithBackoff<A, E, R>(effect, opts): Effect<A, E, R>;
```

Retry an effect with exponential backoff (+ jitter), capped attempts, and an
optional predicate over the error.

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

### opts

#### baseDelay?

`Input`

#### max

`number`

#### while?

(`e`) => `boolean`

## Returns

`Effect`\<`A`, `E`, `R`\>
