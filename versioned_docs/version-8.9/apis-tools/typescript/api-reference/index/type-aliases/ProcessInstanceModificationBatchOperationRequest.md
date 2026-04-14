---
title: "Type Alias: ProcessInstanceModificationBatchOperationRequest"
sidebar_label: "ProcessInstanceModificationBatchOperationRequest"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationBatchOperationRequest

```ts
type ProcessInstanceModificationBatchOperationRequest = object;
```

The process instance filter to define on which process instances tokens should be moved,
and new element instances should be activated or terminated.

## Properties

### filter

```ts
filter: ProcessInstanceFilter;
```

The process instance filter.

---

### moveInstructions

```ts
moveInstructions: ProcessInstanceModificationMoveBatchOperationInstruction[];
```

Instructions for moving tokens between elements.

---

### operationReference?

```ts
optional operationReference?: OperationReference;
```
