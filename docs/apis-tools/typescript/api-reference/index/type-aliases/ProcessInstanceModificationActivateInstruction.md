---
title: "Type Alias: ProcessInstanceModificationActivateInstruction"
sidebar_label: "ProcessInstanceModificationActivateInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationActivateInstruction

```ts
type ProcessInstanceModificationActivateInstruction = object;
```

Instruction describing an element to activate.

## Properties

### ancestorElementInstanceKey?

```ts
optional ancestorElementInstanceKey?: ElementInstanceKey;
```

The key of the ancestor scope the element instance should be created in.
Set to -1 to create the new element instance within an existing element instance of the
flow scope. If multiple instances of the target element's flow scope exist, choose one
specifically with this property by providing its key.

---

### elementId

```ts
elementId: ElementId;
```

The id of the element to activate.

---

### variableInstructions?

```ts
optional variableInstructions?: ModifyProcessInstanceVariableInstruction[];
```

Instructions describing which variables to create or update.
