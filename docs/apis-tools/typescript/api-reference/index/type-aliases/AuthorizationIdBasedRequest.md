---
title: "Type Alias: AuthorizationIdBasedRequest"
sidebar_label: "AuthorizationIdBasedRequest"
mdx:
  format: md
---

# Type Alias: AuthorizationIdBasedRequest

```ts
type AuthorizationIdBasedRequest = object;
```

Defined in: [gen/types.gen.ts:550](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L550)

## Properties

### ownerId

```ts
ownerId: string;
```

Defined in: [gen/types.gen.ts:554](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L554)

The ID of the owner of the permissions.

***

### ownerType

```ts
ownerType: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:555](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L555)

***

### permissionTypes

```ts
permissionTypes: PermissionTypeEnum[];
```

Defined in: [gen/types.gen.ts:567](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L567)

The permission types to add.

***

### resourceId

```ts
resourceId: string;
```

Defined in: [gen/types.gen.ts:559](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L559)

The ID of the resource to add permissions to.

***

### resourceType

```ts
resourceType: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:563](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L563)

The type of resource to add permissions to.
