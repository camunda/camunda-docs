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

Defined in: [gen/types.gen.ts:8869](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8869)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:8870](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8870)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8871](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8871)

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

Defined in: [gen/types.gen.ts:8877](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8877)

---

### url

```ts
url: "/batch-operations/{batchOperationKey}";
```

Defined in: [gen/types.gen.ts:8878](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8878)
