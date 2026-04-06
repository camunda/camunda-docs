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

Defined in: [gen/types.gen.ts:6793](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6793)

Defines the ancestor scope for the created element instances. The default behavior resembles
a "direct" scope instruction with an `ancestorElementInstanceKey` of `"-1"`.
