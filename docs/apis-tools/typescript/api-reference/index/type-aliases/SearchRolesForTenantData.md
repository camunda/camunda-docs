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

Defined in: [gen/types.gen.ts:15416](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15416)

## Properties

### body?

```ts
optional body: RoleSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:15417](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15417)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15418](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15418)

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

Defined in: [gen/types.gen.ts:15424](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15424)

***

### url

```ts
url: "/tenants/{tenantId}/roles/search";
```

Defined in: [gen/types.gen.ts:15425](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15425)
