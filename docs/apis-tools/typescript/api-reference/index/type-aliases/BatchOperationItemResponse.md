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

Defined in: [gen/types.gen.ts:888](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L888)

## Properties

### batchOperationKey

```ts
batchOperationKey: BatchOperationKey;
```

Defined in: [gen/types.gen.ts:893](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L893)

The key (or operate legacy ID) of the batch operation.

***

### errorMessage

```ts
errorMessage: string | null;
```

Defined in: [gen/types.gen.ts:922](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L922)

The error message from the engine in case of a failed operation.

***

### itemKey

```ts
itemKey: string;
```

Defined in: [gen/types.gen.ts:897](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L897)

Key of the item, e.g. a process instance key.

***

### operationType

```ts
operationType: BatchOperationTypeEnum;
```

Defined in: [gen/types.gen.ts:889](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L889)

***

### processedDate

```ts
processedDate: string | null;
```

Defined in: [gen/types.gen.ts:918](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L918)

The date this item was processed.
This is `null` if the item has not yet been processed.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:901](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L901)

the process instance key of the processed item.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:908](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L908)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### state

```ts
state: "ACTIVE" | "COMPLETED" | "SKIPPED" | "CANCELED" | "FAILED";
```

Defined in: [gen/types.gen.ts:912](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L912)

State of the item.
