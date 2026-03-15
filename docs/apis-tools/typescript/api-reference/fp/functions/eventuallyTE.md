---
title: "Function: eventuallyTE()"
sidebar_label: "eventuallyTE()"
mdx:
  format: md
---

# Function: eventuallyTE()

:::caution Technical Preview
The Functional Programming API is a **technical preview**. Its surface may change in future releases without following semver.
:::


```ts
function eventuallyTE<E, A>(
   thunk, 
   predicate, 
opts): TaskEither<E, A>;
```

Defined in: [fp-ts.ts:177](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/fp-ts.ts#L177)

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### thunk

() => `Promise`\<`A`\>

### predicate

(`a`) => `boolean` \| `Promise`\<`boolean`\>

### opts

#### intervalMs?

`number`

#### waitUpToMs

`number`

## Returns

[`TaskEither`](../type-aliases/TaskEither.md)\<`E`, `A`\>
