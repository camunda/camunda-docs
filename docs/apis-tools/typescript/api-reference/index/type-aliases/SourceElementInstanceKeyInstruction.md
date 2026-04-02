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

Defined in: [gen/types.gen.ts:6776](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6776)

Defines an instruction with a sourceElementInstanceKey. The move instruction with this sourceType will terminate one active element
instance with the sourceElementInstanceKey and activate a new element instance at targetElementId.

## Properties

### sourceElementInstanceKey

```ts
sourceElementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6785](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6785)

The source element instance key for the move instruction.

---

### sourceType

```ts
sourceType: string;
```

Defined in: [gen/types.gen.ts:6780](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6780)

The type of source element instruction.
