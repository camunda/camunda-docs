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

Defined in: [gen/types.gen.ts:9851](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9851)

## Properties

### body?

```ts
optional body?:
  | {
  operationReference?: OperationReference;
}
  | null;
```

Defined in: [gen/types.gen.ts:9852](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9852)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9855](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9855)

#### decisionEvaluationKey

```ts
decisionEvaluationKey: DecisionEvaluationKey;
```

The key of the decision evaluation to delete.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:9861](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9861)

---

### url

```ts
url: "/decision-instances/{decisionEvaluationKey}/deletion";
```

Defined in: [gen/types.gen.ts:9862](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9862)
