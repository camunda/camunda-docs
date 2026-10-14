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

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
