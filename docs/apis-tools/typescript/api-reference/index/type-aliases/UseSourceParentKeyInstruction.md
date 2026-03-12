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

Defined in: [gen/types.gen.ts:6823](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6823)

Instructs the engine to use the source's direct parent key as the ancestor scope key for the target element. This is a simpler alternative to `inferred` that skips hierarchy traversal and directly uses the source's parent key. This is useful when the source and target elements are siblings within the same flow scope.

## Properties

### ancestorScopeType

```ts
ancestorScopeType: string;
```

Defined in: [gen/types.gen.ts:6827](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6827)

The type of ancestor scope instruction.
