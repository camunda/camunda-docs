---
title: "Type Alias: GetTenantClusterVariableData"
sidebar_label: "GetTenantClusterVariableData"
mdx:
  format: md
---

# Type Alias: GetTenantClusterVariableData

```ts
type GetTenantClusterVariableData = object;
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

#### name

```ts
name: string;
```

The name of the cluster variable

#### tenantId

```ts
tenantId: TenantId;
```

The tenant ID

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```
