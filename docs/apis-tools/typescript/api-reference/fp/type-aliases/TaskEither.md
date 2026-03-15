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

Defined in: [fp-ts.ts:12](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/fp-ts.ts#L12)

## Type Parameters

### E

`E`

### A

`A`

## Returns

`Promise`\<[`Either`](../../index/type-aliases/Either.md)\<`E`, `A`\>\>
