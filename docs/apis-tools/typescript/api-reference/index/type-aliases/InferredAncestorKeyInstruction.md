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

Defined in: [gen/types.gen.ts:6110](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6110)

Instructs the engine to derive the ancestor scope key from the source element's hierarchy. The engine traverses the source element's ancestry to find an instance that matches one of the target element's flow scopes, ensuring the target is activated in the correct scope.

## Properties

### ancestorScopeType

```ts
ancestorScopeType: string;
```

Defined in: [gen/types.gen.ts:6114](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6114)

The type of ancestor scope instruction.
