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

## Properties

### ownerId

```ts
ownerId: string;
```

The ID of the owner of the permissions.

---

### ownerType

```ts
ownerType: OwnerTypeEnum;
```

---

### permissionTypes

```ts
permissionTypes: PermissionTypeEnum[];
```

The permission types to add.

---

### resourceId

```ts
resourceId: string;
```

The ID of the resource to add permissions to.

---

### resourceType

```ts
resourceType: ResourceTypeEnum;
```

The type of resource to add permissions to.
