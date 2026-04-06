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

Defined in: [gen/types.gen.ts:6834](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6834)

Instructs the engine to use the source's direct parent key as the ancestor scope key for the target element. This is a simpler alternative to `inferred` that skips hierarchy traversal and directly uses the source's parent key. This is useful when the source and target elements are siblings within the same flow scope.

## Properties

### ancestorScopeType

```ts
ancestorScopeType: string;
```

Defined in: [gen/types.gen.ts:6838](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6838)

The type of ancestor scope instruction.
