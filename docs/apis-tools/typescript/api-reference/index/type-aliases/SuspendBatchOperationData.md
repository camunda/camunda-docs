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

Defined in: [gen/types.gen.ts:8967](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8967)

## Properties

### body?

```ts
optional body: unknown;
```

Defined in: [gen/types.gen.ts:8968](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8968)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8969](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8969)

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

Defined in: [gen/types.gen.ts:8975](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8975)

***

### url

```ts
url: "/batch-operations/{batchOperationKey}/suspension";
```

Defined in: [gen/types.gen.ts:8976](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8976)
