---
title: "Type Alias: UnassignGroupFromTenantData"
sidebar_label: "UnassignGroupFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignGroupFromTenantData

```ts
type UnassignGroupFromTenantData = object;
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

#### groupId

```ts
groupId: string;
```

The unique identifier of the group.

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
url: "/tenants/{tenantId}/groups/{groupId}";
```
