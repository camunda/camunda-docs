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

Defined in: [gen/types.gen.ts:6840](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6840)

Instruction describing which elements to terminate. The element instances are determined
at runtime by the given id.

## Properties

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6844](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6844)

The id of the elements to terminate. The element instances are determined at runtime.
