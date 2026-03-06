---
title: "Type Alias: ResumeBatchOperationData"
sidebar_label: "ResumeBatchOperationData"
mdx:
  format: md
---

# Type Alias: ResumeBatchOperationData

```ts
type ResumeBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:8806](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8806)

## Properties

### body?

```ts
optional body: unknown;
```

Defined in: [gen/types.gen.ts:8807](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8807)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8808](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8808)

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

Defined in: [gen/types.gen.ts:8814](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8814)

***

### url

```ts
url: "/batch-operations/{batchOperationKey}/resumption";
```

Defined in: [gen/types.gen.ts:8815](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8815)
