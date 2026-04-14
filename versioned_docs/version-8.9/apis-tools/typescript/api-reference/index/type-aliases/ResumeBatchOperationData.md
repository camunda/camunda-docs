---
title: "Type Alias: ResumeBatchOperationData"
sidebar_label: "ResumeBatchOperationData"
mdx:
  format: md
---

# Type Alias: ResumeBatchOperationData

```ts
type ResumeBatchOperationData = object;
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
url: "/batch-operations/{batchOperationKey}/resumption";
```
