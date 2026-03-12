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

Defined in: [gen/types.gen.ts:5562](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5562)

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

Defined in: [gen/types.gen.ts:5566](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5566)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5567](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5567)
