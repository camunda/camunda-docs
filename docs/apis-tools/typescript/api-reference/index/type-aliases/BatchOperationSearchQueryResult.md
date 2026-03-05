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

Defined in: [gen/types.gen.ts:763](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L763)

The batch operation search query result.

## Type Declaration

### items

```ts
items: BatchOperationResponse[];
```

The matching batch operations.
