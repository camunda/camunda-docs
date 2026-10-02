---
title: "Type Alias: ListHistoryBackupsData"
sidebar_label: "ListHistoryBackupsData"
mdx:
  format: md
---

# Type Alias: ListHistoryBackupsData

```ts
type ListHistoryBackupsData = object;
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

A prefix that backup ids must match, ending in a single '\*'. If omitted, all
backups are returned.

#### verbose?

```ts
optional verbose?: boolean;
```

Whether to ask the secondary storage for snapshot-level detail. Setting this to
`false` makes the query cheaper, but the store then reports neither snapshot state
nor start time, so both the per-snapshot `details` and the aggregated `state` are
incomplete and the listing order is unspecified.

---

### url

```ts
url: "/backups/history";
```
