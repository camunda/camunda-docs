---
title: "Type Alias: Effectify<C>"
sidebar_label: "Effectify<C>"
mdx:
  format: md
---

# Type Alias: Effectify\<C\>

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
type Effectify<C> = { [K in FnKeys<C>]: EffectifyMethod<C[K]> } & object & {
    [K in Exclude<keyof C, FnKeys<C>>]: C[K];
  };
```

Maps every method of `C` to an Effect-returning method, preserving non-fn members.

## Type Declaration

### inner

```ts
inner: C;
```

## Type Parameters

### C

`C`
