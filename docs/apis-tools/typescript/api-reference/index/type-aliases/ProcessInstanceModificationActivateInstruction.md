---
title: "Type Alias: ProcessInstanceModificationActivateInstruction"
sidebar_label: "ProcessInstanceModificationActivateInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationActivateInstruction

```ts
type ProcessInstanceModificationActivateInstruction = object;
```

Defined in: [gen/types.gen.ts:5971](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5971)

Instruction describing an element to activate.

## Properties

### ancestorElementInstanceKey?

```ts
optional ancestorElementInstanceKey: string | ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:5987](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5987)

The key of the ancestor scope the element instance should be created in.
Set to -1 to create the new element instance within an existing element instance of the
flow scope. If multiple instances of the target element's flow scope exist, choose one
specifically with this property by providing its key.

---

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:5975](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5975)

The id of the element to activate.

---

### variableInstructions?

```ts
optional variableInstructions: ModifyProcessInstanceVariableInstruction[];
```

Defined in: [gen/types.gen.ts:5979](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5979)

Instructions describing which variables to create or update.
