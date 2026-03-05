---
title: "Type Alias: TaskEither()<E, A>"
sidebar_label: "TaskEither()<E, A>"
mdx:
  format: md
---

# Type Alias: TaskEither()\<E, A\>

:::caution Technical Preview
The Functional Programming API is a **technical preview**. Its surface may change in future releases without following semver.
:::


```ts
type TaskEither<E, A> = () => Promise<Either<E, A>>;
```

Defined in: [fp-ts.ts:12](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/fp-ts.ts#L12)

## Type Parameters

### E

`E`

### A

`A`

## Returns

`Promise`\<[`Either`](../../index/type-aliases/Either.md)\<`E`, `A`\>\>
