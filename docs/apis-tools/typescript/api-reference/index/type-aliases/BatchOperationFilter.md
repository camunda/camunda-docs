---
title: "Type Alias: BatchOperationFilter"
sidebar_label: "BatchOperationFilter"
mdx:
  format: md
---

# Type Alias: BatchOperationFilter

```ts
type BatchOperationFilter = object;
```

Defined in: [gen/types.gen.ts:733](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L733)

Batch operation filter request.

## Properties

### actorId?

```ts
optional actorId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:753](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L753)

The ID of the actor who performed the operation.

---

### actorType?

```ts
optional actorType?: AuditLogActorTypeEnum;
```

Defined in: [gen/types.gen.ts:749](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L749)

The type of the actor who performed the operation.

---

### batchOperationKey?

```ts
optional batchOperationKey?: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:737](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L737)

The key (or operate legacy ID) of the batch operation.

---

### operationType?

```ts
optional operationType?: BatchOperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:741](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L741)

The type of the batch operation.

---

### state?

```ts
optional state?: BatchOperationStateFilterProperty;
```

Defined in: [gen/types.gen.ts:745](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L745)

The state of the batch operation.
