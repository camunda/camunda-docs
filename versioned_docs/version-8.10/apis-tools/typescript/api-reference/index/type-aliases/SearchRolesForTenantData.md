---
title: "Type Alias: SearchRolesForTenantData"
sidebar_label: "SearchRolesForTenantData"
mdx:
  format: md
---

# Type Alias: SearchRolesForTenantData

```ts
type SearchRolesForTenantData = object;
```

## Properties

### body?

```ts
optional body?: RoleSearchQueryRequest;
```

---

### path

```ts
path: object;
```

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/tenants/{tenantId}/roles/search";
```
