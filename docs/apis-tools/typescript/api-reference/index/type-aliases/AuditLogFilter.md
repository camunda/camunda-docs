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
actorId?: StringFilterProperty;
```

The actor ID search filter.

---

### actorType?

```ts
actorType?: AuditLogActorTypeFilterProperty;
```

The actor type search filter.

---

### agentElementId?

```ts
agentElementId?: StringFilterProperty;
```

The agent element ID search filter.

---

### auditLogKey?

```ts
auditLogKey?: AuditLogKeyFilterProperty;
```

The audit log key search filter.

---

### batchOperationType?

```ts
batchOperationType?: BatchOperationTypeFilterProperty;
```

The batch operation type search filter.

---

### category?

```ts
category?: CategoryFilterProperty;
```

The category search filter.

---

### decisionDefinitionId?

```ts
decisionDefinitionId?: StringFilterProperty;
```

The decision definition ID search filter.

---

### decisionDefinitionKey?

```ts
decisionDefinitionKey?: DecisionDefinitionKeyFilterProperty;
```

The decision definition key search filter.

---

### decisionEvaluationKey?

```ts
decisionEvaluationKey?: DecisionEvaluationKeyFilterProperty;
```

The decision evaluation key search filter.

---

### decisionRequirementsId?

```ts
decisionRequirementsId?: StringFilterProperty;
```

The decision requirements ID search filter.

---

### decisionRequirementsKey?

```ts
decisionRequirementsKey?: DecisionRequirementsKeyFilterProperty;
```

The decision requirements key search filter.

---

### deploymentKey?

```ts
deploymentKey?: DeploymentKeyFilterProperty;
```

The deployment key search filter.

---

### elementInstanceKey?

```ts
elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The element instance key search filter.

---

### entityDescription?

```ts
entityDescription?: StringFilterProperty;
```

The entity description filter.

---

### entityKey?

```ts
entityKey?: AuditLogEntityKeyFilterProperty;
```

The entity key search filter.

---

### entityType?

```ts
entityType?: EntityTypeFilterProperty;
```

The entity type search filter.

---

### formKey?

```ts
formKey?: FormKeyFilterProperty;
```

The form key search filter.

---

### inboundChannelToolName?

```ts
inboundChannelToolName?: StringFilterProperty;
```

The inbound channel tool name search filter.

---

### inboundChannelType?

```ts
inboundChannelType?: StringFilterProperty;
```

The inbound channel type search filter (e.g. MCP).

---

### jobKey?

```ts
jobKey?: JobKeyFilterProperty;
```

The job key search filter.

---

### operationType?

```ts
operationType?: OperationTypeFilterProperty;
```

The operation type search filter.

---

### processDefinitionId?

```ts
processDefinitionId?: StringFilterProperty;
```

The process definition ID search filter.

---

### processDefinitionKey?

```ts
processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The process definition key search filter.

---

### processInstanceKey?

```ts
processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The process instance key search filter.

---

### relatedEntityKey?

```ts
relatedEntityKey?: AuditLogEntityKeyFilterProperty;
```

The related entity key search filter.

---

### relatedEntityType?

```ts
relatedEntityType?: EntityTypeFilterProperty;
```

The related entity type search filter.

---

### resourceKey?

```ts
resourceKey?: ResourceKeyFilterProperty;
```

The resource key search filter.

---

### result?

```ts
result?: AuditLogResultFilterProperty;
```

The result search filter.

---

### tenantId?

```ts
tenantId?: StringFilterProperty;
```

The tenant ID search filter.

---

### timestamp?

```ts
timestamp?: DateTimeFilterProperty;
```

The timestamp search filter.

---

### userTaskKey?

```ts
userTaskKey?: BasicStringFilterProperty;
```

The user task key search filter.
