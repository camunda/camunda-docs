---
title: "Type Alias: BatchOperationError"
sidebar_label: "BatchOperationError"
mdx:
  format: md
---

# Type Alias: BatchOperationError

```ts
type BatchOperationError = object;
```

## Properties

### message

```ts
message: string;
```

The error message that occurred during the batch operation.

---

### partitionId

```ts
partitionId: number;
```

The partition ID where the error occurred.

---

### type

```ts
type: "QUERY_FAILED" | "RESULT_BUFFER_SIZE_EXCEEDED";
```

The type of the error that occurred during the batch operation.
