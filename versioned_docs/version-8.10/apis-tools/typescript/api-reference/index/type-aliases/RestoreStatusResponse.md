---
title: "Type Alias: RestoreStatusResponse"
sidebar_label: "RestoreStatusResponse"
mdx:
  format: md
---

# Type Alias: RestoreStatusResponse

```ts
type RestoreStatusResponse = object;
```

The status of the restore that is currently in progress.

## Properties

### brokers

```ts
brokers: RestoreBrokerStatus[];
```

The per-broker restore status.

---

### changeId

```ts
changeId: string;
```

The ID of the cluster change that performs the restore.

---

### startedAt

```ts
startedAt: string | null;
```

The time the restore started, as an ISO 8601 timestamp.

---

### status

```ts
status: "IN_PROGRESS" | "COMPLETED" | "FAILED" | "CANCELLED";
```

The overall status of the restore.
