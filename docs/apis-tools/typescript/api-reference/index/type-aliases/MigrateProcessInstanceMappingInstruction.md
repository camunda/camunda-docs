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

Defined in: [gen/types.gen.ts:6568](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6568)

The mapping instructions describe how to map elements from the source process definition to the target process definition.

## Properties

### sourceElementId

```ts
sourceElementId: ElementId;
```

Defined in: [gen/types.gen.ts:6572](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6572)

The element id to migrate from.

***

### targetElementId

```ts
targetElementId: ElementId;
```

Defined in: [gen/types.gen.ts:6576](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6576)

The element id to migrate into.
