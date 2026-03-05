---
title: "Type Alias: ProcessInstanceModificationInstruction"
sidebar_label: "ProcessInstanceModificationInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationInstruction

```ts
type ProcessInstanceModificationInstruction = object;
```

Defined in: [gen/types.gen.ts:6579](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6579)

## Properties

### activateInstructions?

```ts
optional activateInstructions: ProcessInstanceModificationActivateInstruction[];
```

Defined in: [gen/types.gen.ts:6584](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6584)

Instructions describing which elements to activate in which scopes and which variables to create or update.

***

### moveInstructions?

```ts
optional moveInstructions: ProcessInstanceModificationMoveInstruction[];
```

Defined in: [gen/types.gen.ts:6588](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6588)

Instructions describing which elements to move from one scope to another.

***

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:6580](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6580)

***

### terminateInstructions?

```ts
optional terminateInstructions: ProcessInstanceModificationTerminateInstruction[];
```

Defined in: [gen/types.gen.ts:6592](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6592)

Instructions describing which elements to terminate.
