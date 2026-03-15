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

Defined in: [gen/types.gen.ts:6056](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6056)

Instructions for creating a process instance. The process definition can be specified
either by id or by key.
