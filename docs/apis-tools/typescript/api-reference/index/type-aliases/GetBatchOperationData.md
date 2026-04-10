---
title: "Type Alias: GetBatchOperationData"
sidebar_label: "GetBatchOperationData"
mdx:
  format: md
---

# Type Alias: GetBatchOperationData

```ts
type GetBatchOperationData = object;
```

## Properties

### body?

```ts
optional body?: never;
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
url: "/batch-operations/{batchOperationKey}";
```
