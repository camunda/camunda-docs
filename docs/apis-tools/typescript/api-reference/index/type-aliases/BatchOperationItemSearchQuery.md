---
title: "Type Alias: BatchOperationItemSearchQuery"
sidebar_label: "BatchOperationItemSearchQuery"
mdx:
  format: md
---

# Type Alias: BatchOperationItemSearchQuery

```ts
type BatchOperationItemSearchQuery = SearchQueryRequest & object;
```

Batch operation item search request.

## Type Declaration

### filter?

```ts
filter?: BatchOperationItemFilter;
```

The batch operation item search filters.

### sort?

```ts
sort?: BatchOperationItemSearchQuerySortRequest[];
```

Sort field criteria.
