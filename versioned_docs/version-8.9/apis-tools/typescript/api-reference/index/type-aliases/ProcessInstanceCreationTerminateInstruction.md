---
title: "Type Alias: ProcessInstanceCreationTerminateInstruction"
sidebar_label: "ProcessInstanceCreationTerminateInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationTerminateInstruction

```ts
type ProcessInstanceCreationTerminateInstruction = object;
```

Terminates the process instance after a specific BPMN element is completed or terminated.

## Properties

### afterElementId

```ts
afterElementId: ElementId;
```

The id of the element that, once completed or terminated, will cause the process to be terminated.

---

### type?

```ts
optional type?: string;
```

The type of the runtime instruction
