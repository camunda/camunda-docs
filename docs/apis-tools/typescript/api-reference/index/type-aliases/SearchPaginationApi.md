---
title: "Type Alias: SearchPaginationApi<C>"
sidebar_label: "SearchPaginationApi<C>"
mdx:
  format: md
---

# Type Alias: SearchPaginationApi\<C\>

```ts
type SearchPaginationApi<C> = {
  [
    K in keyof C as K extends `search${string}`
      ? SearchSignature<C[K]> extends { result: infer D }
        ? [ItemsOf<D>] extends [never]
          ? never
          : K
        : never
      : never
  ]: SearchSignature<C[K]> extends { body: infer B; result: infer D }
    ? { paginate: any }
    : never;
};
```

For a client type `C`, the set of `.paginate` methods to intersect onto it.
Only `search*` keys whose response actually carries `items` are included.

## Type Parameters

### C

`C`
