---
title: "Type Alias: DeploymentMetadataResult"
sidebar_label: "DeploymentMetadataResult"
mdx:
  format: md
---

# Type Alias: DeploymentMetadataResult

```ts
type DeploymentMetadataResult = object;
```

Defined in: [gen/types.gen.ts:2071](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2071)

## Properties

### decisionDefinition

```ts
decisionDefinition: DeploymentDecisionResult | null;
```

Defined in: [gen/types.gen.ts:2079](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2079)

Deployed decision.

***

### decisionRequirements

```ts
decisionRequirements: 
  | DeploymentDecisionRequirementsResult
  | null;
```

Defined in: [gen/types.gen.ts:2083](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2083)

Deployed decision requirement definition.

***

### form

```ts
form: DeploymentFormResult | null;
```

Defined in: [gen/types.gen.ts:2087](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2087)

Deployed form.

***

### processDefinition

```ts
processDefinition: DeploymentProcessResult | null;
```

Defined in: [gen/types.gen.ts:2075](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2075)

Deployed process.

***

### resource

```ts
resource: DeploymentResourceResult | null;
```

Defined in: [gen/types.gen.ts:2091](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2091)

Deployed resource.
