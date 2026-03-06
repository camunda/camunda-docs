---
title: "Type Alias: ProcessDefinitionInstanceStatisticsQuerySortRequest"
sidebar_label: "ProcessDefinitionInstanceStatisticsQuerySortRequest"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionInstanceStatisticsQuerySortRequest

```ts
type ProcessDefinitionInstanceStatisticsQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:5894](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5894)

## Properties

### field

```ts
field: 
  | "processDefinitionId"
  | "activeInstancesWithIncidentCount"
  | "activeInstancesWithoutIncidentCount";
```

Defined in: [gen/types.gen.ts:5898](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5898)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5899](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5899)
