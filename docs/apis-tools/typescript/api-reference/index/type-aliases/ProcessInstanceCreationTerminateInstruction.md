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

Defined in: [gen/types.gen.ts:6223](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6223)

Terminates the process instance after a specific BPMN element is completed or terminated.

## Properties

### afterElementId

```ts
afterElementId: ElementId;
```

Defined in: [gen/types.gen.ts:6232](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6232)

The id of the element that, once completed or terminated, will cause the process to be terminated.

---

### type?

```ts
optional type?: string;
```

Defined in: [gen/types.gen.ts:6227](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6227)

The type of the runtime instruction
