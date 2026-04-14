---
title: "Type Alias: UnassignClientFromTenantData"
sidebar_label: "UnassignClientFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignClientFromTenantData

```ts
type UnassignClientFromTenantData = object;
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

#### clientId

```ts
clientId: string;
```

The unique identifier of the application.

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
url: "/tenants/{tenantId}/clients/{clientId}";
```
