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

Defined in: [gen/types.gen.ts:6851](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6851)

Instruction describing which elements to terminate. The element instances are determined
at runtime by the given id.

## Properties

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6855](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6855)

The id of the elements to terminate. The element instances are determined at runtime.
