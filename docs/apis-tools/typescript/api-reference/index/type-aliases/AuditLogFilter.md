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

Defined in: [gen/types.gen.ts:150](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L150)

Audit log filter request

## Properties

### actorId?

```ts
optional actorId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:182](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L182)

The actor ID search filter.

---

### actorType?

```ts
optional actorType: AuditLogActorTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:186](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L186)

The actor type search filter.

---

### auditLogKey?

```ts
optional auditLogKey: AuditLogKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:154](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L154)

The audit log key search filter.

---

### batchOperationType?

```ts
optional batchOperationType: BatchOperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:218](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L218)

The batch operation type search filter.

---

### category?

```ts
optional category: CategoryFilterProperty;
```

Defined in: [gen/types.gen.ts:202](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L202)

The category search filter.

---

### decisionDefinitionId?

```ts
optional decisionDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:242](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L242)

The decision definition ID search filter.

---

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:246](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L246)

The decision definition key search filter.

---

### decisionEvaluationKey?

```ts
optional decisionEvaluationKey: DecisionEvaluationKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:250](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L250)

The decision evaluation key search filter.

---

### decisionRequirementsId?

```ts
optional decisionRequirementsId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:234](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L234)

The decision requirements ID search filter.

---

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:238](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L238)

The decision requirements key search filter.

---

### deploymentKey?

```ts
optional deploymentKey: DeploymentKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:206](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L206)

The deployment key search filter.

---

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:166](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L166)

The element instance key search filter.

---

### entityDescription?

```ts
optional entityDescription: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:262](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L262)

The entity description filter.

---

### entityKey?

```ts
optional entityKey: AuditLogEntityKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:190](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L190)

The entity key search filter.

---

### entityType?

```ts
optional entityType: EntityTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:194](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L194)

The entity type search filter.

---

### formKey?

```ts
optional formKey: FormKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:210](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L210)

The form key search filter.

---

### jobKey?

```ts
optional jobKey: JobKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:226](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L226)

The job key search filter.

---

### operationType?

```ts
optional operationType: OperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:170](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L170)

The operation type search filter.

---

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:222](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L222)

The process definition ID search filter.

---

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:158](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L158)

The process definition key search filter.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:162](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L162)

The process instance key search filter.

---

### relatedEntityKey?

```ts
optional relatedEntityKey: AuditLogEntityKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:254](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L254)

The related entity key search filter.

---

### relatedEntityType?

```ts
optional relatedEntityType: EntityTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:258](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L258)

The related entity type search filter.

---

### resourceKey?

```ts
optional resourceKey: ResourceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:214](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L214)

The resource key search filter.

---

### result?

```ts
optional result: AuditLogResultFilterProperty;
```

Defined in: [gen/types.gen.ts:174](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L174)

The result search filter.

---

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:198](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L198)

The tenant ID search filter.

---

### timestamp?

```ts
optional timestamp: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:178](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L178)

The timestamp search filter.

---

### userTaskKey?

```ts
optional userTaskKey: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:230](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L230)

The user task key search filter.
