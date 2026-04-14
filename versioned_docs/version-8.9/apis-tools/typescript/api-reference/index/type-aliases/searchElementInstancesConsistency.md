---
title: "Type Alias: searchElementInstancesConsistency"
sidebar_label: "searchElementInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchElementInstancesConsistency

```ts
type searchElementInstancesConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchElementInstances>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
