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
  | ProcessInstanceCreationInstructionById
  | ProcessInstanceCreationInstructionByVersionTag;
```

Instructions for creating a process instance. The process definition can be specified
either by id, by id and version tag, or by key.
