---
title: "Type Alias: searchBatchOperationItemsConsistency"
sidebar_label: "searchBatchOperationItemsConsistency"
mdx:
  format: md
---

# Type Alias: searchBatchOperationItemsConsistency

```ts
type searchBatchOperationItemsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchBatchOperationItems>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
