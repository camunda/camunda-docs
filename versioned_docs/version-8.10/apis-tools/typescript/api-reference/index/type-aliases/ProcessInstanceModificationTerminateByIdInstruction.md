---
title: "Type Alias: ProcessInstanceModificationTerminateByIdInstruction"
sidebar_label: "ProcessInstanceModificationTerminateByIdInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationTerminateByIdInstruction

```ts
type ProcessInstanceModificationTerminateByIdInstruction = object;
```

Instruction describing which elements to terminate. The element instances are determined
at runtime by the given id.

## Properties

### elementId

```ts
elementId: ElementId;
```

The id of the elements to terminate. The element instances are determined at runtime.
