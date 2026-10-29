---
title: "Type Alias: UnassignUserFromTenantData"
sidebar_label: "UnassignUserFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignUserFromTenantData

```ts
type UnassignUserFromTenantData = object;
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
query?: never;
```

---

### url

```ts
url: "/tenants/{tenantId}/users/{username}";
```
