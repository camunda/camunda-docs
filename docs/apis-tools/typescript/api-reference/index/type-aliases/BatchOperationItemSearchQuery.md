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

Defined in: [gen/types.gen.ts:840](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L840)

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
