---
title: "Type Alias: EvaluateDecisionResult"
sidebar_label: "EvaluateDecisionResult"
mdx:
  format: md
---

# Type Alias: EvaluateDecisionResult

```ts
type EvaluateDecisionResult = object;
```

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

The unique key identifying the decision which was evaluated.

---

### decisionDefinitionName

```ts
decisionDefinitionName: string;
```

The name of the decision which was evaluated.

---

### decisionDefinitionVersion

```ts
decisionDefinitionVersion: number;
```

The version of the decision which was evaluated.

---

### decisionEvaluationKey

```ts
decisionEvaluationKey: DecisionEvaluationKey;
```

The unique key identifying this decision evaluation.

---

### ~~decisionInstanceKey~~

```ts
decisionInstanceKey: DecisionInstanceKey;
```

Deprecated, please refer to `decisionEvaluationKey`.

#### Deprecated

---

### decisionRequirementsId

```ts
decisionRequirementsId: string;
```

The ID of the decision requirements graph that the decision which was evaluated is part of.

---

### decisionRequirementsKey

```ts
decisionRequirementsKey: DecisionRequirementsKey;
```

The unique key identifying the decision requirements graph that the decision which was evaluated is part of.

---

### evaluatedDecisions

```ts
evaluatedDecisions: EvaluatedDecisionResult[];
```

Decisions that were evaluated within the requested decision evaluation.

---

### failedDecisionDefinitionId

```ts
failedDecisionDefinitionId: DecisionDefinitionId | null;
```

The ID of the decision which failed during evaluation.

---

### failureMessage

```ts
failureMessage: string | null;
```

Message describing why the decision which was evaluated failed.

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
