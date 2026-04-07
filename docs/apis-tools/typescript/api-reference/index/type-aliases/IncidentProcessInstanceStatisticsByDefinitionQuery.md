---
title: "Type Alias: IncidentProcessInstanceStatisticsByDefinitionQuery"
sidebar_label: "IncidentProcessInstanceStatisticsByDefinitionQuery"
mdx:
  format: md
---

# Type Alias: IncidentProcessInstanceStatisticsByDefinitionQuery

```ts
type IncidentProcessInstanceStatisticsByDefinitionQuery = object;
```

Defined in: [gen/types.gen.ts:3625](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3625)

## Properties

### filter

```ts
filter: IncidentProcessInstanceStatisticsByDefinitionFilter;
```

Defined in: [gen/types.gen.ts:3629](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3629)

Filter criteria for the aggregated process instance statistics.

---

### page?

```ts
optional page?: OffsetPagination;
```

Defined in: [gen/types.gen.ts:3633](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3633)

Pagination parameters for the aggregated process instance statistics.

---

### sort?

```ts
optional sort?: IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest[];
```

Defined in: [gen/types.gen.ts:3637](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3637)

Sorting criteria for process instance statistics grouped by process definition.
