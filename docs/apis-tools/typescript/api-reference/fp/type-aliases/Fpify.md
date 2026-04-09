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

## Type Declaration

### inner

```ts
inner: C;
```

## Type Parameters

### C

`C`
