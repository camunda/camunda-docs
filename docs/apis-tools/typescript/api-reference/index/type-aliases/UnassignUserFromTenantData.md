---
title: "Type Alias: UnassignUserFromTenantData"
sidebar_label: "UnassignUserFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignUserFromTenantData

```ts
type UnassignUserFromTenantData = object;
```

Defined in: [gen/types.gen.ts:15637](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15637)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:15638](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15638)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15639](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15639)

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

#### username

```ts
username: Username;
```

The unique identifier of the user.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:15649](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15649)

---

### url

```ts
url: "/tenants/{tenantId}/users/{username}";
```

Defined in: [gen/types.gen.ts:15650](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15650)
