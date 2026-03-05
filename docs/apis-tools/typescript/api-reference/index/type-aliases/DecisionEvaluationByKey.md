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

Defined in: [gen/types.gen.ts:1575](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1575)

Decision evaluation by key

## Properties

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1576](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1576)

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1586](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1586)

The tenant ID of the decision.

***

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:1580](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1580)

The message variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
