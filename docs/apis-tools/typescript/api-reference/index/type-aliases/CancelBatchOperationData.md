---
title: "Type Alias: CancelBatchOperationData"
sidebar_label: "CancelBatchOperationData"
mdx:
  format: md
---

# Type Alias: CancelBatchOperationData

```ts
type CancelBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:8764](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8764)

## Properties

### body?

```ts
optional body: unknown;
```

Defined in: [gen/types.gen.ts:8765](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8765)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8766](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8766)

#### batchOperationKey

```ts
batchOperationKey: BatchOperationKey;
```

The key (or operate legacy ID) of the batch operation.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:8772](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8772)

***

### url

```ts
url: "/batch-operations/{batchOperationKey}/cancellation";
```

Defined in: [gen/types.gen.ts:8773](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8773)
