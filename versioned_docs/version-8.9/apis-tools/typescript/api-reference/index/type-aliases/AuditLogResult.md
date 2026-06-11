---
title: "Type Alias: AuditLogResult"
sidebar_label: "AuditLogResult"
mdx:
  format: md
---

# Type Alias: AuditLogResult

```ts
type AuditLogResult = object;
```

Audit log item.

## Properties

### actorId

```ts
actorId: string | null;
```

The ID of the actor who performed the operation.

---

### actorType

```ts
actorType: AuditLogActorTypeEnum | null;
```

The type of the actor who performed the operation.

---

### agentElementId

```ts
agentElementId: string | null;
```

The element ID of the agent that performed the operation (e.g. ad-hoc subprocess element ID).

---

### auditLogKey

```ts
auditLogKey: AuditLogKey;
```

The unique key of the audit log entry.

---

### batchOperationKey

```ts
batchOperationKey: BatchOperationKey | null;
```

Key of the batch operation.

---

### batchOperationType

```ts
batchOperationType: BatchOperationTypeEnum | null;
```

The type of batch operation performed, if this is part of a batch.

---

### category

```ts
category: AuditLogCategoryEnum;
```

---

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId | null;
```

The decision definition ID.

---

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey | null;
```

The key of the decision definition.

---

### decisionEvaluationKey

```ts
decisionEvaluationKey: DecisionEvaluationKey | null;
```

The key of the decision evaluation.

---

### decisionRequirementsId

```ts
decisionRequirementsId: string | null;
```

The decision requirements ID.

---

### decisionRequirementsKey

```ts
decisionRequirementsKey: DecisionRequirementsKey | null;
```

The assigned key of the decision requirements.

---

### deploymentKey

```ts
deploymentKey: DeploymentKey | null;
```

The key of the deployment.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey | null;
```

The key of the element instance.

---

### entityDescription

```ts
entityDescription: string | null;
```

Additional description of the entity affected by the operation.
For example, for variable operations, this will contain the variable name.

---

### entityKey

```ts
entityKey: AuditLogEntityKey;
```

---

### entityType

```ts
entityType: AuditLogEntityTypeEnum;
```

---

### formKey

```ts
formKey: FormKey | null;
```

The key of the form.

---

### jobKey

```ts
jobKey: JobKey | null;
```

The key of the job.

---

### operationType

```ts
operationType: AuditLogOperationTypeEnum;
```

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId | null;
```

The process definition ID.

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

### relatedEntityKey

```ts
relatedEntityKey: AuditLogEntityKey | null;
```

The key of the related entity. The content depends on the operation type and entity type.
For example, for authorization operations, this will contain the ID of the owner (e.g., user or group) the authorization belongs to.

---

### relatedEntityType

```ts
relatedEntityType: AuditLogEntityTypeEnum | null;
```

The type of the related entity. The content depends on the operation type and entity type.
For example, for authorization operations, this will contain the type of the owner (e.g., USER or GROUP) the authorization belongs to.

---

### resourceKey

```ts
resourceKey: ResourceKey | null;
```

The system-assigned key for this resource.

---

### result

```ts
result: AuditLogResultEnum;
```

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### tenantId

```ts
tenantId: TenantId | null;
```

The tenant ID of the audit log.

---

### timestamp

```ts
timestamp: string;
```

The timestamp when the operation occurred.

---

### userTaskKey

```ts
userTaskKey: UserTaskKey | null;
```

The key of the user task.
