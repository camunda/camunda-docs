---
title: "Type Alias: IncidentSearchQuerySortRequest"
sidebar_label: "IncidentSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: IncidentSearchQuerySortRequest

```ts
type IncidentSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:3501](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3501)

## Properties

### field

```ts
field: 
  | "incidentKey"
  | "processDefinitionKey"
  | "processDefinitionId"
  | "processInstanceKey"
  | "errorType"
  | "errorMessage"
  | "elementId"
  | "elementInstanceKey"
  | "creationTime"
  | "state"
  | "jobKey"
  | "tenantId";
```

Defined in: [gen/types.gen.ts:3505](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3505)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:3506](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3506)
