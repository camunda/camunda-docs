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

Defined in: [gen/types.gen.ts:3677](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3677)

## Properties

### field

```ts
field: "activeInstancesWithErrorCount" | "processDefinitionKey" | "tenantId";
```

Defined in: [gen/types.gen.ts:3681](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3681)

The aggregated field by which the process instance statistics are sorted.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:3682](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3682)
