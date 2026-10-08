---
title: "Type Alias: AncestorScopeInstruction"
sidebar_label: "AncestorScopeInstruction"
mdx:
  format: md
---

# Type Alias: AncestorScopeInstruction

```ts
type AncestorScopeInstruction =
  | (object & DirectAncestorKeyInstruction)
  | (object & InferredAncestorKeyInstruction)
  | (object & UseSourceParentKeyInstruction);
```

Defines the ancestor scope for the created element instances. The default behavior resembles
a "direct" scope instruction with an `ancestorElementInstanceKey` of `"-1"`.
