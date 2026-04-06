---
title: "Type Alias: UpdateTenantClusterVariableData"
sidebar_label: "UpdateTenantClusterVariableData"
mdx:
  format: md
---

# Type Alias: UpdateTenantClusterVariableData

```ts
type UpdateTenantClusterVariableData = object;
```

Defined in: [gen/types.gen.ts:9466](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9466)

## Properties

### body

```ts
body: UpdateClusterVariableRequest;
```

Defined in: [gen/types.gen.ts:9467](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9467)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9468](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9468)

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

Defined in: [gen/types.gen.ts:9478](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9478)

---

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```

Defined in: [gen/types.gen.ts:9479](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9479)
