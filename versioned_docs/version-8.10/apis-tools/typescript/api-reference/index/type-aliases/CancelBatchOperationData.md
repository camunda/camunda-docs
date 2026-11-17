---
title: "Type Alias: CancelBatchOperationData"
sidebar_label: "CancelBatchOperationData"
mdx:
  format: md
---

# Type Alias: CancelBatchOperationData

```ts
type CancelBatchOperationData = object;
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
url: "/batch-operations/{batchOperationKey}/cancellation";
```
