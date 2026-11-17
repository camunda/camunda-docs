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

Batch operation filter request.

## Properties

### actorId?

```ts
optional actorId?: StringFilterProperty;
```

The ID of the actor who performed the operation.

---

### actorType?

```ts
optional actorType?: AuditLogActorTypeEnum;
```

The type of the actor who performed the operation.

---

### batchOperationKey?

```ts
optional batchOperationKey?: BasicStringFilterProperty;
```

The key (or operate legacy ID) of the batch operation.

---

### operationType?

```ts
optional operationType?: BatchOperationTypeFilterProperty;
```

The type of the batch operation.

---

### state?

```ts
optional state?: BatchOperationStateFilterProperty;
```

The state of the batch operation.
