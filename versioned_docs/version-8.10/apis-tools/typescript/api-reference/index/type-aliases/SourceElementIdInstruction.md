---
title: "Type Alias: SourceElementIdInstruction"
sidebar_label: "SourceElementIdInstruction"
mdx:
  format: md
---

# Type Alias: SourceElementIdInstruction

```ts
type SourceElementIdInstruction = object;
```

Defines an instruction with a sourceElementId. The move instruction with this sourceType will terminate all active element
instances with the sourceElementId and activate a new element instance for each terminated
one at targetElementId.

## Properties

### sourceElementId

```ts
sourceElementId: ElementId;
```

The id of the source element for the move instruction.

---

### sourceType

```ts
sourceType: string;
```

The type of source element instruction.
