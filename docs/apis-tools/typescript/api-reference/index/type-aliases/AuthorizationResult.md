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

Defined in: [gen/types.gen.ts:635](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L635)

## Properties

### authorizationKey

```ts
authorizationKey: AuthorizationKey;
```

Defined in: [gen/types.gen.ts:660](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L660)

The key of the authorization.

---

### ownerId

```ts
ownerId: string;
```

Defined in: [gen/types.gen.ts:639](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L639)

The ID of the owner of permissions.

---

### ownerType

```ts
ownerType: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:640](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L640)

---

### permissionTypes

```ts
permissionTypes: PermissionTypeEnum[];
```

Defined in: [gen/types.gen.ts:656](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L656)

Specifies the types of the permissions.

---

### resourceId

```ts
resourceId: string | null;
```

Defined in: [gen/types.gen.ts:648](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L648)

ID of the resource the permission relates to (mutually exclusive with `resourcePropertyName`).

---

### resourcePropertyName

```ts
resourcePropertyName: string | null;
```

Defined in: [gen/types.gen.ts:652](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L652)

The name of the resource property the permission relates to (mutually exclusive with `resourceId`).

---

### resourceType

```ts
resourceType: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:644](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L644)

The type of resource that the permissions relate to.
