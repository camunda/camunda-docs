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

Defined in: [gen/types.gen.ts:1552](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1552)

Decision evaluation by ID

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1559](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1559)

The ID of the decision to be evaluated.
When using the decision ID, the latest
deployed version of the decision is used.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1569](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1569)

The tenant ID of the decision.

***

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:1563](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1563)

The message variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
