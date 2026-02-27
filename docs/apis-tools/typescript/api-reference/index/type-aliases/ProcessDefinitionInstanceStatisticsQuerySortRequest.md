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

Defined in: [gen/types.gen.ts:5306](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5306)

## Properties

### field

```ts
field:
  | "processDefinitionId"
  | "activeInstancesWithIncidentCount"
  | "activeInstancesWithoutIncidentCount";
```

Defined in: [gen/types.gen.ts:5310](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5310)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5311](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5311)
