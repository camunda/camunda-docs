---
title: "Type Alias: BatchOperationSearchQuery"
sidebar_label: "BatchOperationSearchQuery"
mdx:
  format: md
---

# Type Alias: BatchOperationSearchQuery

```ts
type BatchOperationSearchQuery = SearchQueryRequest & object;
```

Batch operation search request.

## Type Declaration

### filter?

```ts
optional filter?: BatchOperationFilter;
```

The batch operation search filters.

### sort?

```ts
optional sort?: BatchOperationSearchQuerySortRequest[];
```

Sort field criteria.
