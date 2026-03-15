---
title: "Type Alias: SourceElementInstruction"
sidebar_label: "SourceElementInstruction"
mdx:
  format: md
---

# Type Alias: SourceElementInstruction

```ts
type SourceElementInstruction = 
  | object & SourceElementIdInstruction
  | object & SourceElementInstanceKeyInstruction;
```

Defined in: [gen/types.gen.ts:6736](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6736)

Defines the source element identifier for the move instruction. It can either be a sourceElementId, or sourceElementInstanceKey.
