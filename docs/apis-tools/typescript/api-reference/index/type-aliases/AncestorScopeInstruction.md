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

Defined in: [gen/types.gen.ts:6080](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6080)

Defines the ancestor scope for the created element instances. The default behavior resembles
a "direct" scope instruction with an `ancestorElementInstanceKey` of `"-1"`.
