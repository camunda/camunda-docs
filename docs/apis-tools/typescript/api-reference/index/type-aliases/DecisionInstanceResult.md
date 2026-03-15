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

Defined in: [gen/types.gen.ts:1794](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1794)

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1798](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1798)

The ID of the DMN decision.

***

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1802](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1802)

The key of the decision.

***

### decisionDefinitionName

```ts
decisionDefinitionName: string;
```

Defined in: [gen/types.gen.ts:1806](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1806)

The name of the DMN decision.

***

### decisionDefinitionType

```ts
decisionDefinitionType: DecisionDefinitionTypeEnum;
```

Defined in: [gen/types.gen.ts:1807](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1807)

***

### decisionDefinitionVersion

```ts
decisionDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:1811](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1811)

The version of the decision.

***

### decisionEvaluationInstanceKey

```ts
decisionEvaluationInstanceKey: DecisionEvaluationInstanceKey;
```

Defined in: [gen/types.gen.ts:1812](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1812)

***

### decisionEvaluationKey

```ts
decisionEvaluationKey: DecisionEvaluationKey;
```

Defined in: [gen/types.gen.ts:1816](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1816)

The key of the decision evaluation where this instance was created.

***

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey | null;
```

Defined in: [gen/types.gen.ts:1820](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1820)

The key of the element instance this decision instance is linked to.

***

### evaluationDate

```ts
evaluationDate: string;
```

Defined in: [gen/types.gen.ts:1824](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1824)

The evaluation date of the decision instance.

***

### evaluationFailure

```ts
evaluationFailure: string | null;
```

Defined in: [gen/types.gen.ts:1828](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1828)

The evaluation failure of the decision instance.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey | null;
```

Defined in: [gen/types.gen.ts:1832](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1832)

The key of the process definition.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:1836](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1836)

The key of the process instance.

***

### result

```ts
result: string;
```

Defined in: [gen/types.gen.ts:1840](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1840)

The result of the decision instance.

***

### rootDecisionDefinitionKey

```ts
rootDecisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1844](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1844)

The key of the root decision definition.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:1851](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1851)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### state

```ts
state: DecisionInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:1852](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1852)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1856](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1856)

The tenant ID of the decision instance.
