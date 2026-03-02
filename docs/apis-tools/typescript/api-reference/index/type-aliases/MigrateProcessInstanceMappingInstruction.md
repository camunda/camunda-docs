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

Defined in: [gen/types.gen.ts:5941](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5941)

The mapping instructions describe how to map elements from the source process definition to the target process definition.

## Properties

### sourceElementId

```ts
sourceElementId: ElementId;
```

Defined in: [gen/types.gen.ts:5945](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5945)

The element id to migrate from.

---

### targetElementId

```ts
targetElementId: ElementId;
```

Defined in: [gen/types.gen.ts:5949](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5949)

The element id to migrate into.
