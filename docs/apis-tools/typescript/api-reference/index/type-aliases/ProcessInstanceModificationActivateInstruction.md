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

Defined in: [gen/types.gen.ts:6598](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6598)

Instruction describing an element to activate.

## Properties

### ancestorElementInstanceKey?

```ts
optional ancestorElementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6614](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6614)

The key of the ancestor scope the element instance should be created in.
Set to -1 to create the new element instance within an existing element instance of the
flow scope. If multiple instances of the target element's flow scope exist, choose one
specifically with this property by providing its key.

***

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6602](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6602)

The id of the element to activate.

***

### variableInstructions?

```ts
optional variableInstructions: ModifyProcessInstanceVariableInstruction[];
```

Defined in: [gen/types.gen.ts:6606](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6606)

Instructions describing which variables to create or update.
