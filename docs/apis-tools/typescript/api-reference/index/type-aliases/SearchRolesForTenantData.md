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

Defined in: [gen/types.gen.ts:15236](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15236)

## Properties

### body?

```ts
optional body: RoleSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:15237](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15237)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15238](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15238)

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

Defined in: [gen/types.gen.ts:15244](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15244)

***

### url

```ts
url: "/tenants/{tenantId}/roles/search";
```

Defined in: [gen/types.gen.ts:15245](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15245)
