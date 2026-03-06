---
title: "Type Alias: DeleteDecisionInstanceData"
sidebar_label: "DeleteDecisionInstanceData"
mdx:
  format: md
---

# Type Alias: DeleteDecisionInstanceData

```ts
type DeleteDecisionInstanceData = object;
```

Defined in: [gen/types.gen.ts:9708](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9708)

## Properties

### body?

```ts
optional body: 
  | {
  operationReference?: OperationReference;
}
  | null;
```

Defined in: [gen/types.gen.ts:9709](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9709)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9712](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9712)

#### decisionInstanceKey

```ts
decisionInstanceKey: DecisionInstanceKey;
```

The key of the decision instance to delete.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:9718](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9718)

***

### url

```ts
url: "/decision-instances/{decisionInstanceKey}/deletion";
```

Defined in: [gen/types.gen.ts:9719](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9719)
