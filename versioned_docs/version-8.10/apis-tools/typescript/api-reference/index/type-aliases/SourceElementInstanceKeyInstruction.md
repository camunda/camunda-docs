---
title: "Type Alias: SourceElementInstanceKeyInstruction"
sidebar_label: "SourceElementInstanceKeyInstruction"
mdx:
  format: md
---

# Type Alias: SourceElementInstanceKeyInstruction

```ts
type SourceElementInstanceKeyInstruction = object;
```

Defines an instruction with a sourceElementInstanceKey. The move instruction with this sourceType will terminate one active element
instance with the sourceElementInstanceKey and activate a new element instance at targetElementId.

## Properties

### sourceElementInstanceKey

```ts
sourceElementInstanceKey: ElementInstanceKey;
```

The source element instance key for the move instruction.

---

### sourceType

```ts
sourceType: string;
```

The type of source element instruction.
