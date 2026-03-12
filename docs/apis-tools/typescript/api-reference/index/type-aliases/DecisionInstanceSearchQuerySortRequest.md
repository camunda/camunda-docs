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

Defined in: [gen/types.gen.ts:1696](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1696)

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

Defined in: [gen/types.gen.ts:1700](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1700)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:1701](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1701)
