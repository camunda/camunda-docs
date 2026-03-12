---
title: "Interface: ExtendedDeploymentResult"
sidebar_label: "ExtendedDeploymentResult"
mdx:
  format: md
---

# Interface: ExtendedDeploymentResult

Defined in: [gen/CamundaClient.ts:1086](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1086)

Extended deployment result with typed buckets for direct access to deployed artifacts.

## Extends

- `_DataOf`\<*typeof* `Sdk.createDeployment`\>

## Properties

### decisionRequirements

```ts
decisionRequirements: DeploymentDecisionRequirementsResult[];
```

Defined in: [gen/CamundaClient.ts:1089](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1089)

***

### decisions

```ts
decisions: DeploymentDecisionResult[];
```

Defined in: [gen/CamundaClient.ts:1088](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1088)

***

### deploymentKey

```ts
deploymentKey: DeploymentKey;
```

Defined in: [gen/types.gen.ts:2062](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2062)

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

Defined in: [gen/types.gen.ts:2070](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2070)

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

Defined in: [gen/CamundaClient.ts:1090](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1090)

***

### processes

```ts
processes: DeploymentProcessResult[];
```

Defined in: [gen/CamundaClient.ts:1087](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1087)

***

### resources

```ts
resources: DeploymentResourceResult[];
```

Defined in: [gen/CamundaClient.ts:1091](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L1091)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2066](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2066)

The tenant ID associated with the deployment.

#### Inherited from

```ts
_DataOf.tenantId
```
