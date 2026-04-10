---
title: "Type Alias: SearchGroupIdsForTenantData"
sidebar_label: "SearchGroupIdsForTenantData"
mdx:
  format: md
---

# Type Alias: SearchGroupIdsForTenantData

```ts
type SearchGroupIdsForTenantData = object;
```

## Properties

### body?

```ts
optional body?: TenantGroupSearchQueryRequest;
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
url: "/tenants/{tenantId}/groups/search";
```
