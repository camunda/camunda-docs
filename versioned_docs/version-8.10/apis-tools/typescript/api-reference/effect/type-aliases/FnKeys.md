---
title: "Type Alias: FnKeys<C>"
sidebar_label: "FnKeys<C>"
mdx:
  format: md
---

# Type Alias: FnKeys\<C\>

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
type FnKeys<C> = {
  [K in keyof C]: C[K] extends (a: any) => any ? K : never;
}[keyof C];
```

Keys of `C` whose values are callable.

## Type Parameters

### C

`C`
