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
type Fpify<C> = { [K in FnKeys<C>]: C[K] extends (a: infer A) => infer R ? (a: A) => TaskEither<DomainError, Awaited<R>> : never } & object & { [K in Exclude<keyof C, FnKeys<C>>]: C[K] };
```

Defined in: [fp-ts.ts:73](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/fp-ts.ts#L73)

## Type Declaration

### inner

```ts
inner: C;
```

## Type Parameters

### C

`C`
