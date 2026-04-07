---
title: "Type Alias: AssignRoleToTenantData"
sidebar_label: "AssignRoleToTenantData"
mdx:
  format: md
---

# Type Alias: AssignRoleToTenantData

```ts
type AssignRoleToTenantData = object;
```

Defined in: [gen/types.gen.ts:15547](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15547)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:15548](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15548)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15549](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15549)

#### roleId

```ts
roleId: string;
```

The unique identifier of the role.

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:15559](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15559)

---

### url

```ts
url: "/tenants/{tenantId}/roles/{roleId}";
```

Defined in: [gen/types.gen.ts:15560](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15560)
