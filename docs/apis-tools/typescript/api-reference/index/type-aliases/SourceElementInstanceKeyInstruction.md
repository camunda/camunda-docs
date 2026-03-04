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

Defined in: [gen/types.gen.ts:6063](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6063)

Defines an instruction with a sourceElementInstanceKey. The move instruction with this sourceType will terminate one active element
instance with the sourceElementInstanceKey and activate a new element instance at targetElementId.

## Properties

### sourceElementInstanceKey

```ts
sourceElementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6072](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6072)

The source element instance key for the move instruction.

---

### sourceType

```ts
sourceType: string;
```

Defined in: [gen/types.gen.ts:6067](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6067)

The type of source element instruction.
