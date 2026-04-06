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

Defined in: [gen/types.gen.ts:6654](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6654)

The mapping instructions describe how to map elements from the source process definition to the target process definition.

## Properties

### sourceElementId

```ts
sourceElementId: ElementId;
```

Defined in: [gen/types.gen.ts:6658](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6658)

The element id to migrate from.

---

### targetElementId

```ts
targetElementId: ElementId;
```

Defined in: [gen/types.gen.ts:6662](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6662)

The element id to migrate into.
