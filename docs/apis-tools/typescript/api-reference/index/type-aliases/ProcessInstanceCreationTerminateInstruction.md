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

Defined in: [gen/types.gen.ts:6149](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6149)

Terminates the process instance after a specific BPMN element is completed or terminated.

## Properties

### afterElementId

```ts
afterElementId: ElementId;
```

Defined in: [gen/types.gen.ts:6158](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6158)

The id of the element that, once completed or terminated, will cause the process to be terminated.

***

### type?

```ts
optional type: string;
```

Defined in: [gen/types.gen.ts:6153](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6153)

The type of the runtime instruction
