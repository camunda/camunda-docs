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

Defined in: [gen/types.gen.ts:9651](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9651)

## Properties

### body?

```ts
optional body: DeleteProcessInstanceRequest;
```

Defined in: [gen/types.gen.ts:9652](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9652)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9653](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9653)

#### decisionInstanceKey

```ts
decisionInstanceKey: DecisionInstanceKey;
```

The key of the decision instance to delete.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:9659](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9659)

---

### url

```ts
url: "/decision-instances/{decisionInstanceKey}/deletion";
```

Defined in: [gen/types.gen.ts:9660](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9660)
