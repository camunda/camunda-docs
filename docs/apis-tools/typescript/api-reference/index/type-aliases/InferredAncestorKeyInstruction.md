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

Defined in: [gen/types.gen.ts:6737](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6737)

Instructs the engine to derive the ancestor scope key from the source element's hierarchy. The engine traverses the source element's ancestry to find an instance that matches one of the target element's flow scopes, ensuring the target is activated in the correct scope.

## Properties

### ancestorScopeType

```ts
ancestorScopeType: string;
```

Defined in: [gen/types.gen.ts:6741](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6741)

The type of ancestor scope instruction.
