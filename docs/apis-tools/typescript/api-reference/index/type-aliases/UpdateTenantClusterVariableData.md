---
title: "Type Alias: UpdateTenantClusterVariableData"
sidebar_label: "UpdateTenantClusterVariableData"
mdx:
  format: md
---

# Type Alias: UpdateTenantClusterVariableData

```ts
type UpdateTenantClusterVariableData = object;
```

## Properties

### body

```ts
body: UpdateClusterVariableRequest;
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
