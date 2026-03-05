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

Defined in: [gen/types.gen.ts:6644](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6644)

Instruction describing a move operation. This instruction will terminate active element
instances based on the sourceElementInstruction and activate a new element instance for each terminated
one at targetElementId. Note that, for multi-instance activities, only the multi-instance
body instances will activate new element instances at the target id.

## Properties

### ancestorScopeInstruction?

```ts
optional ancestorScopeInstruction: AncestorScopeInstruction;
```

Defined in: [gen/types.gen.ts:6650](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6650)

***

### sourceElementInstruction

```ts
sourceElementInstruction: SourceElementInstruction;
```

Defined in: [gen/types.gen.ts:6645](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6645)

***

### targetElementId

```ts
targetElementId: ElementId;
```

Defined in: [gen/types.gen.ts:6649](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6649)

The target element id.

***

### variableInstructions?

```ts
optional variableInstructions: ModifyProcessInstanceVariableInstruction[];
```

Defined in: [gen/types.gen.ts:6654](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6654)

Instructions describing which variables to create or update.
