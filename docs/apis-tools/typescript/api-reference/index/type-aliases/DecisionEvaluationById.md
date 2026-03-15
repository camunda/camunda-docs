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

Defined in: [gen/types.gen.ts:1554](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1554)

Decision evaluation by ID

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1561](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1561)

The ID of the decision to be evaluated.
When using the decision ID, the latest
deployed version of the decision is used.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1571](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1571)

The tenant ID of the decision.

***

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:1565](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1565)

The message variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
