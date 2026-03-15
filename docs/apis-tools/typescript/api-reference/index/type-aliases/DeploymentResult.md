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

Defined in: [gen/types.gen.ts:2058](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2058)

## Properties

### deploymentKey

```ts
deploymentKey: DeploymentKey;
```

Defined in: [gen/types.gen.ts:2062](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2062)

The unique key identifying the deployment.

***

### deployments

```ts
deployments: DeploymentMetadataResult[];
```

Defined in: [gen/types.gen.ts:2070](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2070)

Items deployed by the request.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2066](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2066)

The tenant ID associated with the deployment.
