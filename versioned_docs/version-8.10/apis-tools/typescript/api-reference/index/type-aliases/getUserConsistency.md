---
title: "Type Alias: getUserConsistency"
sidebar_label: "getUserConsistency"
mdx:
  format: md
---

# Type Alias: getUserConsistency

```ts
type getUserConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUser>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
