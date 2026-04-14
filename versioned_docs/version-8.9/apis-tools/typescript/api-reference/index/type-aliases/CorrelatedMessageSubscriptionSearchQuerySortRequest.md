---
title: "Type Alias: CorrelatedMessageSubscriptionSearchQuerySortRequest"
sidebar_label: "CorrelatedMessageSubscriptionSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: CorrelatedMessageSubscriptionSearchQuerySortRequest

```ts
type CorrelatedMessageSubscriptionSearchQuerySortRequest = object;
```

## Properties

### field

```ts
field:
  | "correlationKey"
  | "correlationTime"
  | "elementId"
  | "elementInstanceKey"
  | "messageKey"
  | "messageName"
  | "partitionId"
  | "processDefinitionId"
  | "processDefinitionKey"
  | "processInstanceKey"
  | "subscriptionKey"
  | "tenantId";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
