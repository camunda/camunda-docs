---
title: "Type Alias: MigrateProcessInstanceMappingInstruction"
sidebar_label: "MigrateProcessInstanceMappingInstruction"
mdx:
  format: md
---

# Type Alias: MigrateProcessInstanceMappingInstruction

```ts
type MigrateProcessInstanceMappingInstruction = object;
```

The mapping instructions describe how to map elements from the source process definition to the target process definition.

## Properties

### sourceElementId

```ts
sourceElementId: ElementId;
```

The element id to migrate from.

---

### targetElementId

```ts
targetElementId: ElementId;
```

The element id to migrate into.
