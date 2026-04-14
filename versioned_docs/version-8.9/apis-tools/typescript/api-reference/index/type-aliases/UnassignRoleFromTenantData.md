---
title: "Type Alias: UnassignRoleFromTenantData"
sidebar_label: "UnassignRoleFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignRoleFromTenantData

```ts
type UnassignRoleFromTenantData = object;
```

## Properties

### body?

```ts
optional body?: never;
```

---

### path

```ts
path: object;
```

#### roleId

```ts
roleId: string;
```

The unique identifier of the role.

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
url: "/tenants/{tenantId}/roles/{roleId}";
```
