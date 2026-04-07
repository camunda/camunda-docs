---
title: "Type Alias: IncidentProcessInstanceStatisticsByErrorQuerySortRequest"
sidebar_label: "IncidentProcessInstanceStatisticsByErrorQuerySortRequest"
mdx:
  format: md
---

# Type Alias: IncidentProcessInstanceStatisticsByErrorQuerySortRequest

```ts
type IncidentProcessInstanceStatisticsByErrorQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:3617](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3617)

## Properties

### field

```ts
field: "errorMessage" | "activeInstancesWithErrorCount";
```

Defined in: [gen/types.gen.ts:3621](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3621)

The field to sort the incident error statistics by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:3622](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3622)
