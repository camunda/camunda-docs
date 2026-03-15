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

Defined in: [gen/types.gen.ts:7300](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7300)

## Properties

### description?

```ts
optional description: string;
```

Defined in: [gen/types.gen.ts:7312](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7312)

The description of the tenant.

***

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:7308](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7308)

The name of the tenant.

***

### tenantId

```ts
tenantId: string;
```

Defined in: [gen/types.gen.ts:7304](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7304)

The unique ID for the tenant. Must be 255 characters or less. Can contain letters, numbers, [`_`, `-`, `+`, `.`, `@`].
