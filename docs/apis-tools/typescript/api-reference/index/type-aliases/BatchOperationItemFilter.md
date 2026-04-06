---
title: "Type Alias: BatchOperationItemFilter"
sidebar_label: "BatchOperationItemFilter"
mdx:
  format: md
---

# Type Alias: BatchOperationItemFilter

```ts
type BatchOperationItemFilter = object;
```

Defined in: [gen/types.gen.ts:854](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L854)

Batch operation item filter request.

## Properties

### batchOperationKey?

```ts
optional batchOperationKey?: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:858](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L858)

The key (or operate legacy ID) of the batch operation.

---

### itemKey?

```ts
optional itemKey?: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:862](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L862)

The key of the item, e.g. a process instance key.

---

### operationType?

```ts
optional operationType?: BatchOperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:874](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L874)

The type of the batch operation.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:866](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L866)

The process instance key of the processed item.

---

### state?

```ts
optional state?: BatchOperationItemStateFilterProperty;
```

Defined in: [gen/types.gen.ts:870](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L870)

The state of the batch operation.
