---
title: "Type Alias: ElementInstanceWaitStateQuerySortRequest"
sidebar_label: "ElementInstanceWaitStateQuerySortRequest"
mdx:
  format: md
---

# Type Alias: ElementInstanceWaitStateQuerySortRequest

```ts
type ElementInstanceWaitStateQuerySortRequest = object;
```

## Properties

### field

```ts
field:
  | "elementInstanceKey"
  | "processInstanceKey"
  | "rootProcessInstanceKey"
  | "elementId";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
