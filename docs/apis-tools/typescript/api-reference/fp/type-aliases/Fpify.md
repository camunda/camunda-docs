---
title: "Type Alias: Fpify<C>"
sidebar_label: "Fpify<C>"
mdx:
  format: md
---

# Type Alias: Fpify\<C\>

:::caution Technical Preview
The Functional Programming API is a **technical preview**. Its surface may change in future releases without following semver.
:::

```ts
type Fpify<C> = {
  [K in FnKeys<C>]: C[K] extends (a: infer A) => infer R
    ? (a: A) => TaskEither<DomainError, Awaited<R>>
    : never;
} & object & { [K in Exclude<keyof C, FnKeys<C>>]: C[K] };
```

Defined in: [fp-ts.ts:73](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/fp-ts.ts#L73)

## Type Declaration

### inner

```ts
inner: C;
```

## Type Parameters

### C

`C`
