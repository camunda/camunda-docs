---
title: "Type Alias: DecisionDefinitionSearchQuerySortRequest"
sidebar_label: "DecisionDefinitionSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: DecisionDefinitionSearchQuerySortRequest

```ts
type DecisionDefinitionSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:1433](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1433)

## Properties

### field

```ts
field: 
  | "decisionDefinitionKey"
  | "decisionDefinitionId"
  | "name"
  | "version"
  | "decisionRequirementsId"
  | "decisionRequirementsKey"
  | "decisionRequirementsName"
  | "decisionRequirementsVersion"
  | "tenantId";
```

Defined in: [gen/types.gen.ts:1437](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1437)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:1438](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1438)
