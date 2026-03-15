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

Defined in: [gen/types.gen.ts:6043](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6043)

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

Defined in: [gen/types.gen.ts:6047](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6047)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:6048](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6048)
