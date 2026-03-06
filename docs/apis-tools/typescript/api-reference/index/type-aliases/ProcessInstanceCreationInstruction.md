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

Defined in: [gen/types.gen.ts:5985](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5985)

Instructions for creating a process instance. The process definition can be specified
either by id or by key.
