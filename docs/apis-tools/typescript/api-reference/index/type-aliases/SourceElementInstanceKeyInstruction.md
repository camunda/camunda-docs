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

Defined in: [gen/types.gen.ts:6765](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6765)

Defines an instruction with a sourceElementInstanceKey. The move instruction with this sourceType will terminate one active element
instance with the sourceElementInstanceKey and activate a new element instance at targetElementId.

## Properties

### sourceElementInstanceKey

```ts
sourceElementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6774](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6774)

The source element instance key for the move instruction.

***

### sourceType

```ts
sourceType: string;
```

Defined in: [gen/types.gen.ts:6769](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6769)

The type of source element instruction.
