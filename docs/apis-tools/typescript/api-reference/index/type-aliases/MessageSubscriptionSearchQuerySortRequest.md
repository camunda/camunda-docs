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

Defined in: [gen/types.gen.ts:5347](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5347)

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

Defined in: [gen/types.gen.ts:5351](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5351)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5352](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5352)
