---
title: "Type Alias: UnassignRoleFromTenantData"
sidebar_label: "UnassignRoleFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignRoleFromTenantData

```ts
type UnassignRoleFromTenantData = object;
```

Defined in: [gen/types.gen.ts:15496](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15496)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:15497](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15497)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15498](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15498)

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

Defined in: [gen/types.gen.ts:15508](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15508)

---

### url

```ts
url: "/tenants/{tenantId}/roles/{roleId}";
```

Defined in: [gen/types.gen.ts:15509](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15509)
