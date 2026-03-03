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

Defined in: [fp-ts.ts:72](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/fp-ts.ts#L72)

## Type Parameters

### C

`C`
