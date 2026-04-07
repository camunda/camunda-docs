---
title: "Type Alias: GetTenantClusterVariableData"
sidebar_label: "GetTenantClusterVariableData"
mdx:
  format: md
---

# Type Alias: GetTenantClusterVariableData

```ts
type GetTenantClusterVariableData = object;
```

Defined in: [gen/types.gen.ts:9416](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9416)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:9417](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9417)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9418](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9418)

#### name

```ts
name: string;
```

The name of the cluster variable

#### tenantId

```ts
tenantId: TenantId;
```

The tenant ID

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:9428](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9428)

---

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```

Defined in: [gen/types.gen.ts:9429](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9429)
