---
title: "Type Alias: UnassignGroupFromTenantData"
sidebar_label: "UnassignGroupFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignGroupFromTenantData

```ts
type UnassignGroupFromTenantData = object;
```

Defined in: [gen/types.gen.ts:15240](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15240)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:15241](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15241)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15242](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15242)

#### groupId

```ts
groupId: string;
```

The unique identifier of the group.

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

Defined in: [gen/types.gen.ts:15252](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15252)

---

### url

```ts
url: "/tenants/{tenantId}/groups/{groupId}";
```

Defined in: [gen/types.gen.ts:15253](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15253)
