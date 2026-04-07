---
title: "Type Alias: IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest"
sidebar_label: "IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest"
mdx:
  format: md
---

# Type Alias: IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest

```ts
type IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:3680](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3680)

## Properties

### field

```ts
field: "activeInstancesWithErrorCount" | "processDefinitionKey" | "tenantId";
```

Defined in: [gen/types.gen.ts:3684](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3684)

The aggregated field by which the process instance statistics are sorted.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:3685](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3685)
