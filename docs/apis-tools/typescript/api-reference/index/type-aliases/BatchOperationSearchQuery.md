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

Defined in: [gen/types.gen.ts:723](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L723)

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
