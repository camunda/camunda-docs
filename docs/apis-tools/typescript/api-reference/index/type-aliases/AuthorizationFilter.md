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

Defined in: [gen/types.gen.ts:615](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L615)

Authorization search filter.

## Properties

### ownerId?

```ts
optional ownerId?: string;
```

Defined in: [gen/types.gen.ts:619](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L619)

The ID of the owner of permissions.

---

### ownerType?

```ts
optional ownerType?: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:620](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L620)

---

### resourceIds?

```ts
optional resourceIds?: string[];
```

Defined in: [gen/types.gen.ts:624](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L624)

The IDs of the resource to search permissions for.

---

### resourcePropertyNames?

```ts
optional resourcePropertyNames?: string[];
```

Defined in: [gen/types.gen.ts:628](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L628)

The names of the resource properties to search permissions for.

---

### resourceType?

```ts
optional resourceType?: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:632](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L632)

The type of resource to search permissions for.
