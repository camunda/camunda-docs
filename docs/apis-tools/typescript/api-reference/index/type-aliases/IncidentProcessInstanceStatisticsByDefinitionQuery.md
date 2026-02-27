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

Defined in: [gen/types.gen.ts:3248](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3248)

## Properties

### filter

```ts
filter: IncidentProcessInstanceStatisticsByDefinitionFilter;
```

Defined in: [gen/types.gen.ts:3252](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3252)

Filter criteria for the aggregated process instance statistics.

---

### page?

```ts
optional page: OffsetPagination;
```

Defined in: [gen/types.gen.ts:3256](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3256)

Pagination parameters for the aggregated process instance statistics.

---

### sort?

```ts
optional sort: IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest[];
```

Defined in: [gen/types.gen.ts:3260](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3260)

Sorting criteria for process instance statistics grouped by process definition.
