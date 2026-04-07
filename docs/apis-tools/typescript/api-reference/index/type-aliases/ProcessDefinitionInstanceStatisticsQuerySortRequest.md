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

Defined in: [gen/types.gen.ts:5968](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5968)

## Properties

### field

```ts
field:
  | "processDefinitionId"
  | "activeInstancesWithIncidentCount"
  | "activeInstancesWithoutIncidentCount";
```

Defined in: [gen/types.gen.ts:5972](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5972)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5973](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5973)
