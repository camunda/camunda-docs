---
title: "Type Alias: ProcessInstanceModificationInstruction"
sidebar_label: "ProcessInstanceModificationInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationInstruction

```ts
type ProcessInstanceModificationInstruction = object;
```

## Properties

### activateInstructions?

```ts
activateInstructions?: ProcessInstanceModificationActivateInstruction[];
```

Instructions describing which elements to activate in which scopes and which variables to create or update.

---

### moveInstructions?

```ts
moveInstructions?: ProcessInstanceModificationMoveInstruction[];
```

Instructions describing which elements to move from one scope to another.

---

### operationReference?

```ts
operationReference?: OperationReference;
```

---

### terminateInstructions?

```ts
terminateInstructions?: ProcessInstanceModificationTerminateInstruction[];
```

Instructions describing which elements to terminate.
