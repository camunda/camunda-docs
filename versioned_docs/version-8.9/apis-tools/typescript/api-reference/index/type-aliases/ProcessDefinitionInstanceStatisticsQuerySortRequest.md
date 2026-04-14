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

## Properties

### field

```ts
field:
  | "processDefinitionId"
  | "activeInstancesWithIncidentCount"
  | "activeInstancesWithoutIncidentCount";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
