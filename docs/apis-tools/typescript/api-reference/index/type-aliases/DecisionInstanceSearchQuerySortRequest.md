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

Defined in: [gen/types.gen.ts:1692](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1692)

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

Defined in: [gen/types.gen.ts:1696](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1696)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:1697](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1697)
