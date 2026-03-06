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

Defined in: [gen/types.gen.ts:6748](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6748)

Instructs the engine to use the source's direct parent key as the ancestor scope key for the target element. This is a simpler alternative to `inferred` that skips hierarchy traversal and directly uses the source's parent key. This is useful when the source and target elements are siblings within the same flow scope.

## Properties

### ancestorScopeType

```ts
ancestorScopeType: string;
```

Defined in: [gen/types.gen.ts:6752](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6752)

The type of ancestor scope instruction.
