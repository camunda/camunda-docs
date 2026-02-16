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

Defined in: [gen/types.gen.ts:6034](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6034)

Defines the source element identifier for the move instruction. It can either be a sourceElementId, or sourceElementInstanceKey.
