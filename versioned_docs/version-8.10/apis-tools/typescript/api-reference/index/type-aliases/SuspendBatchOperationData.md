---
title: "Type Alias: SuspendBatchOperationData"
sidebar_label: "SuspendBatchOperationData"
mdx:
  format: md
---

# Type Alias: SuspendBatchOperationData

```ts
type SuspendBatchOperationData = object;
```

## Properties

### body?

```ts
optional body?: unknown;
```

---

### path

```ts
path: object;
```

#### batchOperationKey

```ts
batchOperationKey: BatchOperationKey;
```

The key (or operate legacy ID) of the batch operation.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/batch-operations/{batchOperationKey}/suspension";
```
