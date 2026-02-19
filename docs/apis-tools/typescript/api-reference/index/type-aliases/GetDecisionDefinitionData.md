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

Defined in: [gen/types.gen.ts:9271](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9271)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:9272](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9272)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9273](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9273)

#### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

The assigned key of the decision definition, which acts as a unique identifier for this decision.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:9279](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9279)

---

### url

```ts
url: "/decision-definitions/{decisionDefinitionKey}";
```

Defined in: [gen/types.gen.ts:9280](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9280)
