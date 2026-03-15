---
title: "Type Alias: AncestorScopeInstruction"
sidebar_label: "AncestorScopeInstruction"
mdx:
  format: md
---

# Type Alias: AncestorScopeInstruction

```ts
type AncestorScopeInstruction = 
  | object & DirectAncestorKeyInstruction
  | object & InferredAncestorKeyInstruction
  | object & UseSourceParentKeyInstruction;
```

Defined in: [gen/types.gen.ts:6782](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6782)

Defines the ancestor scope for the created element instances. The default behavior resembles
a "direct" scope instruction with an `ancestorElementInstanceKey` of `"-1"`.
