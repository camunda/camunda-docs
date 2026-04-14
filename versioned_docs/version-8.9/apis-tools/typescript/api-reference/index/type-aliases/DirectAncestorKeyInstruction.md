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

Provides a concrete key to use as ancestor scope for the created element instance.

## Properties

### ancestorElementInstanceKey

```ts
ancestorElementInstanceKey: ElementInstanceKey;
```

The key of the ancestor scope the element instance should be created in.
Set to -1 to create the new element instance within an existing element instance of the
flow scope. If multiple instances of the target element's flow scope exist, choose one
specifically with this property by providing its key.

---

### ancestorScopeType

```ts
ancestorScopeType: string;
```

The type of ancestor scope instruction.
