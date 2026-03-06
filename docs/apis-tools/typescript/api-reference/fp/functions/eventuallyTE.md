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

Defined in: [fp-ts.ts:177](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/fp-ts.ts#L177)

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
