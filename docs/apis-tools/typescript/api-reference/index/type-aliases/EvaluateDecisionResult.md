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

Defined in: [gen/types.gen.ts:1589](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1589)

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1593](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1593)

The ID of the decision which was evaluated.

***

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1597](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1597)

The unique key identifying the decision which was evaluated.

***

### decisionDefinitionName

```ts
decisionDefinitionName: string;
```

Defined in: [gen/types.gen.ts:1601](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1601)

The name of the decision which was evaluated.

***

### decisionDefinitionVersion

```ts
decisionDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:1605](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1605)

The version of the decision which was evaluated.

***

### decisionEvaluationKey

```ts
decisionEvaluationKey: DecisionEvaluationKey;
```

Defined in: [gen/types.gen.ts:1609](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1609)

The unique key identifying this decision evaluation.

***

### ~~decisionInstanceKey~~

```ts
decisionInstanceKey: DecisionInstanceKey;
```

Defined in: [gen/types.gen.ts:1615](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1615)

Deprecated, please refer to `decisionEvaluationKey`.

#### Deprecated

***

### decisionRequirementsId

```ts
decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:1619](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1619)

The ID of the decision requirements graph that the decision which was evaluated is part of.

***

### decisionRequirementsKey

```ts
decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:1623](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1623)

The unique key identifying the decision requirements graph that the decision which was evaluated is part of.

***

### evaluatedDecisions

```ts
evaluatedDecisions: EvaluatedDecisionResult[];
```

Defined in: [gen/types.gen.ts:1627](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1627)

Decisions that were evaluated within the requested decision evaluation.

***

### failedDecisionDefinitionId

```ts
failedDecisionDefinitionId: DecisionDefinitionId | null;
```

Defined in: [gen/types.gen.ts:1631](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1631)

The ID of the decision which failed during evaluation.

***

### failureMessage

```ts
failureMessage: string | null;
```

Defined in: [gen/types.gen.ts:1635](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1635)

Message describing why the decision which was evaluated failed.

***

### output

```ts
output: string;
```

Defined in: [gen/types.gen.ts:1640](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1640)

JSON document that will instantiate the result of the decision which was evaluated.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1644](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1644)

The tenant ID of the evaluated decision.
