---
title: "Type Alias: BatchOperationItemResponse"
sidebar_label: "BatchOperationItemResponse"
mdx:
  format: md
---

# Type Alias: BatchOperationItemResponse

```ts
type BatchOperationItemResponse = object;
```

Defined in: [gen/types.gen.ts:884](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L884)

## Properties

### batchOperationKey

```ts
batchOperationKey: BatchOperationKey;
```

Defined in: [gen/types.gen.ts:889](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L889)

The key (or operate legacy ID) of the batch operation.

---

### errorMessage

```ts
errorMessage: string | null;
```

Defined in: [gen/types.gen.ts:918](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L918)

The error message from the engine in case of a failed operation.

---

### itemKey

```ts
itemKey: string;
```

Defined in: [gen/types.gen.ts:893](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L893)

Key of the item, e.g. a process instance key.

---

### operationType

```ts
operationType: BatchOperationTypeEnum;
```

Defined in: [gen/types.gen.ts:885](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L885)

---

### processedDate

```ts
processedDate: string | null;
```

Defined in: [gen/types.gen.ts:914](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L914)

The date this item was processed.
This is `null` if the item has not yet been processed.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:897](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L897)

the process instance key of the processed item.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:904](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L904)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### state

```ts
state: "ACTIVE" | "COMPLETED" | "SKIPPED" | "CANCELED" | "FAILED";
```

Defined in: [gen/types.gen.ts:908](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L908)

State of the item.
