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
  | "processDefinitionName"
  | "processDefinitionVersion"
  | "processInstanceKey"
  | "elementId"
  | "elementInstanceKey"
  | "messageSubscriptionState"
  | "messageSubscriptionType"
  | "lastUpdatedDate"
  | "messageName"
  | "correlationKey"
  | "tenantId"
  | "toolName"
  | "inboundConnectorType";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
