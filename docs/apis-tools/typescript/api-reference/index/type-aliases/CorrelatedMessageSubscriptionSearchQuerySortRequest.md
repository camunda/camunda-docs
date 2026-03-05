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

Defined in: [gen/types.gen.ts:5492](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5492)

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

Defined in: [gen/types.gen.ts:5496](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5496)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5497](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5497)
