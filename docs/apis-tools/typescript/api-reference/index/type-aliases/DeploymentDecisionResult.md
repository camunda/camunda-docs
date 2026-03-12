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

Defined in: [gen/types.gen.ts:2127](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2127)

A deployed decision.

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:2133](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2133)

The dmn decision ID, as parsed during deployment, together with the version forms a
unique identifier for a specific decision.

***

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:2155](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2155)

The assigned decision key, which acts as a unique identifier for this decision.

***

### decisionRequirementsId

```ts
decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:2150](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2150)

The dmn ID of the decision requirements graph that this decision is part of, as parsed during deployment.

***

### decisionRequirementsKey

```ts
decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:2160](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2160)

The assigned key of the decision requirements graph that this decision is part of.

***

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:2141](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2141)

The DMN name of the decision, as parsed during deployment.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2145](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2145)

The tenant ID of the deployed decision.

***

### version

```ts
version: number;
```

Defined in: [gen/types.gen.ts:2137](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2137)

The assigned decision version.
