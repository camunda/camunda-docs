---
title: "Type Alias: GetRuntimeBackupStateAsClusterAdminData"
sidebar_label: "GetRuntimeBackupStateAsClusterAdminData"
mdx:
  format: md
---

# Type Alias: GetRuntimeBackupStateAsClusterAdminData

```ts
type GetRuntimeBackupStateAsClusterAdminData = object;
```

## Properties

### body?

```ts
optional body?: never;
```

---

### path?

```ts
optional path?: never;
```

---

### query?

```ts
optional query?: object;
```

#### physicalTenantId?

```ts
optional physicalTenantId?: string;
```

The physical tenant to apply the change to. When omitted, or when passed with an empty value, the change is applied to every physical tenant of the cluster.

---

### url

```ts
url: "/cluster/v2/backups/runtime/state";
```
