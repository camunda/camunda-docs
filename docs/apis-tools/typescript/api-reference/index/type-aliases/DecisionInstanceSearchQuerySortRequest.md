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

Defined in: [gen/types.gen.ts:1661](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1661)

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

Defined in: [gen/types.gen.ts:1665](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1665)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:1666](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1666)
