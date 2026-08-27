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

#### prefix?

```ts
optional prefix?: BackupIdPrefix;
```

A prefix that backup ids must match, ending in a single '*'. If omitted, all
backups are returned.

---

### url

```ts
url: "/backups/runtime";
```
