---
title: "Type Alias: DirectAncestorKeyInstruction"
sidebar_label: "DirectAncestorKeyInstruction"
mdx:
  format: md
---

# Type Alias: DirectAncestorKeyInstruction

```ts
type DirectAncestorKeyInstruction = object;
```

Defined in: [gen/types.gen.ts:6793](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6793)

Provides a concrete key to use as ancestor scope for the created element instance.

## Properties

### ancestorElementInstanceKey

```ts
ancestorElementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6805](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6805)

The key of the ancestor scope the element instance should be created in.
Set to -1 to create the new element instance within an existing element instance of the
flow scope. If multiple instances of the target element's flow scope exist, choose one
specifically with this property by providing its key.

***

### ancestorScopeType

```ts
ancestorScopeType: string;
```

Defined in: [gen/types.gen.ts:6797](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6797)

The type of ancestor scope instruction.
