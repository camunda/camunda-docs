---
title: "Type Alias: ProcessInstanceModificationMoveBatchOperationInstruction"
sidebar_label: "ProcessInstanceModificationMoveBatchOperationInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationMoveBatchOperationInstruction

```ts
type ProcessInstanceModificationMoveBatchOperationInstruction = object;
```

Instructions describing a move operation. This instruction will terminate all active
element instances at `sourceElementId` and activate a new element instance for each
terminated one at `targetElementId`. The new element instances are created in the parent
scope of the source element instances.

## Properties

### sourceElementId

```ts
sourceElementId: ElementId;
```

The source element ID.

---

### targetElementId

```ts
targetElementId: ElementId;
```

The target element ID.
