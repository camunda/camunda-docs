---
title: "Type Alias: ListHistoryBackupsAsClusterAdminData"
sidebar_label: "ListHistoryBackupsAsClusterAdminData"
mdx:
  format: md
---

# Type Alias: ListHistoryBackupsAsClusterAdminData

```ts
type ListHistoryBackupsAsClusterAdminData = object;
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

#### verbose?

```ts
optional verbose?: boolean;
```

Whether to ask the secondary storage for snapshot-level detail. Setting this to
`false` makes the query cheaper, but the store then reports neither snapshot state
nor start time, so both the per-snapshot `details` and the per-tenant `state` are
incomplete and the listing order is unspecified.

---

### url

```ts
url: "/cluster/v2/backups/history";
```
