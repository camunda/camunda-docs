---
title: "Interface: ExtendedDeploymentResult"
sidebar_label: "ExtendedDeploymentResult"
mdx:
  format: md
---

# Interface: ExtendedDeploymentResult

Extended deployment result with typed buckets for direct access to deployed artifacts.

## Extends

- `_DataOf`\<_typeof_ `Sdk.createDeployment`\>

## Properties

### decisionRequirements

```ts
decisionRequirements: DeploymentDecisionRequirementsResult[];
```

---

### decisions

```ts
decisions: DeploymentDecisionResult[];
```

---

### deploymentKey

```ts
deploymentKey: DeploymentKey;
```

The unique key identifying the deployment.

#### Inherited from

```ts
_DataOf.deploymentKey;
```

---

### deployments

```ts
deployments: DeploymentMetadataResult[];
```

Items deployed by the request.

#### Inherited from

```ts
_DataOf.deployments;
```

---

### forms

```ts
forms: DeploymentFormResult[];
```

---

### processes

```ts
processes: DeploymentProcessResult[];
```

---

### resources

```ts
resources: DeploymentResourceResult[];
```

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID associated with the deployment.

#### Inherited from

```ts
_DataOf.tenantId;
```
