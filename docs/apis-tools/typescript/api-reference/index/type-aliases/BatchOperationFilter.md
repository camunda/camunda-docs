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

Defined in: [gen/types.gen.ts:720](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L720)

Batch operation filter request.

## Properties

### actorId?

```ts
optional actorId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:740](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L740)

The ID of the actor who performed the operation.

---

### actorType?

```ts
optional actorType: AuditLogActorTypeEnum;
```

Defined in: [gen/types.gen.ts:736](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L736)

The type of the actor who performed the operation.

---

### batchOperationKey?

```ts
optional batchOperationKey: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:724](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L724)

The key (or operate legacy ID) of the batch operation.

---

### operationType?

```ts
optional operationType: BatchOperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:728](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L728)

The type of the batch operation.

---

### state?

```ts
optional state: BatchOperationStateFilterProperty;
```

Defined in: [gen/types.gen.ts:732](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L732)

The state of the batch operation.
