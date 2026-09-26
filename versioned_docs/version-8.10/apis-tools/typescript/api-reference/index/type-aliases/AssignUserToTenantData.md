---
title: "Type Alias: AssignUserToTenantData"
sidebar_label: "AssignUserToTenantData"
mdx:
  format: md
---

# Type Alias: AssignUserToTenantData

```ts
type AssignUserToTenantData = object;
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

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

#### username

```ts
username: Username;
```

The unique identifier of the user.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/tenants/{tenantId}/users/{username}";
```
