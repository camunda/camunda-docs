---
title: "Type Alias: TenantCreateRequest"
sidebar_label: "TenantCreateRequest"
mdx:
  format: md
---

# Type Alias: TenantCreateRequest

```ts
type TenantCreateRequest = object;
```

## Properties

### description?

```ts
optional description?: string;
```

The description of the tenant.

---

### name

```ts
name: string;
```

The name of the tenant.

---

### tenantId

```ts
tenantId: string;
```

The unique ID for the tenant. Must be 255 characters or less. Can contain letters, numbers, [`_`, `-`, `+`, `.`, `@`].
