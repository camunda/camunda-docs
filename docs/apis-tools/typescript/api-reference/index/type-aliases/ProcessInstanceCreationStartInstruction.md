---
title: "Type Alias: ProcessInstanceCreationStartInstruction"
sidebar_label: "ProcessInstanceCreationStartInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationStartInstruction

```ts
type ProcessInstanceCreationStartInstruction = object;
```

Defined in: [gen/types.gen.ts:6203](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6203)

## Properties

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6212](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6212)

Future extensions might include:

- different types of start instructions
- ability to set local variables for different flow scopes

For now, however, the start instruction is implicitly a "startBeforeElement" instruction
