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

Defined in: [gen/types.gen.ts:708](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L708)

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

Defined in: [gen/types.gen.ts:712](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L712)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:713](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L713)
