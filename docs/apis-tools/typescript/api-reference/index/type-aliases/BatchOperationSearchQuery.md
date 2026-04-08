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

Defined in: [gen/types.gen.ts:719](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L719)

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
