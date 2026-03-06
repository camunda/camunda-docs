---
title: "Type Alias: EvaluatedDecisionResult"
sidebar_label: "EvaluatedDecisionResult"
mdx:
  format: md
---

# Type Alias: EvaluatedDecisionResult

```ts
type EvaluatedDecisionResult = object;
```

Defined in: [gen/types.gen.ts:1650](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1650)

A decision that was evaluated.

## Properties

### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1654](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1654)

The ID of the decision which was evaluated.

***

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1687](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1687)

The unique key identifying the decision which was evaluate.

***

### decisionDefinitionName?

```ts
optional decisionDefinitionName: string;
```

Defined in: [gen/types.gen.ts:1658](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1658)

The name of the decision which was evaluated.

***

### decisionDefinitionType

```ts
decisionDefinitionType: string;
```

Defined in: [gen/types.gen.ts:1666](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1666)

The type of the decision which was evaluated.

***

### decisionDefinitionVersion?

```ts
optional decisionDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:1662](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1662)

The version of the decision which was evaluated.

***

### decisionEvaluationInstanceKey?

```ts
optional decisionEvaluationInstanceKey: DecisionEvaluationInstanceKey;
```

Defined in: [gen/types.gen.ts:1691](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1691)

The unique key identifying this decision evaluation instance.

***

### evaluatedInputs

```ts
evaluatedInputs: EvaluatedDecisionInputItem[];
```

Defined in: [gen/types.gen.ts:1683](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1683)

The decision inputs that were evaluated within this decision evaluation.

***

### matchedRules

```ts
matchedRules: MatchedDecisionRuleItem[];
```

Defined in: [gen/types.gen.ts:1679](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1679)

The decision rules that matched within this decision evaluation.

***

### output?

```ts
optional output: string;
```

Defined in: [gen/types.gen.ts:1671](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1671)

JSON document that will instantiate the result of the decision which was evaluated.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1675](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1675)

The tenant ID of the evaluated decision.
