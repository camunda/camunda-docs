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

Defined in: [gen/types.gen.ts:8996](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8996)

## Properties

### body?

```ts
optional body?: unknown;
```

Defined in: [gen/types.gen.ts:8997](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8997)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8998](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8998)

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

Defined in: [gen/types.gen.ts:9004](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9004)

---

### url

```ts
url: "/batch-operations/{batchOperationKey}/suspension";
```

Defined in: [gen/types.gen.ts:9005](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L9005)
