---
title: "Type Alias: GetBatchOperationData"
sidebar_label: "GetBatchOperationData"
mdx:
  format: md
---

# Type Alias: GetBatchOperationData

```ts
type GetBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:8726](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8726)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:8727](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8727)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8728](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8728)

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

Defined in: [gen/types.gen.ts:8734](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8734)

***

### url

```ts
url: "/batch-operations/{batchOperationKey}";
```

Defined in: [gen/types.gen.ts:8735](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8735)
