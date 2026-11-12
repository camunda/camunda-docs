---
title: "Type Alias: SearchClientsForTenantData"
sidebar_label: "SearchClientsForTenantData"
mdx:
  format: md
---

# Type Alias: SearchClientsForTenantData

```ts
type SearchClientsForTenantData = object;
```

## Properties

### body?

```ts
body?: TenantClientSearchQueryRequest;
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
query?: never;
```

---

### url

```ts
url: "/tenants/{tenantId}/clients/search";
```
