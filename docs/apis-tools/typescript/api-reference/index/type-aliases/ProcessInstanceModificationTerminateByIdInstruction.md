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

Defined in: [gen/types.gen.ts:6138](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6138)

Instruction describing which elements to terminate. The element instances are determined
at runtime by the given id.

## Properties

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6142](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6142)

The id of the elements to terminate. The element instances are determined at runtime.
