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

Defined in: [gen/types.gen.ts:6059](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6059)

Instructions for creating a process instance. The process definition can be specified
either by id or by key.
