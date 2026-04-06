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

Defined in: [gen/types.gen.ts:8907](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8907)

## Properties

### body?

```ts
optional body?: unknown;
```

Defined in: [gen/types.gen.ts:8908](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8908)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8909](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8909)

#### batchOperationKey

```ts
batchOperationKey: BatchOperationKey;
```

The key (or operate legacy ID) of the batch operation.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:8915](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8915)

---

### url

```ts
url: "/batch-operations/{batchOperationKey}/cancellation";
```

Defined in: [gen/types.gen.ts:8916](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8916)
