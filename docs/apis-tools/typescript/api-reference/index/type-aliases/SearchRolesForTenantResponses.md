---
title: "Type Alias: SearchRolesForTenantResponses"
sidebar_label: "SearchRolesForTenantResponses"
mdx:
  format: md
---

# Type Alias: SearchRolesForTenantResponses

```ts
type SearchRolesForTenantResponses = object;
```

Defined in: [gen/types.gen.ts:15428](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15428)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:15432](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15432)

The search result of roles for the tenant.

#### Type Declaration

##### items

```ts
items: RoleResult[];
```

The matching roles.
