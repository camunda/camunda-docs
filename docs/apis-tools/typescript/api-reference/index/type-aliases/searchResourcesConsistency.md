---
title: "Type Alias: searchResourcesConsistency"
sidebar_label: "searchResourcesConsistency"
mdx:
  format: md
---

# Type Alias: searchResourcesConsistency

```ts
type searchResourcesConsistency = object;
```

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchResources>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
