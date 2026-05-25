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

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
