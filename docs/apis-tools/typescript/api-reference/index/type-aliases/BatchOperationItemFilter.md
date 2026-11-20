---
title: "Type Alias: BatchOperationItemFilter"
sidebar_label: "BatchOperationItemFilter"
mdx:
  format: md
---

# Type Alias: BatchOperationItemFilter

```ts
type BatchOperationItemFilter = object;
```

Batch operation item filter request.

## Properties

### batchOperationKey?

```ts
batchOperationKey?: BasicStringFilterProperty;
```

The key (or operate legacy ID) of the batch operation.

---

### itemKey?

```ts
itemKey?: BasicStringFilterProperty;
```

The key of the item, e.g. a process instance key.

---

### operationType?

```ts
operationType?: BatchOperationTypeFilterProperty;
```

The type of the batch operation.

---

### processInstanceKey?

```ts
processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The process instance key of the processed item.

---

### state?

```ts
state?: BatchOperationItemStateFilterProperty;
```

The state of the batch operation.
