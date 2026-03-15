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

Defined in: [gen/types.gen.ts:763](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L763)

The batch operation search query result.

## Type Declaration

### items

```ts
items: BatchOperationResponse[];
```

The matching batch operations.
