---
title: "Type Alias: BatchOperationItemResponse"
sidebar_label: "BatchOperationItemResponse"
mdx:
  format: md
---

# Type Alias: BatchOperationItemResponse

```ts
type BatchOperationItemResponse = object;
```

## Properties

### batchOperationKey

```ts
batchOperationKey: BatchOperationKey;
```

The key (or operate legacy ID) of the batch operation.

---

### errorMessage

```ts
errorMessage: string | null;
```

The error message from the engine in case of a failed operation.

---

### itemKey

```ts
itemKey: string;
```

Key of the item, e.g. a process instance key.

---

### operationType

```ts
operationType: BatchOperationTypeEnum;
```

---

### processedDate

```ts
processedDate: string | null;
```

The date this item was processed.
This is `null` if the item has not yet been processed.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

the process instance key of the processed item.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### state

```ts
state: "ACTIVE" | "COMPLETED" | "SKIPPED" | "CANCELED" | "FAILED";
```

State of the item.
