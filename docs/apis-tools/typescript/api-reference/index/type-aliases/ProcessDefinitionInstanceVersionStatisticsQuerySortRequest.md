---
title: "Type Alias: ProcessDefinitionInstanceVersionStatisticsQuerySortRequest"
sidebar_label: "ProcessDefinitionInstanceVersionStatisticsQuerySortRequest"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionInstanceVersionStatisticsQuerySortRequest

```ts
type ProcessDefinitionInstanceVersionStatisticsQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:5972](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5972)

## Properties

### field

```ts
field: 
  | "processDefinitionId"
  | "processDefinitionKey"
  | "processDefinitionName"
  | "processDefinitionVersion"
  | "activeInstancesWithIncidentCount"
  | "activeInstancesWithoutIncidentCount";
```

Defined in: [gen/types.gen.ts:5976](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5976)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5977](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5977)
