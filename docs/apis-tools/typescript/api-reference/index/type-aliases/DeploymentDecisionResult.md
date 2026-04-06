---
title: "Type Alias: DeploymentDecisionResult"
sidebar_label: "DeploymentDecisionResult"
mdx:
  format: md
---

# Type Alias: DeploymentDecisionResult

```ts
type DeploymentDecisionResult = object;
```

Defined in: [gen/types.gen.ts:2123](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2123)

A deployed decision.

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:2129](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2129)

The dmn decision ID, as parsed during deployment, together with the version forms a
unique identifier for a specific decision.

---

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:2151](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2151)

The assigned decision key, which acts as a unique identifier for this decision.

---

### decisionRequirementsId

```ts
decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:2146](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2146)

The dmn ID of the decision requirements graph that this decision is part of, as parsed during deployment.

---

### decisionRequirementsKey

```ts
decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:2156](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2156)

The assigned key of the decision requirements graph that this decision is part of.

---

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:2137](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2137)

The DMN name of the decision, as parsed during deployment.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2141](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2141)

The tenant ID of the deployed decision.

---

### version

```ts
version: number;
```

Defined in: [gen/types.gen.ts:2133](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2133)

The assigned decision version.
