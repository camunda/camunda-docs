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

Instructs the engine to derive the ancestor scope key from the source element's hierarchy. The engine traverses the source element's ancestry to find an instance that matches one of the target element's flow scopes, ensuring the target is activated in the correct scope.

## Properties

### ancestorScopeType

```ts
ancestorScopeType: string;
```

The type of ancestor scope instruction.
