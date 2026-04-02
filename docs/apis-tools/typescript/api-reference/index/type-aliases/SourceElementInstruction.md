---
title: "Type Alias: SourceElementInstruction"
sidebar_label: "SourceElementInstruction"
mdx:
  format: md
---

# Type Alias: SourceElementInstruction

```ts
type SourceElementInstruction =
  | (object & SourceElementIdInstruction)
  | (object & SourceElementInstanceKeyInstruction);
```

Defined in: [gen/types.gen.ts:6747](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6747)

Defines the source element identifier for the move instruction. It can either be a sourceElementId, or sourceElementInstanceKey.
