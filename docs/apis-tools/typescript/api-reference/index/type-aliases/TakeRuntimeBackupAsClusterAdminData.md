---
title: "Type Alias: TakeRuntimeBackupAsClusterAdminData"
sidebar_label: "TakeRuntimeBackupAsClusterAdminData"
mdx:
  format: md
---

# Type Alias: TakeRuntimeBackupAsClusterAdminData

```ts
type TakeRuntimeBackupAsClusterAdminData = object;
```

## Properties

### body?

```ts
body?: TakeRuntimeBackupRequest;
```

---

### path?

```ts
path?: never;
```

---

### query?

```ts
query?: object;
```

#### physicalTenantId?

```ts
physicalTenantId?: string;
```

The physical tenant to apply the change to. When omitted, or when passed with an empty value, the change is applied to every physical tenant of the cluster.

---

### url

```ts
url: "/cluster/v2/backups/runtime";
```
