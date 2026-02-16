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

Defined in: [gen/types.gen.ts:6121](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6121)

Instructs the engine to use the source's direct parent key as the ancestor scope key for the target element. This is a simpler alternative to `inferred` that skips hierarchy traversal and directly uses the source's parent key. This is useful when the source and target elements are siblings within the same flow scope.

## Properties

### ancestorScopeType

```ts
ancestorScopeType: string;
```

Defined in: [gen/types.gen.ts:6125](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6125)

The type of ancestor scope instruction.
