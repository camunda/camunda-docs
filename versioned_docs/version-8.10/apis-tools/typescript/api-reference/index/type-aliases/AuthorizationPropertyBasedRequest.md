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

### resourcePropertyName

```ts
resourcePropertyName: string;
```

The name of the resource property on which this authorization is based.

---

### resourceType

```ts
resourceType: ResourceTypeEnum;
```

The type of resource to add permissions to.
