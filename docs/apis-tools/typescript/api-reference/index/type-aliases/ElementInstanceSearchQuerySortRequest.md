---
title: "Type Alias: ElementInstanceSearchQuerySortRequest"
sidebar_label: "ElementInstanceSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: ElementInstanceSearchQuerySortRequest

```ts
type ElementInstanceSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:2519](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2519)

## Properties

### field

```ts
field: 
  | "elementInstanceKey"
  | "processInstanceKey"
  | "processDefinitionKey"
  | "processDefinitionId"
  | "startDate"
  | "endDate"
  | "elementId"
  | "elementName"
  | "type"
  | "state"
  | "incidentKey"
  | "tenantId";
```

Defined in: [gen/types.gen.ts:2523](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2523)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:2524](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2524)
