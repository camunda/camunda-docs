---
title: "Type Alias: CreateDeploymentResponses"
sidebar_label: "CreateDeploymentResponses"
mdx:
  format: md
---

# Type Alias: CreateDeploymentResponses

```ts
type CreateDeploymentResponses = object;
```

Defined in: [gen/types.gen.ts:9967](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9967)

## Properties

### 200

```ts
200: object;
```

Defined in: [gen/types.gen.ts:9971](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9971)

The resources are deployed.

#### deploymentKey

```ts
deploymentKey: DeploymentKey;
```

The unique key identifying the deployment.

#### deployments

```ts
deployments: object[];
```

Items deployed by the request.

#### tenantId

```ts
tenantId: TenantId;
```

The tenant ID associated with the deployment.
