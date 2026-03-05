---
title: "Type Alias: ProcessInstanceModificationBatchOperationRequest"
sidebar_label: "ProcessInstanceModificationBatchOperationRequest"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationBatchOperationRequest

```ts
type ProcessInstanceModificationBatchOperationRequest = object;
```

Defined in: [gen/types.gen.ts:999](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L999)

The process instance filter to define on which process instances tokens should be moved,
and new element instances should be activated or terminated.

## Properties

### filter

```ts
filter: ProcessInstanceFilter;
```

Defined in: [gen/types.gen.ts:1003](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1003)

The process instance filter.

***

### moveInstructions

```ts
moveInstructions: ProcessInstanceModificationMoveBatchOperationInstruction[];
```

Defined in: [gen/types.gen.ts:1007](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1007)

Instructions for moving tokens between elements.

***

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:1008](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1008)
