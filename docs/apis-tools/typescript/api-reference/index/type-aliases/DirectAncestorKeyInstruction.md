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

Defined in: [gen/types.gen.ts:6804](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6804)

Provides a concrete key to use as ancestor scope for the created element instance.

## Properties

### ancestorElementInstanceKey

```ts
ancestorElementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6816](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6816)

The key of the ancestor scope the element instance should be created in.
Set to -1 to create the new element instance within an existing element instance of the
flow scope. If multiple instances of the target element's flow scope exist, choose one
specifically with this property by providing its key.

---

### ancestorScopeType

```ts
ancestorScopeType: string;
```

Defined in: [gen/types.gen.ts:6808](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6808)

The type of ancestor scope instruction.
