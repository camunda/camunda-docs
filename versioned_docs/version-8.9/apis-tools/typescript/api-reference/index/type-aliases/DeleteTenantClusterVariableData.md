---
title: "Type Alias: DeleteTenantClusterVariableData"
sidebar_label: "DeleteTenantClusterVariableData"
mdx:
  format: md
---

# Type Alias: DeleteTenantClusterVariableData

```ts
type DeleteTenantClusterVariableData = object;
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
