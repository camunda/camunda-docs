---
title: "Type Alias: AuthorizationPropertyBasedRequest"
sidebar_label: "AuthorizationPropertyBasedRequest"
mdx:
  format: md
---

# Type Alias: AuthorizationPropertyBasedRequest

```ts
type AuthorizationPropertyBasedRequest = object;
```

Defined in: [gen/types.gen.ts:570](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L570)

## Properties

### ownerId

```ts
ownerId: string;
```

Defined in: [gen/types.gen.ts:574](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L574)

The ID of the owner of the permissions.

***

### ownerType

```ts
ownerType: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:575](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L575)

***

### permissionTypes

```ts
permissionTypes: PermissionTypeEnum[];
```

Defined in: [gen/types.gen.ts:587](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L587)

The permission types to add.

***

### resourcePropertyName

```ts
resourcePropertyName: string;
```

Defined in: [gen/types.gen.ts:579](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L579)

The name of the resource property on which this authorization is based.

***

### resourceType

```ts
resourceType: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:583](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L583)

The type of resource to add permissions to.
