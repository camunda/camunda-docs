---
title: "Type Alias: ProcessInstanceModificationTerminateByIdInstruction"
sidebar_label: "ProcessInstanceModificationTerminateByIdInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationTerminateByIdInstruction

```ts
type ProcessInstanceModificationTerminateByIdInstruction = object;
```

Defined in: [gen/types.gen.ts:6765](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6765)

Instruction describing which elements to terminate. The element instances are determined
at runtime by the given id.

## Properties

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6769](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6769)

The id of the elements to terminate. The element instances are determined at runtime.
