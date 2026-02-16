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

Defined in: [gen/types.gen.ts:13](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13)

Audit log item.

## Properties

### actorId?

```ts
optional actorId: string;
```

Defined in: [gen/types.gen.ts:36](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L36)

The ID of the actor who performed the operation.

---

### actorType?

```ts
optional actorType: AuditLogActorTypeEnum;
```

Defined in: [gen/types.gen.ts:37](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L37)

---

### annotation?

```ts
optional annotation: string;
```

Defined in: [gen/types.gen.ts:46](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L46)

Additional notes about the operation.

---

### auditLogKey?

```ts
optional auditLogKey: AuditLogKey;
```

Defined in: [gen/types.gen.ts:17](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17)

The unique key of the audit log entry.

---

### batchOperationKey?

```ts
optional batchOperationKey: BatchOperationKey;
```

Defined in: [gen/types.gen.ts:24](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L24)

Key of the batch operation.

---

### batchOperationType?

```ts
optional batchOperationType: BatchOperationTypeEnum;
```

Defined in: [gen/types.gen.ts:28](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L28)

The type of batch operation performed, if this is part of a batch.

---

### category?

```ts
optional category: AuditLogCategoryEnum;
```

Defined in: [gen/types.gen.ts:47](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L47)

---

### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:84](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L84)

The decision definition ID.

---

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:88](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L88)

The key of the decision definition.

---

### decisionEvaluationKey?

```ts
optional decisionEvaluationKey: DecisionEvaluationKey;
```

Defined in: [gen/types.gen.ts:92](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L92)

The key of the decision evaluation.

---

### decisionRequirementsId?

```ts
optional decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:76](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L76)

The decision requirements ID.

---

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:80](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L80)

The assigned key of the decision requirements.

---

### deploymentKey?

```ts
optional deploymentKey: DeploymentKey;
```

Defined in: [gen/types.gen.ts:96](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L96)

The key of the deployment.

---

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:64](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L64)

The key of the element instance.

---

### entityDescription?

```ts
optional entityDescription: string;
```

Defined in: [gen/types.gen.ts:122](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L122)

Additional description of the entity affected by the operation.
For example, for variable operations, this will contain the variable name.

---

### entityKey?

```ts
optional entityKey: AuditLogEntityKey;
```

Defined in: [gen/types.gen.ts:18](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L18)

---

### entityType?

```ts
optional entityType: AuditLogEntityTypeEnum;
```

Defined in: [gen/types.gen.ts:19](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L19)

---

### formKey?

```ts
optional formKey: FormKey;
```

Defined in: [gen/types.gen.ts:100](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L100)

The key of the form.

---

### jobKey?

```ts
optional jobKey: JobKey;
```

Defined in: [gen/types.gen.ts:68](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L68)

The key of the job.

---

### operationType?

```ts
optional operationType: AuditLogOperationTypeEnum;
```

Defined in: [gen/types.gen.ts:20](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L20)

---

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:51](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L51)

The process definition ID.

---

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:55](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L55)

The key of the process definition.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:59](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L59)

The key of the process instance.

---

### relatedEntityKey?

```ts
optional relatedEntityKey: AuditLogEntityKey;
```

Defined in: [gen/types.gen.ts:110](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L110)

The key of the related entity. The content depends on the operation type and entity type.
For example, for authorization operations, this will contain the ID of the owner (e.g., user or group) the authorization belongs to.

---

### relatedEntityType?

```ts
optional relatedEntityType: AuditLogEntityTypeEnum;
```

Defined in: [gen/types.gen.ts:116](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L116)

The type of the related entity. The content depends on the operation type and entity type.
For example, for authorization operations, this will contain the type of the owner (e.g., USER or GROUP) the authorization belongs to.

---

### resourceKey?

```ts
optional resourceKey: ResourceKey;
```

Defined in: [gen/types.gen.ts:104](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L104)

The system-assigned key for this resource.

---

### result?

```ts
optional result: AuditLogResultEnum;
```

Defined in: [gen/types.gen.ts:42](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L42)

---

### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: RootProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:60](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L60)

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:41](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L41)

The tenant ID of the audit log.

---

### timestamp?

```ts
optional timestamp: string;
```

Defined in: [gen/types.gen.ts:32](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L32)

The timestamp when the operation occurred.

---

### userTaskKey?

```ts
optional userTaskKey: UserTaskKey;
```

Defined in: [gen/types.gen.ts:72](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L72)

The key of the user task.
