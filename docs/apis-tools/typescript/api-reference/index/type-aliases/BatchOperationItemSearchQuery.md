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

Defined in: [gen/types.gen.ts:844](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L844)

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
