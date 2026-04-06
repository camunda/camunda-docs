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

Defined in: [gen/types.gen.ts:8949](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8949)

## Properties

### body?

```ts
optional body?: unknown;
```

Defined in: [gen/types.gen.ts:8950](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8950)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8951](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8951)

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

Defined in: [gen/types.gen.ts:8957](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8957)

---

### url

```ts
url: "/batch-operations/{batchOperationKey}/resumption";
```

Defined in: [gen/types.gen.ts:8958](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8958)
