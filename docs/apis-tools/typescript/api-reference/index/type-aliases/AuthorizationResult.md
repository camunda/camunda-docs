---
title: "Type Alias: AuthorizationResult"
sidebar_label: "AuthorizationResult"
mdx:
  format: md
---

# Type Alias: AuthorizationResult

```ts
type AuthorizationResult = object;
```

Defined in: [gen/types.gen.ts:639](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L639)

## Properties

### authorizationKey?

```ts
optional authorizationKey: AuthorizationKey;
```

Defined in: [gen/types.gen.ts:664](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L664)

The key of the authorization.

***

### ownerId?

```ts
optional ownerId: string;
```

Defined in: [gen/types.gen.ts:643](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L643)

The ID of the owner of permissions.

***

### ownerType?

```ts
optional ownerType: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:644](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L644)

***

### permissionTypes

```ts
permissionTypes: PermissionTypeEnum[];
```

Defined in: [gen/types.gen.ts:660](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L660)

Specifies the types of the permissions.

***

### resourceId?

```ts
optional resourceId: string | null;
```

Defined in: [gen/types.gen.ts:652](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L652)

ID of the resource the permission relates to (mutually exclusive with `resourcePropertyName`).

***

### resourcePropertyName

```ts
resourcePropertyName: string | null;
```

Defined in: [gen/types.gen.ts:656](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L656)

The name of the resource property the permission relates to (mutually exclusive with `resourceId`).

***

### resourceType?

```ts
optional resourceType: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:648](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L648)

The type of resource that the permissions relate to.
