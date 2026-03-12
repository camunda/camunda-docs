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

Defined in: [gen/types.gen.ts:5965](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5965)

## Properties

### field

```ts
field: 
  | "processDefinitionId"
  | "activeInstancesWithIncidentCount"
  | "activeInstancesWithoutIncidentCount";
```

Defined in: [gen/types.gen.ts:5969](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5969)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5970](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5970)
