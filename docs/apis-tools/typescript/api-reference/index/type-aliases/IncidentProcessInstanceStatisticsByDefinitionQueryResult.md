---
title: "Type Alias: IncidentProcessInstanceStatisticsByDefinitionQueryResult"
sidebar_label: "IncidentProcessInstanceStatisticsByDefinitionQueryResult"
mdx:
  format: md
---

# Type Alias: IncidentProcessInstanceStatisticsByDefinitionQueryResult

```ts
type IncidentProcessInstanceStatisticsByDefinitionQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:3637](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3637)

## Type Declaration

### items

```ts
items: IncidentProcessInstanceStatisticsByDefinitionResult[];
```

Statistics of active process instances with incidents, grouped by process
definition for the specified error hash code.
