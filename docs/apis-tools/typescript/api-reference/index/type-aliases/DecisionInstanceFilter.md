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

Defined in: [gen/types.gen.ts:1716](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1716)

Decision instance search filter.

## Properties

### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1736](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1736)

The ID of the DMN decision.

***

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:1766](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1766)

The key of the decision.

***

### decisionDefinitionName?

```ts
optional decisionDefinitionName: string;
```

Defined in: [gen/types.gen.ts:1740](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1740)

The name of the DMN decision.

***

### decisionDefinitionType?

```ts
optional decisionDefinitionType: DecisionDefinitionTypeEnum;
```

Defined in: [gen/types.gen.ts:1745](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1745)

***

### decisionDefinitionVersion?

```ts
optional decisionDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:1744](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1744)

The version of the decision.

***

### decisionEvaluationInstanceKey?

```ts
optional decisionEvaluationInstanceKey: DecisionEvaluationInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:1720](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1720)

The key of the decision evaluation instance.

***

### decisionEvaluationKey?

```ts
optional decisionEvaluationKey: DecisionEvaluationKey;
```

Defined in: [gen/types.gen.ts:1754](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1754)

The key of the parent decision evaluation. Note that this is not the identifier of an individual decision instance; the `decisionEvaluationInstanceKey` is the identifier for a decision instance.

***

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:1778](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1778)

The key of the decision requirements definition.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:1770](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1770)

The key of the element instance this decision instance is linked to.

***

### evaluationDate?

```ts
optional evaluationDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:1732](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1732)

The evaluation date of the decision instance.

***

### evaluationFailure?

```ts
optional evaluationFailure: string;
```

Defined in: [gen/types.gen.ts:1728](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1728)

The evaluation failure of the decision instance.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:1758](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1758)

The key of the process definition.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:1762](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1762)

The key of the process instance.

***

### rootDecisionDefinitionKey?

```ts
optional rootDecisionDefinitionKey: DecisionDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:1774](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1774)

The key of the root decision definition.

***

### state?

```ts
optional state: DecisionInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:1724](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1724)

The state of the decision instance.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1749](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1749)

The tenant ID of the decision instance.
