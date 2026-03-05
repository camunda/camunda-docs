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

Defined in: [gen/types.gen.ts:1792](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1792)

## Properties

### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1806](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1806)

The ID of the DMN decision.

***

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1846](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1846)

The key of the decision.

***

### decisionDefinitionName?

```ts
optional decisionDefinitionName: string;
```

Defined in: [gen/types.gen.ts:1810](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1810)

The name of the DMN decision.

***

### decisionDefinitionType?

```ts
optional decisionDefinitionType: DecisionDefinitionTypeEnum;
```

Defined in: [gen/types.gen.ts:1815](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1815)

***

### decisionDefinitionVersion?

```ts
optional decisionDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:1814](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1814)

The version of the decision.

***

### decisionEvaluationInstanceKey?

```ts
optional decisionEvaluationInstanceKey: DecisionEvaluationInstanceKey;
```

Defined in: [gen/types.gen.ts:1793](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1793)

***

### decisionEvaluationKey?

```ts
optional decisionEvaluationKey: DecisionEvaluationKey;
```

Defined in: [gen/types.gen.ts:1827](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1827)

The key of the decision evaluation where this instance was created.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:1850](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1850)

The key of the element instance this decision instance is linked to.

***

### evaluationDate?

```ts
optional evaluationDate: string;
```

Defined in: [gen/types.gen.ts:1798](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1798)

The evaluation date of the decision instance.

***

### evaluationFailure

```ts
evaluationFailure: string | null;
```

Defined in: [gen/types.gen.ts:1802](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1802)

The evaluation failure of the decision instance.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:1831](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1831)

The key of the process definition.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:1835](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1835)

The key of the process instance.

***

### result?

```ts
optional result: string;
```

Defined in: [gen/types.gen.ts:1819](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1819)

The result of the decision instance.

***

### rootDecisionDefinitionKey?

```ts
optional rootDecisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1854](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1854)

The key of the root decision definition.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:1842](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1842)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### state?

```ts
optional state: DecisionInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:1794](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1794)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1823](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1823)

The tenant ID of the decision instance.
