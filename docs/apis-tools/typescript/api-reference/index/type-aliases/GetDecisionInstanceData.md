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

Defined in: [gen/types.gen.ts:9536](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9536)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:9537](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9537)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9538](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9538)

#### decisionEvaluationInstanceKey

```ts
decisionEvaluationInstanceKey: DecisionInstanceKey;
```

The assigned key of the decision instance, which acts as a unique identifier for this decision instance.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:9544](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9544)

---

### url

```ts
url: "/decision-instances/{decisionEvaluationInstanceKey}";
```

Defined in: [gen/types.gen.ts:9545](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9545)
