---
title: "Function: withTimeoutTE()"
sidebar_label: "withTimeoutTE()"
mdx:
  format: md
---

# Function: withTimeoutTE()

:::caution Technical Preview
The Functional Programming API is a **technical preview**. Its surface may change in future releases without following semver.
:::


```ts
function withTimeoutTE<E, A>(
   task, 
   ms, 
onTimeout?): TaskEither<E, A>;
```

Defined in: [fp-ts.ts:155](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/fp-ts.ts#L155)

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### task

[`TaskEither`](../type-aliases/TaskEither.md)\<`E`, `A`\>

### ms

`number`

### onTimeout?

() => `E`

## Returns

[`TaskEither`](../type-aliases/TaskEither.md)\<`E`, `A`\>
