---
title: "Type Alias: ListRuntimeBackupsAsClusterAdminData"
sidebar_label: "ListRuntimeBackupsAsClusterAdminData"
mdx:
  format: md
---

# Type Alias: ListRuntimeBackupsAsClusterAdminData

```ts
type ListRuntimeBackupsAsClusterAdminData = object;
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

#### prefix?

```ts
optional prefix?: BackupIdPrefix;
```

A prefix that backup ids must match, ending in a single '*'. If omitted, all
backups are returned.

---

### url

```ts
url: "/cluster/v2/backups/runtime";
```
