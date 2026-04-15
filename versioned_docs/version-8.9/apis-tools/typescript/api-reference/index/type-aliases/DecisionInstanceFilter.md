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

### decisionDefinitionId?

```ts
optional decisionDefinitionId?: DecisionDefinitionId;
```

The ID of the DMN decision.

---

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey?: DecisionDefinitionKeyFilterProperty;
```

The key of the decision.

---

### decisionDefinitionName?

```ts
optional decisionDefinitionName?: string;
```

The name of the DMN decision.

---

### decisionDefinitionType?

```ts
optional decisionDefinitionType?: DecisionDefinitionTypeEnum;
```

---

### decisionDefinitionVersion?

```ts
optional decisionDefinitionVersion?: number;
```

The version of the decision.

---

### decisionEvaluationInstanceKey?

```ts
optional decisionEvaluationInstanceKey?: DecisionEvaluationInstanceKeyFilterProperty;
```

The key of the decision evaluation instance.

---

### decisionEvaluationKey?

```ts
optional decisionEvaluationKey?: DecisionEvaluationKey;
```

The key of the parent decision evaluation. Note that this is not the identifier of an individual decision instance; the `decisionEvaluationInstanceKey` is the identifier for a decision instance.

---

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey?: DecisionRequirementsKeyFilterProperty;
```

The key of the decision requirements definition.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The key of the element instance this decision instance is linked to.

---

### evaluationDate?

```ts
optional evaluationDate?: DateTimeFilterProperty;
```

The evaluation date of the decision instance.

---

### evaluationFailure?

```ts
optional evaluationFailure?: string;
```

The evaluation failure of the decision instance.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKey;
```

The key of the process definition.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKey;
```

The key of the process instance.

---

### rootDecisionDefinitionKey?

```ts
optional rootDecisionDefinitionKey?: DecisionDefinitionKeyFilterProperty;
```

The key of the root decision definition.

---

### state?

```ts
optional state?: DecisionInstanceStateFilterProperty;
```

The state of the decision instance.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

The tenant ID of the decision instance.
