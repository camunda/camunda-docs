---
title: "Type Alias: UnassignClientFromTenantData"
sidebar_label: "UnassignClientFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignClientFromTenantData

```ts
type UnassignClientFromTenantData = object;
```

Defined in: [gen/types.gen.ts:14883](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14883)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:14884](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14884)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:14885](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14885)

#### clientId

```ts
clientId: string;
```

The unique identifier of the application.

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

Defined in: [gen/types.gen.ts:14895](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14895)

***

### url

```ts
url: "/tenants/{tenantId}/clients/{clientId}";
```

Defined in: [gen/types.gen.ts:14896](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14896)
