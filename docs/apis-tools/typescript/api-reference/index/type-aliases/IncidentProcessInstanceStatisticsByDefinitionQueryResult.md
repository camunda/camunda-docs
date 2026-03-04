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

Defined in: [gen/types.gen.ts:3263](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3263)

## Type Declaration

### items?

```ts
optional items: IncidentProcessInstanceStatisticsByDefinitionResult[];
```

Statistics of active process instances with incidents, grouped by process
definition for the specified error hash code.
