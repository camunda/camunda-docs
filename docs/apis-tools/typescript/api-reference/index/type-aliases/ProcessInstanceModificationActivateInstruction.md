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

Defined in: [gen/types.gen.ts:6673](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6673)

Instruction describing an element to activate.

## Properties

### ancestorElementInstanceKey?

```ts
optional ancestorElementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6689](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6689)

The key of the ancestor scope the element instance should be created in.
Set to -1 to create the new element instance within an existing element instance of the
flow scope. If multiple instances of the target element's flow scope exist, choose one
specifically with this property by providing its key.

***

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6677](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6677)

The id of the element to activate.

***

### variableInstructions?

```ts
optional variableInstructions: ModifyProcessInstanceVariableInstruction[];
```

Defined in: [gen/types.gen.ts:6681](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6681)

Instructions describing which variables to create or update.
