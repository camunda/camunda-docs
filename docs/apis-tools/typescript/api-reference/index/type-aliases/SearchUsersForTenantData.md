---
title: "Type Alias: SearchUsersForTenantData"
sidebar_label: "SearchUsersForTenantData"
mdx:
  format: md
---

# Type Alias: SearchUsersForTenantData

```ts
type SearchUsersForTenantData = object;
```

Defined in: [gen/types.gen.ts:15364](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15364)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:15365](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15365)

#### Type Declaration

##### sort?

```ts
optional sort: object[];
```

Sort field criteria.

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15377](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15377)

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

Defined in: [gen/types.gen.ts:15383](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15383)

***

### url

```ts
url: "/tenants/{tenantId}/users/search";
```

Defined in: [gen/types.gen.ts:15384](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15384)
