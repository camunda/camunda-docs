---
title: "Type Alias: SearchGroupIdsForTenantData"
sidebar_label: "SearchGroupIdsForTenantData"
mdx:
  format: md
---

# Type Alias: SearchGroupIdsForTenantData

```ts
type SearchGroupIdsForTenantData = object;
```

Defined in: [gen/types.gen.ts:15219](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15219)

## Properties

### body?

```ts
optional body?: TenantGroupSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:15220](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15220)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15221](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15221)

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

Defined in: [gen/types.gen.ts:15227](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15227)

---

### url

```ts
url: "/tenants/{tenantId}/groups/search";
```

Defined in: [gen/types.gen.ts:15228](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15228)
