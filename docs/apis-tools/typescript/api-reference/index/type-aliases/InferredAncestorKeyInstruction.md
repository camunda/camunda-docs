---
title: "Type Alias: InferredAncestorKeyInstruction"
sidebar_label: "InferredAncestorKeyInstruction"
mdx:
  format: md
---

# Type Alias: InferredAncestorKeyInstruction

```ts
type InferredAncestorKeyInstruction = object;
```

Defined in: [gen/types.gen.ts:6823](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6823)

Instructs the engine to derive the ancestor scope key from the source element's hierarchy. The engine traverses the source element's ancestry to find an instance that matches one of the target element's flow scopes, ensuring the target is activated in the correct scope.

## Properties

### ancestorScopeType

```ts
ancestorScopeType: string;
```

Defined in: [gen/types.gen.ts:6827](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6827)

The type of ancestor scope instruction.
