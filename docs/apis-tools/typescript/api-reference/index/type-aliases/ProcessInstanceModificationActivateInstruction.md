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

Defined in: [gen/types.gen.ts:6684](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6684)

Instruction describing an element to activate.

## Properties

### ancestorElementInstanceKey?

```ts
optional ancestorElementInstanceKey?: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6700](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6700)

The key of the ancestor scope the element instance should be created in.
Set to -1 to create the new element instance within an existing element instance of the
flow scope. If multiple instances of the target element's flow scope exist, choose one
specifically with this property by providing its key.

---

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6688](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6688)

The id of the element to activate.

---

### variableInstructions?

```ts
optional variableInstructions?: ModifyProcessInstanceVariableInstruction[];
```

Defined in: [gen/types.gen.ts:6692](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6692)

Instructions describing which variables to create or update.
