---
title: "Type Alias: ProcessInstanceModificationMoveInstruction"
sidebar_label: "ProcessInstanceModificationMoveInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationMoveInstruction

```ts
type ProcessInstanceModificationMoveInstruction = object;
```

Defined in: [gen/types.gen.ts:6017](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6017)

Instruction describing a move operation. This instruction will terminate active element
instances based on the sourceElementInstruction and activate a new element instance for each terminated
one at targetElementId. Note that, for multi-instance activities, only the multi-instance
body instances will activate new element instances at the target id.

## Properties

### ancestorScopeInstruction?

```ts
optional ancestorScopeInstruction: AncestorScopeInstruction;
```

Defined in: [gen/types.gen.ts:6023](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6023)

---

### sourceElementInstruction

```ts
sourceElementInstruction: SourceElementInstruction;
```

Defined in: [gen/types.gen.ts:6018](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6018)

---

### targetElementId

```ts
targetElementId: ElementId;
```

Defined in: [gen/types.gen.ts:6022](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6022)

The target element id.

---

### variableInstructions?

```ts
optional variableInstructions: ModifyProcessInstanceVariableInstruction[];
```

Defined in: [gen/types.gen.ts:6027](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6027)

Instructions describing which variables to create or update.
