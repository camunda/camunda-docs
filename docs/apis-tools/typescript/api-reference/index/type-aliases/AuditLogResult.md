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

Defined in: [gen/types.gen.ts:13](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13)

Audit log item.

## Properties

### actorId

```ts
actorId: string | null;
```

Defined in: [gen/types.gen.ts:36](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L36)

The ID of the actor who performed the operation.

---

### actorType

```ts
actorType: AuditLogActorTypeEnum | null;
```

Defined in: [gen/types.gen.ts:40](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L40)

The type of the actor who performed the operation.

---

### agentElementId

```ts
agentElementId: string | null;
```

Defined in: [gen/types.gen.ts:44](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L44)

The element ID of the agent that performed the operation (e.g. ad-hoc subprocess element ID).

---

### auditLogKey

```ts
auditLogKey: AuditLogKey;
```

Defined in: [gen/types.gen.ts:17](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L17)

The unique key of the audit log entry.

---

### batchOperationKey

```ts
batchOperationKey: BatchOperationKey | null;
```

Defined in: [gen/types.gen.ts:24](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L24)

Key of the batch operation.

---

### batchOperationType

```ts
batchOperationType: BatchOperationTypeEnum | null;
```

Defined in: [gen/types.gen.ts:28](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L28)

The type of batch operation performed, if this is part of a batch.

---

### category

```ts
category: AuditLogCategoryEnum;
```

Defined in: [gen/types.gen.ts:50](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L50)

---

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId | null;
```

Defined in: [gen/types.gen.ts:93](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L93)

The decision definition ID.

---

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey | null;
```

Defined in: [gen/types.gen.ts:97](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L97)

The key of the decision definition.

---

### decisionEvaluationKey

```ts
decisionEvaluationKey: DecisionEvaluationKey | null;
```

Defined in: [gen/types.gen.ts:101](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L101)

The key of the decision evaluation.

---

### decisionRequirementsId

```ts
decisionRequirementsId: string | null;
```

Defined in: [gen/types.gen.ts:85](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L85)

The decision requirements ID.

---

### decisionRequirementsKey

```ts
decisionRequirementsKey: DecisionRequirementsKey | null;
```

Defined in: [gen/types.gen.ts:89](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L89)

The assigned key of the decision requirements.

---

### deploymentKey

```ts
deploymentKey: DeploymentKey | null;
```

Defined in: [gen/types.gen.ts:105](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L105)

The key of the deployment.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey | null;
```

Defined in: [gen/types.gen.ts:73](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L73)

The key of the element instance.

---

### entityDescription

```ts
entityDescription: string | null;
```

Defined in: [gen/types.gen.ts:131](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L131)

Additional description of the entity affected by the operation.
For example, for variable operations, this will contain the variable name.

---

### entityKey

```ts
entityKey: AuditLogEntityKey;
```

Defined in: [gen/types.gen.ts:18](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L18)

---

### entityType

```ts
entityType: AuditLogEntityTypeEnum;
```

Defined in: [gen/types.gen.ts:19](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L19)

---

### formKey

```ts
formKey: FormKey | null;
```

Defined in: [gen/types.gen.ts:109](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L109)

The key of the form.

---

### jobKey

```ts
jobKey: JobKey | null;
```

Defined in: [gen/types.gen.ts:77](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L77)

The key of the job.

---

### operationType

```ts
operationType: AuditLogOperationTypeEnum;
```

Defined in: [gen/types.gen.ts:20](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L20)

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId | null;
```

Defined in: [gen/types.gen.ts:54](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L54)

The process definition ID.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey | null;
```

Defined in: [gen/types.gen.ts:58](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L58)

The key of the process definition.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:62](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L62)

The key of the process instance.

---

### relatedEntityKey

```ts
relatedEntityKey: AuditLogEntityKey | null;
```

Defined in: [gen/types.gen.ts:119](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L119)

The key of the related entity. The content depends on the operation type and entity type.
For example, for authorization operations, this will contain the ID of the owner (e.g., user or group) the authorization belongs to.

---

### relatedEntityType

```ts
relatedEntityType: AuditLogEntityTypeEnum | null;
```

Defined in: [gen/types.gen.ts:125](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L125)

The type of the related entity. The content depends on the operation type and entity type.
For example, for authorization operations, this will contain the type of the owner (e.g., USER or GROUP) the authorization belongs to.

---

### resourceKey

```ts
resourceKey: ResourceKey | null;
```

Defined in: [gen/types.gen.ts:113](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L113)

The system-assigned key for this resource.

---

### result

```ts
result: AuditLogResultEnum;
```

Defined in: [gen/types.gen.ts:49](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L49)

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:69](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L69)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### tenantId

```ts
tenantId: TenantId | null;
```

Defined in: [gen/types.gen.ts:48](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L48)

The tenant ID of the audit log.

---

### timestamp

```ts
timestamp: string;
```

Defined in: [gen/types.gen.ts:32](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L32)

The timestamp when the operation occurred.

---

### userTaskKey

```ts
userTaskKey: UserTaskKey | null;
```

Defined in: [gen/types.gen.ts:81](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L81)

The key of the user task.
