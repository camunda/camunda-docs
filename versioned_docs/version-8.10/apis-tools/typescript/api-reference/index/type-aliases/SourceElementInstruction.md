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

Defines the source element identifier for the move instruction. It can either be a sourceElementId, or sourceElementInstanceKey.
