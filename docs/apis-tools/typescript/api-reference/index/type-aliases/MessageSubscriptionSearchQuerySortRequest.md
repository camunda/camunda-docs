---
title: "Type Alias: MessageSubscriptionSearchQuerySortRequest"
sidebar_label: "MessageSubscriptionSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: MessageSubscriptionSearchQuerySortRequest

```ts
type MessageSubscriptionSearchQuerySortRequest = object;
```

## Properties

### field

```ts
field:
  | "messageSubscriptionKey"
  | "processDefinitionId"
  | "processInstanceKey"
  | "elementId"
  | "elementInstanceKey"
  | "messageSubscriptionState"
  | "lastUpdatedDate"
  | "messageName"
  | "correlationKey"
  | "tenantId";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
