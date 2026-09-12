---
title: "Type Alias: RestoreRequest"
sidebar_label: "RestoreRequest"
mdx:
  format: md
---

# Type Alias: RestoreRequest

```ts
type RestoreRequest = object;
```

Describes a restore request. Provide either a list of backup IDs or a time range (`from`/`to`) that selects the backups to restore; the two are mutually exclusive.

## Properties

### backupIds?

```ts
optional backupIds?: number[] | null;
```

The IDs of the backups to restore from, one per partition.

---

### from?

```ts
optional from?: string | null;
```

The start of the time range to restore from, as an ISO 8601 timestamp.

---

### to?

```ts
optional to?: string | null;
```

The end of the time range to restore from, as an ISO 8601 timestamp.
