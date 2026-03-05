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

Defined in: [gen/types.gen.ts:3637](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3637)

## Type Declaration

### items

```ts
items: IncidentProcessInstanceStatisticsByDefinitionResult[];
```

Statistics of active process instances with incidents, grouped by process
definition for the specified error hash code.
