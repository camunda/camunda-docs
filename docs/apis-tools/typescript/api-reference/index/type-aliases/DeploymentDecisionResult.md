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

Defined in: [gen/types.gen.ts:2125](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2125)

A deployed decision.

## Properties

### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:2131](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2131)

The dmn decision ID, as parsed during deployment, together with the version forms a
unique identifier for a specific decision.

***

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:2153](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2153)

The assigned decision key, which acts as a unique identifier for this decision.

***

### decisionRequirementsId?

```ts
optional decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:2148](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2148)

The dmn ID of the decision requirements graph that this decision is part of, as parsed during deployment.

***

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:2158](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2158)

The assigned key of the decision requirements graph that this decision is part of.

***

### name?

```ts
optional name: string;
```

Defined in: [gen/types.gen.ts:2139](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2139)

The DMN name of the decision, as parsed during deployment.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2143](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2143)

The tenant ID of the deployed decision.

***

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:2135](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2135)

The assigned decision version.
