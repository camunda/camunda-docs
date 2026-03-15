---
title: "Type Alias: EvaluateDecisionResult"
sidebar_label: "EvaluateDecisionResult"
mdx:
  format: md
---

# Type Alias: EvaluateDecisionResult

```ts
type EvaluateDecisionResult = object;
```

Defined in: [gen/types.gen.ts:1591](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1591)

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1595](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1595)

The ID of the decision which was evaluated.

***

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1599](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1599)

The unique key identifying the decision which was evaluated.

***

### decisionDefinitionName

```ts
decisionDefinitionName: string;
```

Defined in: [gen/types.gen.ts:1603](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1603)

The name of the decision which was evaluated.

***

### decisionDefinitionVersion

```ts
decisionDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:1607](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1607)

The version of the decision which was evaluated.

***

### decisionEvaluationKey

```ts
decisionEvaluationKey: DecisionEvaluationKey;
```

Defined in: [gen/types.gen.ts:1611](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1611)

The unique key identifying this decision evaluation.

***

### ~~decisionInstanceKey~~

```ts
decisionInstanceKey: DecisionInstanceKey;
```

Defined in: [gen/types.gen.ts:1617](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1617)

Deprecated, please refer to `decisionEvaluationKey`.

#### Deprecated

***

### decisionRequirementsId

```ts
decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:1621](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1621)

The ID of the decision requirements graph that the decision which was evaluated is part of.

***

### decisionRequirementsKey

```ts
decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:1625](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1625)

The unique key identifying the decision requirements graph that the decision which was evaluated is part of.

***

### evaluatedDecisions

```ts
evaluatedDecisions: EvaluatedDecisionResult[];
```

Defined in: [gen/types.gen.ts:1629](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1629)

Decisions that were evaluated within the requested decision evaluation.

***

### failedDecisionDefinitionId

```ts
failedDecisionDefinitionId: DecisionDefinitionId | null;
```

Defined in: [gen/types.gen.ts:1633](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1633)

The ID of the decision which failed during evaluation.

***

### failureMessage

```ts
failureMessage: string | null;
```

Defined in: [gen/types.gen.ts:1637](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1637)

Message describing why the decision which was evaluated failed.

***

### output

```ts
output: string;
```

Defined in: [gen/types.gen.ts:1642](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1642)

JSON document that will instantiate the result of the decision which was evaluated.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1646](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1646)

The tenant ID of the evaluated decision.
