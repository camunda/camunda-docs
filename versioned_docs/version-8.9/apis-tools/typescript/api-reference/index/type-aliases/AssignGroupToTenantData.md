---
title: "Type Alias: AssignGroupToTenantData"
sidebar_label: "AssignGroupToTenantData"
mdx:
  format: md
---

# Type Alias: AssignGroupToTenantData

```ts
type AssignGroupToTenantData = object;
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
