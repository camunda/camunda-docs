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

## Properties

### authorizationKey

```ts
authorizationKey: AuthorizationKey;
```

The key of the authorization.

---

### ownerId

```ts
ownerId: string;
```

The ID of the owner of permissions.

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

Specifies the types of the permissions.

---

### resourceId

```ts
resourceId: string | null;
```

ID of the resource the permission relates to (mutually exclusive with `resourcePropertyName`).

---

### resourcePropertyName

```ts
resourcePropertyName: string | null;
```

The name of the resource property the permission relates to (mutually exclusive with `resourceId`).

---

### resourceType

```ts
resourceType: ResourceTypeEnum;
```

The type of resource that the permissions relate to.
