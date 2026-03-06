---
title: "Type Alias: AssignRoleToTenantData"
sidebar_label: "AssignRoleToTenantData"
mdx:
  format: md
---

# Type Alias: AssignRoleToTenantData

```ts
type AssignRoleToTenantData = object;
```

Defined in: [gen/types.gen.ts:15313](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15313)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15314](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15314)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15315](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15315)

#### roleId

```ts
roleId: string;
```

The unique identifier of the role.

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

Defined in: [gen/types.gen.ts:15325](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15325)

***

### url

```ts
url: "/tenants/{tenantId}/roles/{roleId}";
```

Defined in: [gen/types.gen.ts:15326](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15326)
