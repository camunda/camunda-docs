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

Defined in: [fp-ts.ts:12](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/fp-ts.ts#L12)

## Type Parameters

### E

`E`

### A

`A`

## Returns

`Promise`\<[`Either`](../../index/type-aliases/Either.md)\<`E`, `A`\>\>
