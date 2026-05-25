---
title: "Type Alias: SearchUsersForTenantData"
sidebar_label: "SearchUsersForTenantData"
mdx:
  format: md
---

# Type Alias: SearchUsersForTenantData

```ts
type SearchUsersForTenantData = object;
```

## Properties

### body?

```ts
optional body?: SearchQueryRequest & object;
```

#### Type Declaration

##### sort?

```ts
optional sort?: object[];
```

Sort field criteria.

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
url: "/tenants/{tenantId}/users/search";
```
