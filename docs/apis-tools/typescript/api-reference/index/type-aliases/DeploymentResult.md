---
title: "Type Alias: DeploymentResult"
sidebar_label: "DeploymentResult"
mdx:
  format: md
---

# Type Alias: DeploymentResult

```ts
type DeploymentResult = object;
```

Defined in: [gen/types.gen.ts:2056](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2056)

## Properties

### deploymentKey

```ts
deploymentKey: DeploymentKey;
```

Defined in: [gen/types.gen.ts:2060](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2060)

The unique key identifying the deployment.

***

### deployments

```ts
deployments: DeploymentMetadataResult[];
```

Defined in: [gen/types.gen.ts:2068](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2068)

Items deployed by the request.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2064](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2064)

The tenant ID associated with the deployment.
