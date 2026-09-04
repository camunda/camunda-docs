---
title: "Type Alias: BatchOperationResponse"
sidebar_label: "BatchOperationResponse"
mdx:
  format: md
---

# Type Alias: BatchOperationResponse

```ts
type BatchOperationResponse = object;
```

## Properties

### actorId

```ts
actorId: string | null;
```

The ID of the actor who performed the operation. Available for batch operations created since 8.9.

---

### actorType

```ts
actorType: AuditLogActorTypeEnum | null;
```

The type of the actor who performed the operation.
This is `null` if the batch operation was created before 8.9,
or if the actor information is not available.

---

### batchOperationKey

```ts
batchOperationKey: BatchOperationKey;
```

Key or (Operate Legacy ID = UUID) of the batch operation.

---

### batchOperationType

```ts
batchOperationType: BatchOperationTypeEnum;
```

---

### endDate

```ts
endDate: string | null;
```

The end date of the batch operation.
This is `null` if the batch operation is still running.

---

### errors

```ts
errors: BatchOperationError[];
```

The errors that occurred per partition during the batch operation.

---

### operationsCompletedCount

```ts
operationsCompletedCount: number;
```

The number of successfully completed tasks.

---

### operationsFailedCount

```ts
operationsFailedCount: number;
```

The number of items which failed during execution of the batch operation. (e.g. because they are rejected by the Zeebe engine).

---

### operationsTotalCount

```ts
operationsTotalCount: number;
```

The total number of items contained in this batch operation.

---

### startDate

```ts
startDate: string | null;
```

The start date of the batch operation.
This is `null` if the batch operation has not yet started.

---

### state

```ts
state: BatchOperationStateEnum;
```
