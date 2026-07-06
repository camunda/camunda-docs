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
tenantId: TenantId;
```

The unique ID for the tenant. Must be 31 characters or less and match
`^[\w.-]{1,31}$` (word characters, `.`, `-`). The literal
`<default>` is also accepted as the default-tenant alias.
