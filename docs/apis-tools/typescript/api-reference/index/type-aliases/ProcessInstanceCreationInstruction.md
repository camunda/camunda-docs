---
title: "Type Alias: ProcessInstanceCreationInstruction"
sidebar_label: "ProcessInstanceCreationInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationInstruction

```ts
type ProcessInstanceCreationInstruction =
  | ProcessInstanceCreationInstructionById
  | ProcessInstanceCreationInstructionByKey;
```

Defined in: [gen/types.gen.ts:5397](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5397)

Instructions for creating a process instance. The process definition can be specified
either by id or by key.
