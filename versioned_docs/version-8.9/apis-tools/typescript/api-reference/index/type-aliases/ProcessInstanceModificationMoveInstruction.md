---
title: "Type Alias: ProcessInstanceModificationMoveInstruction"
sidebar_label: "ProcessInstanceModificationMoveInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationMoveInstruction

```ts
type ProcessInstanceModificationMoveInstruction = object;
```

Instruction describing a move operation. This instruction will terminate active element
instances based on the sourceElementInstruction and activate a new element instance for each terminated
one at targetElementId. Note that, for multi-instance activities, only the multi-instance
body instances will activate new element instances at the target id.

## Properties

### ancestorScopeInstruction?

```ts
optional ancestorScopeInstruction?: AncestorScopeInstruction;
```

---

### sourceElementInstruction

```ts
sourceElementInstruction: SourceElementInstruction;
```

---

### targetElementId

```ts
targetElementId: ElementId;
```

The target element id.

---

### variableInstructions?

```ts
optional variableInstructions?: ModifyProcessInstanceVariableInstruction[];
```

Instructions describing which variables to create or update.
