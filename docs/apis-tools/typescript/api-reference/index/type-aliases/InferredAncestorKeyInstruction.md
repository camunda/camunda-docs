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

Defined in: [gen/types.gen.ts:6812](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6812)

Instructs the engine to derive the ancestor scope key from the source element's hierarchy. The engine traverses the source element's ancestry to find an instance that matches one of the target element's flow scopes, ensuring the target is activated in the correct scope.

## Properties

### ancestorScopeType

```ts
ancestorScopeType: string;
```

Defined in: [gen/types.gen.ts:6816](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6816)

The type of ancestor scope instruction.
