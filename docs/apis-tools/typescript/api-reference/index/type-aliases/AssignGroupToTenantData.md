---
title: "Type Alias: AssignGroupToTenantData"
sidebar_label: "AssignGroupToTenantData"
mdx:
  format: md
---

# Type Alias: AssignGroupToTenantData

```ts
type AssignGroupToTenantData = object;
```

Defined in: [gen/types.gen.ts:15291](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15291)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:15292](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15292)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15293](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15293)

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

Defined in: [gen/types.gen.ts:15303](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15303)

---

### url

```ts
url: "/tenants/{tenantId}/groups/{groupId}";
```

Defined in: [gen/types.gen.ts:15304](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15304)
