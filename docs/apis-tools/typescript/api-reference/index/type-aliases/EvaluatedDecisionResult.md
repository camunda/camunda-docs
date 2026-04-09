---
title: "Type Alias: EvaluatedDecisionResult"
sidebar_label: "EvaluatedDecisionResult"
mdx:
  format: md
---

# Type Alias: EvaluatedDecisionResult

```ts
type EvaluatedDecisionResult = object;
```

A decision that was evaluated.

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

The ID of the decision which was evaluated.

---

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

The unique key identifying the decision which was evaluate.

---

### decisionDefinitionName

```ts
decisionDefinitionName: string;
```

The name of the decision which was evaluated.

---

### decisionDefinitionType

```ts
decisionDefinitionType: string;
```

The type of the decision which was evaluated.

---

### decisionDefinitionVersion

```ts
decisionDefinitionVersion: number;
```

The version of the decision which was evaluated.

---

### decisionEvaluationInstanceKey

```ts
decisionEvaluationInstanceKey: DecisionEvaluationInstanceKey;
```

The unique key identifying this decision evaluation instance.

---

### evaluatedInputs

```ts
evaluatedInputs: EvaluatedDecisionInputItem[];
```

The decision inputs that were evaluated within this decision evaluation.

---

### matchedRules

```ts
matchedRules: MatchedDecisionRuleItem[];
```

The decision rules that matched within this decision evaluation.

---

### output

```ts
output: string;
```

JSON document that will instantiate the result of the decision which was evaluated.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of the evaluated decision.
