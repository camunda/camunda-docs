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

Defined in: [gen/types.gen.ts:695](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L695)

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

Defined in: [gen/types.gen.ts:699](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L699)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:700](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L700)
