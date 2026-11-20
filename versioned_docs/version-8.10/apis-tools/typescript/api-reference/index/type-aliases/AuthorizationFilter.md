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

Authorization search filter.

## Properties

### ownerId?

```ts
optional ownerId?: string;
```

The ID of the owner of permissions.

---

### ownerType?

```ts
optional ownerType?: OwnerTypeEnum;
```

---

### resourceIds?

```ts
optional resourceIds?: string[];
```

The IDs of the resource to search permissions for.

---

### resourcePropertyNames?

```ts
optional resourcePropertyNames?: string[];
```

The names of the resource properties to search permissions for.

---

### resourceType?

```ts
optional resourceType?: ResourceTypeEnum;
```

The type of resource to search permissions for.
