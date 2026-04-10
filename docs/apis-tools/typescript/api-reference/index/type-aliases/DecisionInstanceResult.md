---
title: "Type Alias: DecisionInstanceResult"
sidebar_label: "DecisionInstanceResult"
mdx:
  format: md
---

# Type Alias: DecisionInstanceResult

```ts
type DecisionInstanceResult = object;
```

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

The ID of the DMN decision.

---

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

The key of the decision.

---

### decisionDefinitionName

```ts
decisionDefinitionName: string;
```

The name of the DMN decision.

---

### decisionDefinitionType

```ts
decisionDefinitionType: DecisionDefinitionTypeEnum;
```

---

### decisionDefinitionVersion

```ts
decisionDefinitionVersion: number;
```

The version of the decision.

---

### decisionEvaluationInstanceKey

```ts
decisionEvaluationInstanceKey: DecisionEvaluationInstanceKey;
```

---

### decisionEvaluationKey

```ts
decisionEvaluationKey: DecisionEvaluationKey;
```

The key of the decision evaluation where this instance was created.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey | null;
```

The key of the element instance this decision instance is linked to.

---

### evaluationDate

```ts
evaluationDate: string;
```

The evaluation date of the decision instance.

---

### evaluationFailure

```ts
evaluationFailure: string | null;
```

The evaluation failure of the decision instance.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey | null;
```

The key of the process definition.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey | null;
```

The key of the process instance.

---

### result

```ts
result: string;
```

The result of the decision instance.

---

### rootDecisionDefinitionKey

```ts
rootDecisionDefinitionKey: DecisionDefinitionKey;
```

The key of the root decision definition.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### state

```ts
state: DecisionInstanceStateEnum;
```

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of the decision instance.
