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

Defined in: [gen/types.gen.ts:8878](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8878)

## Properties

### body?

```ts
optional body: unknown;
```

Defined in: [gen/types.gen.ts:8879](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8879)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8880](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8880)

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

Defined in: [gen/types.gen.ts:8886](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8886)

***

### url

```ts
url: "/batch-operations/{batchOperationKey}/cancellation";
```

Defined in: [gen/types.gen.ts:8887](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8887)
