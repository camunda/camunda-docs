---
title: "Type Alias: DeleteTenantClusterVariableData"
sidebar_label: "DeleteTenantClusterVariableData"
mdx:
  format: md
---

# Type Alias: DeleteTenantClusterVariableData

```ts
type DeleteTenantClusterVariableData = object;
```

Defined in: [gen/types.gen.ts:9366](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9366)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:9367](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9367)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9368](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9368)

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

Defined in: [gen/types.gen.ts:9378](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9378)

---

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```

Defined in: [gen/types.gen.ts:9379](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9379)
