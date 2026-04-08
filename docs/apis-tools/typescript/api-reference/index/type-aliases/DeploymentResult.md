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

Defined in: [gen/types.gen.ts:2054](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2054)

## Properties

### deploymentKey

```ts
deploymentKey: DeploymentKey;
```

Defined in: [gen/types.gen.ts:2058](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2058)

The unique key identifying the deployment.

---

### deployments

```ts
deployments: DeploymentMetadataResult[];
```

Defined in: [gen/types.gen.ts:2066](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2066)

Items deployed by the request.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2062](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2062)

The tenant ID associated with the deployment.
