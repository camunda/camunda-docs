---
title: "Type Alias: AssignClientToTenantData"
sidebar_label: "AssignClientToTenantData"
mdx:
  format: md
---

# Type Alias: AssignClientToTenantData

```ts
type AssignClientToTenantData = object;
```

Defined in: [gen/types.gen.ts:14934](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14934)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:14935](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14935)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:14936](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14936)

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

Defined in: [gen/types.gen.ts:14946](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14946)

***

### url

```ts
url: "/tenants/{tenantId}/clients/{clientId}";
```

Defined in: [gen/types.gen.ts:14947](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14947)
