---
title: "Type Alias: GetDecisionDefinitionData"
sidebar_label: "GetDecisionDefinitionData"
mdx:
  format: md
---

# Type Alias: GetDecisionDefinitionData

```ts
type GetDecisionDefinitionData = object;
```

Defined in: [gen/types.gen.ts:9530](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9530)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:9531](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9531)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9532](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9532)

#### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

The assigned key of the decision definition, which acts as a unique identifier for this decision.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:9538](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9538)

***

### url

```ts
url: "/decision-definitions/{decisionDefinitionKey}";
```

Defined in: [gen/types.gen.ts:9539](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9539)
