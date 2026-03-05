---
title: "Interface: ExtendedDeploymentResult"
sidebar_label: "ExtendedDeploymentResult"
mdx:
  format: md
---

# Interface: ExtendedDeploymentResult

Defined in: [gen/CamundaClient.ts:1071](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1071)

Extended deployment result with typed buckets for direct access to deployed artifacts.

## Extends

- `_DataOf`\<*typeof* `Sdk.createDeployment`\>

## Properties

### decisionRequirements

```ts
decisionRequirements: DeploymentDecisionRequirementsResult[];
```

Defined in: [gen/CamundaClient.ts:1074](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1074)

***

### decisions

```ts
decisions: DeploymentDecisionResult[];
```

Defined in: [gen/CamundaClient.ts:1073](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1073)

***

### deploymentKey

```ts
deploymentKey: DeploymentKey;
```

Defined in: [gen/types.gen.ts:2060](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2060)

The unique key identifying the deployment.

#### Inherited from

```ts
_DataOf.deploymentKey
```

***

### deployments

```ts
deployments: DeploymentMetadataResult[];
```

Defined in: [gen/types.gen.ts:2068](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2068)

Items deployed by the request.

#### Inherited from

```ts
_DataOf.deployments
```

***

### forms

```ts
forms: DeploymentFormResult[];
```

Defined in: [gen/CamundaClient.ts:1075](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1075)

***

### processes

```ts
processes: DeploymentProcessResult[];
```

Defined in: [gen/CamundaClient.ts:1072](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1072)

***

### resources

```ts
resources: DeploymentResourceResult[];
```

Defined in: [gen/CamundaClient.ts:1076](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L1076)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2064](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2064)

The tenant ID associated with the deployment.

#### Inherited from

```ts
_DataOf.tenantId
```
