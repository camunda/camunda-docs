---
title: "Type Alias: UnassignGroupFromTenantData"
sidebar_label: "UnassignGroupFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignGroupFromTenantData

```ts
type UnassignGroupFromTenantData = object;
```

Defined in: [gen/types.gen.ts:15006](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15006)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15007](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15007)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15008](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15008)

#### groupId

```ts
groupId: string;
```

The unique identifier of the group.

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

Defined in: [gen/types.gen.ts:15018](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15018)

***

### url

```ts
url: "/tenants/{tenantId}/groups/{groupId}";
```

Defined in: [gen/types.gen.ts:15019](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15019)
