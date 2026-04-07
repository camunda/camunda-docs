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

Defined in: [gen/types.gen.ts:546](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L546)

## Properties

### ownerId

```ts
ownerId: string;
```

Defined in: [gen/types.gen.ts:550](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L550)

The ID of the owner of the permissions.

---

### ownerType

```ts
ownerType: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:551](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L551)

---

### permissionTypes

```ts
permissionTypes: PermissionTypeEnum[];
```

Defined in: [gen/types.gen.ts:563](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L563)

The permission types to add.

---

### resourceId

```ts
resourceId: string;
```

Defined in: [gen/types.gen.ts:555](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L555)

The ID of the resource to add permissions to.

---

### resourceType

```ts
resourceType: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:559](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L559)

The type of resource to add permissions to.
