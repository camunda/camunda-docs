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

Defined in: [gen/types.gen.ts:15248](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15248)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:15252](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15252)

The search result of roles for the tenant.

#### Type Declaration

##### items

```ts
items: RoleResult[];
```

The matching roles.
