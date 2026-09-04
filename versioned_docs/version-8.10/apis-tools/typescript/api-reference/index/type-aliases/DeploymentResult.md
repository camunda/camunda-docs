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

## Properties

### deploymentKey

```ts
deploymentKey: DeploymentKey;
```

The unique key identifying the deployment.

---

### deployments

```ts
deployments: DeploymentMetadataResult[];
```

Items deployed by the request.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID associated with the deployment.
