---
title: "Type Alias: BatchOperationItemSearchQuerySortRequest"
sidebar_label: "BatchOperationItemSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: BatchOperationItemSearchQuerySortRequest

```ts
type BatchOperationItemSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:833](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L833)

## Properties

### field

```ts
field: 
  | "batchOperationKey"
  | "itemKey"
  | "processInstanceKey"
  | "processedDate"
  | "state";
```

Defined in: [gen/types.gen.ts:837](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L837)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:838](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L838)
