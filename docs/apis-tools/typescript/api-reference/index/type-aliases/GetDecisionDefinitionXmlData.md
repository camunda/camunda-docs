---
title: "Type Alias: GetDecisionDefinitionXmlData"
sidebar_label: "GetDecisionDefinitionXmlData"
mdx:
  format: md
---

# Type Alias: GetDecisionDefinitionXmlData

```ts
type GetDecisionDefinitionXmlData = object;
```

Defined in: [gen/types.gen.ts:9318](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9318)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:9319](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9319)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9320](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9320)

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

Defined in: [gen/types.gen.ts:9326](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9326)

---

### url

```ts
url: "/decision-definitions/{decisionDefinitionKey}/xml";
```

Defined in: [gen/types.gen.ts:9327](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9327)
