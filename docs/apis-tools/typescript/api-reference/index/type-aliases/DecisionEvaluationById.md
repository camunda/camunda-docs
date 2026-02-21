---
title: "Type Alias: DecisionEvaluationById"
sidebar_label: "DecisionEvaluationById"
mdx:
  format: md
---

# Type Alias: DecisionEvaluationById

```ts
type DecisionEvaluationById = object;
```

Defined in: [gen/types.gen.ts:1519](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1519)

Decision evaluation by ID

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1526](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1526)

The ID of the decision to be evaluated.
When using the decision ID, the latest
deployed version of the decision is used.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1536](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1536)

The tenant ID of the decision.

---

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:1530](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1530)

The message variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
