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
  | "tenantId"
  | "businessId";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
