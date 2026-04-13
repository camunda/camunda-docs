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
optional batchOperationKey?: BasicStringFilterProperty;
```

The key (or operate legacy ID) of the batch operation.

---

### itemKey?

```ts
optional itemKey?: BasicStringFilterProperty;
```

The key of the item, e.g. a process instance key.

---

### operationType?

```ts
optional operationType?: BatchOperationTypeFilterProperty;
```

The type of the batch operation.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The process instance key of the processed item.

---

### state?

```ts
optional state?: BatchOperationItemStateFilterProperty;
```

The state of the batch operation.
