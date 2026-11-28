---
title: "Type Alias: AssignRoleToTenantData"
sidebar_label: "AssignRoleToTenantData"
mdx:
  format: md
---

# Type Alias: AssignRoleToTenantData

```ts
type AssignRoleToTenantData = object;
```

## Properties

### body?

```ts
body?: never;
```

---

### path

```ts
path: object;
```

#### roleId

```ts
roleId: RoleId;
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
query?: never;
```

---

### url

```ts
url: "/tenants/{tenantId}/roles/{roleId}";
```
