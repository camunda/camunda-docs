---
title: "Type Alias: searchBatchOperationsConsistency"
sidebar_label: "searchBatchOperationsConsistency"
mdx:
  format: md
---

# Type Alias: searchBatchOperationsConsistency

```ts
type searchBatchOperationsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchBatchOperations>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
