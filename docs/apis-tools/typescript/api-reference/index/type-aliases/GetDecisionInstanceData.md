---
title: "Type Alias: GetDecisionInstanceData"
sidebar_label: "GetDecisionInstanceData"
mdx:
  format: md
---

# Type Alias: GetDecisionInstanceData

```ts
type GetDecisionInstanceData = object;
```

Defined in: [gen/types.gen.ts:9661](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9661)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:9662](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9662)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9663](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9663)

#### decisionEvaluationInstanceKey

```ts
decisionEvaluationInstanceKey: DecisionEvaluationInstanceKey;
```

The assigned key of the decision instance, which acts as a unique identifier for this decision instance.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:9669](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9669)

***

### url

```ts
url: "/decision-instances/{decisionEvaluationInstanceKey}";
```

Defined in: [gen/types.gen.ts:9670](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9670)
