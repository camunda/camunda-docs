---
title: "Type Alias: TakeHistoryBackupAsClusterAdminData"
sidebar_label: "TakeHistoryBackupAsClusterAdminData"
mdx:
  format: md
---

# Type Alias: TakeHistoryBackupAsClusterAdminData

```ts
type TakeHistoryBackupAsClusterAdminData = object;
```

## Properties

### body

```ts
body: TakeHistoryBackupRequest;
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
url: "/cluster/v2/backups/history";
```
