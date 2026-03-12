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

Defined in: [gen/types.gen.ts:9775](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9775)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:9776](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9776)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9777](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9777)

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

Defined in: [gen/types.gen.ts:9783](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9783)

***

### url

```ts
url: "/decision-instances/{decisionEvaluationInstanceKey}";
```

Defined in: [gen/types.gen.ts:9784](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9784)
