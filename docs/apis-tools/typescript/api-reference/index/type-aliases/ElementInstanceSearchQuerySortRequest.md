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

Defined in: [gen/types.gen.ts:2517](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2517)

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

Defined in: [gen/types.gen.ts:2521](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2521)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:2522](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2522)
