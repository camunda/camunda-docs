---
title: "Type Alias: SuspendBatchOperationData"
sidebar_label: "SuspendBatchOperationData"
mdx:
  format: md
---

# Type Alias: SuspendBatchOperationData

```ts
type SuspendBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:8853](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8853)

## Properties

### body?

```ts
optional body: unknown;
```

Defined in: [gen/types.gen.ts:8854](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8854)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8855](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8855)

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

Defined in: [gen/types.gen.ts:8861](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8861)

***

### url

```ts
url: "/batch-operations/{batchOperationKey}/suspension";
```

Defined in: [gen/types.gen.ts:8862](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8862)
