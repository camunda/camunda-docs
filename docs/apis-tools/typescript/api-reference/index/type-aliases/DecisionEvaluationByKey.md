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

Defined in: [gen/types.gen.ts:1573](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1573)

Decision evaluation by key

## Properties

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1574](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1574)

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Defined in: [gen/types.gen.ts:1584](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1584)

The tenant ID of the decision.

---

### variables?

```ts
optional variables?: object;
```

Defined in: [gen/types.gen.ts:1578](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1578)

The decision evaluation variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
