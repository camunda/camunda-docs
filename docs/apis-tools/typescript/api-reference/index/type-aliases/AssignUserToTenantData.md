---
title: "Type Alias: AssignUserToTenantData"
sidebar_label: "AssignUserToTenantData"
mdx:
  format: md
---

# Type Alias: AssignUserToTenantData

```ts
type AssignUserToTenantData = object;
```

Defined in: [gen/types.gen.ts:15688](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15688)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:15689](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15689)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15690](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15690)

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

Defined in: [gen/types.gen.ts:15700](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15700)

---

### url

```ts
url: "/tenants/{tenantId}/users/{username}";
```

Defined in: [gen/types.gen.ts:15701](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15701)
