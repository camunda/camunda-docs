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

Defined in: [gen/types.gen.ts:6220](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6220)

Terminates the process instance after a specific BPMN element is completed or terminated.

## Properties

### afterElementId

```ts
afterElementId: ElementId;
```

Defined in: [gen/types.gen.ts:6229](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6229)

The id of the element that, once completed or terminated, will cause the process to be terminated.

***

### type?

```ts
optional type: string;
```

Defined in: [gen/types.gen.ts:6224](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6224)

The type of the runtime instruction
