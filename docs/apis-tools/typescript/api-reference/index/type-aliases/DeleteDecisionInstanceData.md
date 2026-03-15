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

Defined in: [gen/types.gen.ts:9822](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9822)

## Properties

### body?

```ts
optional body: 
  | {
  operationReference?: OperationReference;
}
  | null;
```

Defined in: [gen/types.gen.ts:9823](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9823)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9826](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9826)

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

Defined in: [gen/types.gen.ts:9832](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9832)

***

### url

```ts
url: "/decision-instances/{decisionInstanceKey}/deletion";
```

Defined in: [gen/types.gen.ts:9833](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9833)
