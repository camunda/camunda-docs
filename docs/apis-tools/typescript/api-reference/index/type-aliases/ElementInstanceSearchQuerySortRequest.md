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

Defined in: [gen/types.gen.ts:2521](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2521)

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

Defined in: [gen/types.gen.ts:2525](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2525)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:2526](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2526)
