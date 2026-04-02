---
title: "Type Alias: IncidentProcessInstanceStatisticsByDefinitionQueryResult"
sidebar_label: "IncidentProcessInstanceStatisticsByDefinitionQueryResult"
mdx:
  format: md
---

# Type Alias: IncidentProcessInstanceStatisticsByDefinitionQueryResult

```ts
type IncidentProcessInstanceStatisticsByDefinitionQueryResult =
  SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:3640](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3640)

## Type Declaration

### items

```ts
items: IncidentProcessInstanceStatisticsByDefinitionResult[];
```

Statistics of active process instances with incidents, grouped by process
definition for the specified error hash code.
