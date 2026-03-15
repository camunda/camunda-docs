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

Defined in: [gen/types.gen.ts:6748](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6748)

Defines an instruction with a sourceElementId. The move instruction with this sourceType will terminate all active element
instances with the sourceElementId and activate a new element instance for each terminated
one at targetElementId.

## Properties

### sourceElementId

```ts
sourceElementId: ElementId;
```

Defined in: [gen/types.gen.ts:6757](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6757)

The id of the source element for the move instruction.

***

### sourceType

```ts
sourceType: string;
```

Defined in: [gen/types.gen.ts:6752](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6752)

The type of source element instruction.
