---
title: "Type Alias: ListRuntimeBackupsData"
sidebar_label: "ListRuntimeBackupsData"
mdx:
  format: md
---

# Type Alias: ListRuntimeBackupsData

```ts
type ListRuntimeBackupsData = object;
```

## Properties

### body?

```ts
body?: never;
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

#### prefix?

```ts
prefix?: BackupIdPrefix;
```

A prefix that backup ids must match, ending in a single '*'. If omitted, all
backups are returned.

---

### url

```ts
url: "/backups/runtime";
```
