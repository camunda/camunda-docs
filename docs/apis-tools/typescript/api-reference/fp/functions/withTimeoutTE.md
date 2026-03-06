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

Defined in: [fp-ts.ts:155](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/fp-ts.ts#L155)

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
