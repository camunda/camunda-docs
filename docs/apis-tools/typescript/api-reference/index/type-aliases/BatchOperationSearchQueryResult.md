---
title: "Type Alias: BatchOperationSearchQueryResult"
sidebar_label: "BatchOperationSearchQueryResult"
mdx:
  format: md
---

# Type Alias: BatchOperationSearchQueryResult

```ts
type BatchOperationSearchQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:759](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L759)

The batch operation search query result.

## Type Declaration

### items

```ts
items: BatchOperationResponse[];
```

The matching batch operations.
