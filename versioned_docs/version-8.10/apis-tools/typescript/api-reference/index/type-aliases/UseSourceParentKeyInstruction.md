---
title: "Type Alias: UseSourceParentKeyInstruction"
sidebar_label: "UseSourceParentKeyInstruction"
mdx:
  format: md
---

# Type Alias: UseSourceParentKeyInstruction

```ts
type UseSourceParentKeyInstruction = object;
```

Instructs the engine to use the source's direct parent key as the ancestor scope key for the target element. This is a simpler alternative to `inferred` that skips hierarchy traversal and directly uses the source's parent key. This is useful when the source and target elements are siblings within the same flow scope.

## Properties

### ancestorScopeType

```ts
ancestorScopeType: string;
```

The type of ancestor scope instruction.
