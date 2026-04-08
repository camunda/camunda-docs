---
title: "Type Alias: CreateDeploymentData"
sidebar_label: "CreateDeploymentData"
mdx:
  format: md
---

# Type Alias: CreateDeploymentData

```ts
type CreateDeploymentData = object;
```

Defined in: [gen/types.gen.ts:10069](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10069)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:10070](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10070)

#### resources

```ts
resources: (Blob | File)[];
```

The binary data to create the deployment resources. It is possible to have more than one form part with different form part names for the binary data to create a deployment.

#### tenantId?

```ts
optional tenantId?: TenantId;
```

---

### path?

```ts
optional path?: never;
```

Defined in: [gen/types.gen.ts:10078](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10078)

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:10079](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10079)

---

### url

```ts
url: "/deployments";
```

Defined in: [gen/types.gen.ts:10080](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10080)
