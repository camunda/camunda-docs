---
title: "Type Alias: IncidentProcessInstanceStatisticsByDefinitionQueryResult"
sidebar_label: "IncidentProcessInstanceStatisticsByDefinitionQueryResult"
mdx:
  format: md
---

# Type Alias: IncidentProcessInstanceStatisticsByDefinitionQueryResult

```ts
type IncidentProcessInstanceStatisticsByDefinitionQueryResult =
  SearchQueryResponse & object;
```

## Type Declaration

### items

```ts
items: IncidentProcessInstanceStatisticsByDefinitionResult[];
```

Statistics of active process instances with incidents, grouped by process
definition for the specified error hash code.
