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

Defined in: [gen/types.gen.ts:746](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L746)

The batch operation search query result.

## Type Declaration

### items?

```ts
optional items: BatchOperationResponse[];
```

The matching batch operations.
