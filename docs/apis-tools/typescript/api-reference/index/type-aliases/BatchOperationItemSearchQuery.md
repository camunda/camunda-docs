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
optional filter?: BatchOperationItemFilter;
```

The batch operation item search filters.

### sort?

```ts
optional sort?: BatchOperationItemSearchQuerySortRequest[];
```

Sort field criteria.
