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

Defined in: [gen/types.gen.ts:3622](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3622)

## Properties

### filter

```ts
filter: IncidentProcessInstanceStatisticsByDefinitionFilter;
```

Defined in: [gen/types.gen.ts:3626](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3626)

Filter criteria for the aggregated process instance statistics.

***

### page?

```ts
optional page: OffsetPagination;
```

Defined in: [gen/types.gen.ts:3630](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3630)

Pagination parameters for the aggregated process instance statistics.

***

### sort?

```ts
optional sort: IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest[];
```

Defined in: [gen/types.gen.ts:3634](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3634)

Sorting criteria for process instance statistics grouped by process definition.
