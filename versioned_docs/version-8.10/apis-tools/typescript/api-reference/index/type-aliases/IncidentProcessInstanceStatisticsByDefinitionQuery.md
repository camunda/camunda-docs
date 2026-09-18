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

## Properties

### filter

```ts
filter: IncidentProcessInstanceStatisticsByDefinitionFilter;
```

Filter criteria for the aggregated process instance statistics.

---

### page?

```ts
optional page?: OffsetPagination;
```

Pagination parameters for the aggregated process instance statistics.

---

### sort?

```ts
optional sort?: IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest[];
```

Sorting criteria for process instance statistics grouped by process definition.
