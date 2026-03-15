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

Defined in: [gen/types.gen.ts:15442](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15442)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15443](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15443)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15444](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15444)

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

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:15454](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15454)

***

### url

```ts
url: "/tenants/{tenantId}/roles/{roleId}";
```

Defined in: [gen/types.gen.ts:15455](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15455)
