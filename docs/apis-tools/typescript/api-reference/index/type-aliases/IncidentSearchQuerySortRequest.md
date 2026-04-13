---
title: "Type Alias: IncidentSearchQuerySortRequest"
sidebar_label: "IncidentSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: IncidentSearchQuerySortRequest

```ts
type IncidentSearchQuerySortRequest = object;
```

## Properties

### field

```ts
field:
  | "incidentKey"
  | "processDefinitionKey"
  | "processDefinitionId"
  | "processInstanceKey"
  | "errorType"
  | "elementId"
  | "elementInstanceKey"
  | "creationTime"
  | "state"
  | "jobKey"
  | "tenantId";
```

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
