---
title: "Type Alias: ProcessDefinitionInstanceVersionStatisticsQuerySortRequest"
sidebar_label: "ProcessDefinitionInstanceVersionStatisticsQuerySortRequest"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionInstanceVersionStatisticsQuerySortRequest

```ts
type ProcessDefinitionInstanceVersionStatisticsQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:5384](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5384)

## Properties

### field

```ts
field:
  | "processDefinitionId"
  | "processDefinitionKey"
  | "processDefinitionName"
  | "processDefinitionVersion"
  | "activeInstancesWithIncidentCount"
  | "activeInstancesWithoutIncidentCount";
```

Defined in: [gen/types.gen.ts:5388](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5388)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5389](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5389)
