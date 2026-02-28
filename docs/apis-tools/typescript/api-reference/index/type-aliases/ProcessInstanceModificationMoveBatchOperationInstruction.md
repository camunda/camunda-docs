---
title: "Type Alias: ProcessInstanceModificationMoveBatchOperationInstruction"
sidebar_label: "ProcessInstanceModificationMoveBatchOperationInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationMoveBatchOperationInstruction

```ts
type ProcessInstanceModificationMoveBatchOperationInstruction = object;
```

Defined in: [gen/types.gen.ts:985](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L985)

Instructions describing a move operation. This instruction will terminate all active
element instances at `sourceElementId` and activate a new element instance for each
terminated one at `targetElementId`. The new element instances are created in the parent
scope of the source element instances.

## Properties

### sourceElementId

```ts
sourceElementId: ElementId;
```

Defined in: [gen/types.gen.ts:989](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L989)

The source element ID.

---

### targetElementId

```ts
targetElementId: ElementId;
```

Defined in: [gen/types.gen.ts:993](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L993)

The target element ID.
