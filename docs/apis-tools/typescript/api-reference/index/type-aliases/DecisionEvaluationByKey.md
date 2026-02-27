---
title: "Type Alias: DecisionEvaluationByKey"
sidebar_label: "DecisionEvaluationByKey"
mdx:
  format: md
---

# Type Alias: DecisionEvaluationByKey

```ts
type DecisionEvaluationByKey = object;
```

Defined in: [gen/types.gen.ts:1542](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1542)

Decision evaluation by key

## Properties

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1543](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1543)

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1553](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1553)

The tenant ID of the decision.

---

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:1547](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1547)

The message variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
