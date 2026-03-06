---
title: "Type Alias: TenantCreateRequest"
sidebar_label: "TenantCreateRequest"
mdx:
  format: md
---

# Type Alias: TenantCreateRequest

```ts
type TenantCreateRequest = object;
```

Defined in: [gen/types.gen.ts:7186](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7186)

## Properties

### description?

```ts
optional description: string;
```

Defined in: [gen/types.gen.ts:7198](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7198)

The description of the tenant.

***

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:7194](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7194)

The name of the tenant.

***

### tenantId

```ts
tenantId: string;
```

Defined in: [gen/types.gen.ts:7190](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7190)

The unique ID for the tenant. Must be 255 characters or less. Can contain letters, numbers, [`_`, `-`, `+`, `.`, `@`].
