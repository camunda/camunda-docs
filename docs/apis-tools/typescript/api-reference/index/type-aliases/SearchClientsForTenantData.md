---
title: "Type Alias: SearchClientsForTenantData"
sidebar_label: "SearchClientsForTenantData"
mdx:
  format: md
---

# Type Alias: SearchClientsForTenantData

```ts
type SearchClientsForTenantData = object;
```

Defined in: [gen/types.gen.ts:14841](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14841)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:14842](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14842)

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

Defined in: [gen/types.gen.ts:14854](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14854)

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

Defined in: [gen/types.gen.ts:14860](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14860)

***

### url

```ts
url: "/tenants/{tenantId}/clients/search";
```

Defined in: [gen/types.gen.ts:14861](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14861)
