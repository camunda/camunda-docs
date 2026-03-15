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

Defined in: [gen/types.gen.ts:5415](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5415)

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

Defined in: [gen/types.gen.ts:5419](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5419)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5420](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5420)
