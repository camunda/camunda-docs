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

Defined in: [gen/types.gen.ts:1993](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1993)

## Properties

### deploymentKey

```ts
deploymentKey: DeploymentKey;
```

Defined in: [gen/types.gen.ts:1997](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1997)

The unique key identifying the deployment.

---

### deployments

```ts
deployments: DeploymentMetadataResult[];
```

Defined in: [gen/types.gen.ts:2005](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2005)

Items deployed by the request.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2001](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2001)

The tenant ID associated with the deployment.
