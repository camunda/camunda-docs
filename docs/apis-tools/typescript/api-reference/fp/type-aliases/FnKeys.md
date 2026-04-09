---
title: "Type Alias: FnKeys<C>"
sidebar_label: "FnKeys<C>"
mdx:
  format: md
---

# Type Alias: FnKeys\<C\>

:::caution Technical Preview
The Functional Programming API is a **technical preview**. Its surface may change in future releases without following semver.
:::

```ts
type FnKeys<C> = {
  [K in keyof C]: C[K] extends (a: any) => any ? K : never;
}[keyof C];
```

## Type Parameters

### C

`C`
