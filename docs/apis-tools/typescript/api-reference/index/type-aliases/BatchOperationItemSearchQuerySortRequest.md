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

Defined in: [gen/types.gen.ts:806](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L806)

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

Defined in: [gen/types.gen.ts:810](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L810)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:811](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L811)
