---
title: "Type Alias: DecisionInstanceFilter"
sidebar_label: "DecisionInstanceFilter"
mdx:
  format: md
---

# Type Alias: DecisionInstanceFilter

```ts
type DecisionInstanceFilter = object;
```

Decision instance search filter.

## Properties

### businessId?

```ts
businessId?: StringFilterProperty;
```

The business ID of the owning process instance the decision instance belongs to. This only works for decision instances created with 8.10 and onwards. Decision instances from prior versions and standalone evaluations don't contain this data and cannot be found.

---

### decisionDefinitionId?

```ts
decisionDefinitionId?: DecisionDefinitionId;
```

The ID of the DMN decision.

---

### decisionDefinitionKey?

```ts
decisionDefinitionKey?: DecisionDefinitionKeyFilterProperty;
```

The key of the decision.

---

### decisionDefinitionName?

```ts
decisionDefinitionName?: string;
```

The name of the DMN decision.

---

### decisionDefinitionType?

```ts
decisionDefinitionType?: DecisionDefinitionTypeEnum;
```

---

### decisionDefinitionVersion?

```ts
decisionDefinitionVersion?: number;
```

The version of the decision.

---

### decisionEvaluationInstanceKey?

```ts
decisionEvaluationInstanceKey?: DecisionEvaluationInstanceKeyFilterProperty;
```

The key of the decision evaluation instance.

---

### decisionEvaluationKey?

```ts
decisionEvaluationKey?: DecisionEvaluationKey;
```

The key of the parent decision evaluation. Note that this is not the identifier of an individual decision instance; the `decisionEvaluationInstanceKey` is the identifier for a decision instance.

---

### decisionRequirementsKey?

```ts
decisionRequirementsKey?: DecisionRequirementsKeyFilterProperty;
```

The key of the decision requirements definition.

---

### elementInstanceKey?

```ts
elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The key of the element instance this decision instance is linked to.

---

### evaluationDate?

```ts
evaluationDate?: DateTimeFilterProperty;
```

The evaluation date of the decision instance.

---

### evaluationFailure?

```ts
evaluationFailure?: string;
```

The evaluation failure of the decision instance.

---

### processDefinitionKey?

```ts
processDefinitionKey?: ProcessDefinitionKey;
```

The key of the process definition.

---

### processInstanceKey?

```ts
processInstanceKey?: ProcessInstanceKey;
```

The key of the process instance.

---

### rootDecisionDefinitionKey?

```ts
rootDecisionDefinitionKey?: DecisionDefinitionKeyFilterProperty;
```

The key of the root decision definition.

---

### state?

```ts
state?: DecisionInstanceStateFilterProperty;
```

The state of the decision instance.

---

### tenantId?

```ts
tenantId?: TenantId;
```

The tenant ID of the decision instance.
