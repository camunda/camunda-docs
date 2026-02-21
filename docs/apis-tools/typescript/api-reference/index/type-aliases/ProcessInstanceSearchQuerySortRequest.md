---
title: "Type Alias: ProcessInstanceSearchQuerySortRequest"
sidebar_label: "ProcessInstanceSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: ProcessInstanceSearchQuerySortRequest

```ts
type ProcessInstanceSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:5599](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5599)

## Properties

### field

```ts
field:
  | "processInstanceKey"
  | "processDefinitionId"
  | "processDefinitionName"
  | "processDefinitionVersion"
  | "processDefinitionVersionTag"
  | "processDefinitionKey"
  | "parentProcessInstanceKey"
  | "parentElementInstanceKey"
  | "startDate"
  | "endDate"
  | "state"
  | "hasIncident"
  | "tenantId";
```

Defined in: [gen/types.gen.ts:5603](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5603)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5604](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5604)
