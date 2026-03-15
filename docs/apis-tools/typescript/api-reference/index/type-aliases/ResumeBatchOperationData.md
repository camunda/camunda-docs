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

Defined in: [gen/types.gen.ts:8920](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8920)

## Properties

### body?

```ts
optional body: unknown;
```

Defined in: [gen/types.gen.ts:8921](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8921)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8922](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8922)

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

Defined in: [gen/types.gen.ts:8928](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8928)

***

### url

```ts
url: "/batch-operations/{batchOperationKey}/resumption";
```

Defined in: [gen/types.gen.ts:8929](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8929)
