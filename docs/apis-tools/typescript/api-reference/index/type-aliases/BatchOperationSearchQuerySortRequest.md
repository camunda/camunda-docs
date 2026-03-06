---
title: "Type Alias: BatchOperationSearchQuerySortRequest"
sidebar_label: "BatchOperationSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: BatchOperationSearchQuerySortRequest

```ts
type BatchOperationSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:712](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L712)

## Properties

### field

```ts
field: 
  | "batchOperationKey"
  | "operationType"
  | "state"
  | "startDate"
  | "endDate"
  | "actorType"
  | "actorId";
```

Defined in: [gen/types.gen.ts:716](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L716)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:717](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L717)
