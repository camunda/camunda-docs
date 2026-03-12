---
title: "Type Alias: ProcessInstanceSearchQuerySortRequest"
sidebar_label: "ProcessInstanceSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: ProcessInstanceSearchQuerySortRequest

```ts
type ProcessInstanceSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:6272](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6272)

## Properties

### field

```ts
field: 
  | "processInstanceKey"
  | "processDefinitionId"
  | "processDefinitionName"
  | "processDefinitionVersion"
  | "processDefinitionVersionTag"
  | "processDefinitionKey"
  | "parentProcessInstanceKey"
  | "parentElementInstanceKey"
  | "startDate"
  | "endDate"
  | "state"
  | "hasIncident"
  | "tenantId"
  | "businessId";
```

Defined in: [gen/types.gen.ts:6276](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6276)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:6277](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6277)
