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

Defined in: [gen/types.gen.ts:817](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L817)

Batch operation item search request.

## Type Declaration

### filter?

```ts
optional filter: BatchOperationItemFilter;
```

The batch operation item search filters.

### sort?

```ts
optional sort: BatchOperationItemSearchQuerySortRequest[];
```

Sort field criteria.
