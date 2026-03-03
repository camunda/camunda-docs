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

Defined in: [gen/types.gen.ts:706](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L706)

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
