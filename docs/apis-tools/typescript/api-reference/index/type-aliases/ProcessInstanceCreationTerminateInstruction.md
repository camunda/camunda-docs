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

Defined in: [gen/types.gen.ts:5551](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5551)

Terminates the process instance after a specific BPMN element is completed or terminated.

## Properties

### afterElementId

```ts
afterElementId: ElementId;
```

Defined in: [gen/types.gen.ts:5560](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5560)

The id of the element that, once completed or terminated, will cause the process to be terminated.

---

### type?

```ts
optional type: string;
```

Defined in: [gen/types.gen.ts:5555](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5555)

The type of the runtime instruction
