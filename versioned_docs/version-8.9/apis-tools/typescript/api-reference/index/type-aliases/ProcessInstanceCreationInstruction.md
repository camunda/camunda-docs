---
title: "Type Alias: ProcessInstanceCreationInstruction"
sidebar_label: "ProcessInstanceCreationInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationInstruction

```ts
type ProcessInstanceCreationInstruction =
  | ProcessInstanceCreationInstructionByKey
  | ProcessInstanceCreationInstructionById;
```

Instructions for creating a process instance. The process definition can be specified
either by id or by key.
