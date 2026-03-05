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

Defined in: [gen/types.gen.ts:163](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L163)

Audit log filter request

## Properties

### actorId?

```ts
optional actorId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:195](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L195)

The actor ID search filter.

***

### actorType?

```ts
optional actorType: AuditLogActorTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:199](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L199)

The actor type search filter.

***

### agentElementId?

```ts
optional agentElementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:203](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L203)

The agent element ID search filter.

***

### auditLogKey?

```ts
optional auditLogKey: AuditLogKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:167](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L167)

The audit log key search filter.

***

### batchOperationType?

```ts
optional batchOperationType: BatchOperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:235](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L235)

The batch operation type search filter.

***

### category?

```ts
optional category: CategoryFilterProperty;
```

Defined in: [gen/types.gen.ts:219](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L219)

The category search filter.

***

### decisionDefinitionId?

```ts
optional decisionDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:259](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L259)

The decision definition ID search filter.

***

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:263](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L263)

The decision definition key search filter.

***

### decisionEvaluationKey?

```ts
optional decisionEvaluationKey: DecisionEvaluationKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:267](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L267)

The decision evaluation key search filter.

***

### decisionRequirementsId?

```ts
optional decisionRequirementsId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:251](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L251)

The decision requirements ID search filter.

***

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:255](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L255)

The decision requirements key search filter.

***

### deploymentKey?

```ts
optional deploymentKey: DeploymentKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:223](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L223)

The deployment key search filter.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:179](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L179)

The element instance key search filter.

***

### entityDescription?

```ts
optional entityDescription: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:279](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L279)

The entity description filter.

***

### entityKey?

```ts
optional entityKey: AuditLogEntityKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:207](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L207)

The entity key search filter.

***

### entityType?

```ts
optional entityType: EntityTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:211](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L211)

The entity type search filter.

***

### formKey?

```ts
optional formKey: FormKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:227](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L227)

The form key search filter.

***

### jobKey?

```ts
optional jobKey: JobKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:243](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L243)

The job key search filter.

***

### operationType?

```ts
optional operationType: OperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:183](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L183)

The operation type search filter.

***

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:239](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L239)

The process definition ID search filter.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:171](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L171)

The process definition key search filter.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:175](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L175)

The process instance key search filter.

***

### relatedEntityKey?

```ts
optional relatedEntityKey: AuditLogEntityKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:271](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L271)

The related entity key search filter.

***

### relatedEntityType?

```ts
optional relatedEntityType: EntityTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:275](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L275)

The related entity type search filter.

***

### resourceKey?

```ts
optional resourceKey: ResourceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:231](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L231)

The resource key search filter.

***

### result?

```ts
optional result: AuditLogResultFilterProperty;
```

Defined in: [gen/types.gen.ts:187](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L187)

The result search filter.

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:215](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L215)

The tenant ID search filter.

***

### timestamp?

```ts
optional timestamp: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:191](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L191)

The timestamp search filter.

***

### userTaskKey?

```ts
optional userTaskKey: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:247](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L247)

The user task key search filter.
