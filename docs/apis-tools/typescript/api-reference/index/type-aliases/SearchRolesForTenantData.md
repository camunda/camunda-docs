---
title: "Type Alias: SearchRolesForTenantData"
sidebar_label: "SearchRolesForTenantData"
mdx:
  format: md
---

# Type Alias: SearchRolesForTenantData

```ts
type SearchRolesForTenantData = object;
```

Defined in: [gen/types.gen.ts:15470](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15470)

## Properties

### body?

```ts
optional body?: RoleSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:15471](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15471)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15472](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15472)

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

Defined in: [gen/types.gen.ts:15478](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15478)

---

### url

```ts
url: "/tenants/{tenantId}/roles/search";
```

Defined in: [gen/types.gen.ts:15479](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15479)
