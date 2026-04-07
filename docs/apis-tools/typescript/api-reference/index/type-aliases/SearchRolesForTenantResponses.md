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

Defined in: [gen/types.gen.ts:15482](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15482)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:15486](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15486)

The search result of roles for the tenant.

#### Type Declaration

##### items

```ts
items: RoleResult[];
```

The matching roles.
