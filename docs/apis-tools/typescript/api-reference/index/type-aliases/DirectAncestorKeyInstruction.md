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

Defined in: [gen/types.gen.ts:6091](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6091)

Provides a concrete key to use as ancestor scope for the created element instance.

## Properties

### ancestorElementInstanceKey

```ts
ancestorElementInstanceKey: string | ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6103](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6103)

The key of the ancestor scope the element instance should be created in.
Set to -1 to create the new element instance within an existing element instance of the
flow scope. If multiple instances of the target element's flow scope exist, choose one
specifically with this property by providing its key.

---

### ancestorScopeType

```ts
ancestorScopeType: string;
```

Defined in: [gen/types.gen.ts:6095](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6095)

The type of ancestor scope instruction.
