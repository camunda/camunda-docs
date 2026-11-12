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
body?: never;
```

---

### path

```ts
path: object;
```

#### name

```ts
name: ClusterVariableName;
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
query?: never;
```

---

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```
