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

Defined in: [gen/types.gen.ts:723](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L723)

Batch operation search request.

## Type Declaration

### filter?

```ts
optional filter: BatchOperationFilter;
```

The batch operation search filters.

### sort?

```ts
optional sort: BatchOperationSearchQuerySortRequest[];
```

Sort field criteria.
