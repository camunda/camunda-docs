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

Defined in: [gen/types.gen.ts:1550](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1550)

Decision evaluation by ID

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1557](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1557)

The ID of the decision to be evaluated.
When using the decision ID, the latest
deployed version of the decision is used.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Defined in: [gen/types.gen.ts:1567](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1567)

The tenant ID of the decision.

---

### variables?

```ts
optional variables?: object;
```

Defined in: [gen/types.gen.ts:1561](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1561)

The decision evaluation variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
