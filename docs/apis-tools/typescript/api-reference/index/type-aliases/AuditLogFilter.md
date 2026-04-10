---
title: "Type Alias: AuditLogFilter"
sidebar_label: "AuditLogFilter"
mdx:
  format: md
---

# Type Alias: AuditLogFilter

```ts
type AuditLogFilter = object;
```

Audit log filter request

## Properties

### actorId?

```ts
optional actorId?: StringFilterProperty;
```

The actor ID search filter.

---

### actorType?

```ts
optional actorType?: AuditLogActorTypeFilterProperty;
```

The actor type search filter.

---

### agentElementId?

```ts
optional agentElementId?: StringFilterProperty;
```

The agent element ID search filter.

---

### auditLogKey?

```ts
optional auditLogKey?: AuditLogKeyFilterProperty;
```

The audit log key search filter.

---

### batchOperationType?

```ts
optional batchOperationType?: BatchOperationTypeFilterProperty;
```

The batch operation type search filter.

---

### category?

```ts
optional category?: CategoryFilterProperty;
```

The category search filter.

---

### decisionDefinitionId?

```ts
optional decisionDefinitionId?: StringFilterProperty;
```

The decision definition ID search filter.

---

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey?: DecisionDefinitionKeyFilterProperty;
```

The decision definition key search filter.

---

### decisionEvaluationKey?

```ts
optional decisionEvaluationKey?: DecisionEvaluationKeyFilterProperty;
```

The decision evaluation key search filter.

---

### decisionRequirementsId?

```ts
optional decisionRequirementsId?: StringFilterProperty;
```

The decision requirements ID search filter.

---

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey?: DecisionRequirementsKeyFilterProperty;
```

The decision requirements key search filter.

---

### deploymentKey?

```ts
optional deploymentKey?: DeploymentKeyFilterProperty;
```

The deployment key search filter.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The element instance key search filter.

---

### entityDescription?

```ts
optional entityDescription?: StringFilterProperty;
```

The entity description filter.

---

### entityKey?

```ts
optional entityKey?: AuditLogEntityKeyFilterProperty;
```

The entity key search filter.

---

### entityType?

```ts
optional entityType?: EntityTypeFilterProperty;
```

The entity type search filter.

---

### formKey?

```ts
optional formKey?: FormKeyFilterProperty;
```

The form key search filter.

---

### jobKey?

```ts
optional jobKey?: JobKeyFilterProperty;
```

The job key search filter.

---

### operationType?

```ts
optional operationType?: OperationTypeFilterProperty;
```

The operation type search filter.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

The process definition ID search filter.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The process definition key search filter.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The process instance key search filter.

---

### relatedEntityKey?

```ts
optional relatedEntityKey?: AuditLogEntityKeyFilterProperty;
```

The related entity key search filter.

---

### relatedEntityType?

```ts
optional relatedEntityType?: EntityTypeFilterProperty;
```

The related entity type search filter.

---

### resourceKey?

```ts
optional resourceKey?: ResourceKeyFilterProperty;
```

The resource key search filter.

---

### result?

```ts
optional result?: AuditLogResultFilterProperty;
```

The result search filter.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

The tenant ID search filter.

---

### timestamp?

```ts
optional timestamp?: DateTimeFilterProperty;
```

The timestamp search filter.

---

### userTaskKey?

```ts
optional userTaskKey?: BasicStringFilterProperty;
```

The user task key search filter.
