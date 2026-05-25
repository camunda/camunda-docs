---
title: "Type Alias: TaskEither<E, A>"
sidebar_label: "TaskEither<E, A>"
mdx:
  format: md
---

# Type Alias: TaskEither\<E, A\>

:::caution Technical Preview
The Functional Programming API is a **technical preview**. Its surface may change in future releases without following semver.
:::

```ts
type TaskEither<E, A> = () => Promise<Either<E, A>>;
```

## Type Parameters

### E

`E`

### A

`A`

## Returns

`Promise`\<[`Either`](../../index/type-aliases/Either.md)\<`E`, `A`\>\>
