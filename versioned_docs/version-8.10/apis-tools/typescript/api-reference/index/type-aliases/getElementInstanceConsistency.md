---
title: "Type Alias: getElementInstanceConsistency"
sidebar_label: "getElementInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getElementInstanceConsistency

```ts
type getElementInstanceConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getElementInstance>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
