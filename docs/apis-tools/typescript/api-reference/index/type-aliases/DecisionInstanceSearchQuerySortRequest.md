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

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```
