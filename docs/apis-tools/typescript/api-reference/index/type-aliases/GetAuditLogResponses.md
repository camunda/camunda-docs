---
title: "Type Alias: GetAuditLogResponses"
sidebar_label: "GetAuditLogResponses"
mdx:
  format: md
---

# Type Alias: GetAuditLogResponses

```ts
type GetAuditLogResponses = object;
```

Defined in: [gen/types.gen.ts:7827](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7827)

## Properties

### 200

```ts
200: object;
```

Defined in: [gen/types.gen.ts:7831](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7831)

Audit log item.

#### actorId?

```ts
optional actorId: string;
```

The ID of the actor who performed the operation.

#### actorType?

```ts
optional actorType: AuditLogActorTypeEnum;
```

#### annotation?

```ts
optional annotation: string;
```

Additional notes about the operation.

#### auditLogKey?

```ts
optional auditLogKey: AuditLogKey;
```

The unique key of the audit log entry.

#### batchOperationKey?

```ts
optional batchOperationKey: BatchOperationKey;
```

Key of the batch operation.

#### batchOperationType?

```ts
optional batchOperationType: BatchOperationTypeEnum;
```

The type of batch operation performed, if this is part of a batch.

#### category?

```ts
optional category: AuditLogCategoryEnum;
```

#### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

The decision definition ID.

#### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

The key of the decision definition.

#### decisionEvaluationKey?

```ts
optional decisionEvaluationKey: DecisionEvaluationKey;
```

The key of the decision evaluation.

#### decisionRequirementsId?

```ts
optional decisionRequirementsId: string;
```

The decision requirements ID.

#### decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKey;
```

The assigned key of the decision requirements.

#### deploymentKey?

```ts
optional deploymentKey: DeploymentKey;
```

The key of the deployment.

#### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

The key of the element instance.

#### entityDescription?

```ts
optional entityDescription: string;
```

Additional description of the entity affected by the operation.
For example, for variable operations, this will contain the variable name.

#### entityKey?

```ts
optional entityKey: AuditLogEntityKey;
```

#### entityType?

```ts
optional entityType: AuditLogEntityTypeEnum;
```

#### formKey?

```ts
optional formKey: FormKey;
```

The key of the form.

#### jobKey?

```ts
optional jobKey: JobKey;
```

The key of the job.

#### operationType?

```ts
optional operationType: AuditLogOperationTypeEnum;
```

#### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

The process definition ID.

#### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition.

#### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

The key of the process instance.

#### relatedEntityKey?

```ts
optional relatedEntityKey: AuditLogEntityKey;
```

The key of the related entity. The content depends on the operation type and entity type.
For example, for authorization operations, this will contain the ID of the owner (e.g., user or group) the authorization belongs to.

#### relatedEntityType?

```ts
optional relatedEntityType: AuditLogEntityTypeEnum;
```

The type of the related entity. The content depends on the operation type and entity type.
For example, for authorization operations, this will contain the type of the owner (e.g., USER or GROUP) the authorization belongs to.

#### resourceKey?

```ts
optional resourceKey: ResourceKey;
```

The system-assigned key for this resource.

#### result?

```ts
optional result: AuditLogResultEnum;
```

#### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: ProcessInstanceKey;
```

#### tenantId?

```ts
optional tenantId: TenantId;
```

The tenant ID of the audit log.

#### timestamp?

```ts
optional timestamp: string;
```

The timestamp when the operation occurred.

#### userTaskKey?

```ts
optional userTaskKey: UserTaskKey;
```

The key of the user task.
