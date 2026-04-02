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

Defined in: [gen/types.gen.ts:566](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L566)

## Properties

### ownerId

```ts
ownerId: string;
```

Defined in: [gen/types.gen.ts:570](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L570)

The ID of the owner of the permissions.

---

### ownerType

```ts
ownerType: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:571](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L571)

---

### permissionTypes

```ts
permissionTypes: PermissionTypeEnum[];
```

Defined in: [gen/types.gen.ts:583](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L583)

The permission types to add.

---

### resourcePropertyName

```ts
resourcePropertyName: string;
```

Defined in: [gen/types.gen.ts:575](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L575)

The name of the resource property on which this authorization is based.

---

### resourceType

```ts
resourceType: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:579](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L579)

The type of resource to add permissions to.
