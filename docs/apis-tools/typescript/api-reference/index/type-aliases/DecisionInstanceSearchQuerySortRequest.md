---
title: "Type Alias: DecisionInstanceSearchQuerySortRequest"
sidebar_label: "DecisionInstanceSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: DecisionInstanceSearchQuerySortRequest

```ts
type DecisionInstanceSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:1694](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1694)

## Properties

### field

```ts
field: 
  | "decisionDefinitionId"
  | "decisionDefinitionKey"
  | "decisionDefinitionName"
  | "decisionDefinitionType"
  | "decisionDefinitionVersion"
  | "decisionEvaluationInstanceKey"
  | "decisionEvaluationKey"
  | "elementInstanceKey"
  | "evaluationDate"
  | "evaluationFailure"
  | "processDefinitionKey"
  | "processInstanceKey"
  | "rootDecisionDefinitionKey"
  | "state"
  | "tenantId";
```

Defined in: [gen/types.gen.ts:1698](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1698)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:1699](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1699)
