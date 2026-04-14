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

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
