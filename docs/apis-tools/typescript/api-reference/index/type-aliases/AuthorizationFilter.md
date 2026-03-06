---
title: "Type Alias: AuthorizationFilter"
sidebar_label: "AuthorizationFilter"
mdx:
  format: md
---

# Type Alias: AuthorizationFilter

```ts
type AuthorizationFilter = object;
```

Defined in: [gen/types.gen.ts:619](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L619)

Authorization search filter.

## Properties

### ownerId?

```ts
optional ownerId: string;
```

Defined in: [gen/types.gen.ts:623](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L623)

The ID of the owner of permissions.

***

### ownerType?

```ts
optional ownerType: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:624](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L624)

***

### resourceIds?

```ts
optional resourceIds: string[];
```

Defined in: [gen/types.gen.ts:628](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L628)

The IDs of the resource to search permissions for.

***

### resourcePropertyNames?

```ts
optional resourcePropertyNames: string[];
```

Defined in: [gen/types.gen.ts:632](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L632)

The names of the resource properties to search permissions for.

***

### resourceType?

```ts
optional resourceType: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:636](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L636)

The type of resource to search permissions for.
