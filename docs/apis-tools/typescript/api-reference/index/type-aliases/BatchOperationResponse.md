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

Defined in: [gen/types.gen.ts:770](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L770)

## Properties

### actorId

```ts
actorId: string | null;
```

Defined in: [gen/types.gen.ts:799](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L799)

The ID of the actor who performed the operation. Available for batch operations created since 8.9.

***

### actorType

```ts
actorType: AuditLogActorTypeEnum | null;
```

Defined in: [gen/types.gen.ts:795](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L795)

The type of the actor who performed the operation.
This is `null` if the batch operation was created before 8.9,
or if the actor information is not available.

***

### batchOperationKey

```ts
batchOperationKey: BatchOperationKey;
```

Defined in: [gen/types.gen.ts:774](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L774)

Key or (Operate Legacy ID = UUID) of the batch operation.

***

### batchOperationType

```ts
batchOperationType: BatchOperationTypeEnum;
```

Defined in: [gen/types.gen.ts:776](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L776)

***

### endDate?

```ts
optional endDate: string | null;
```

Defined in: [gen/types.gen.ts:788](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L788)

The end date of the batch operation.
This is `null` if the batch operation is still running.

***

### errors

```ts
errors: BatchOperationError[];
```

Defined in: [gen/types.gen.ts:815](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L815)

The errors that occurred per partition during the batch operation.

***

### operationsCompletedCount

```ts
operationsCompletedCount: number;
```

Defined in: [gen/types.gen.ts:811](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L811)

The number of successfully completed tasks.

***

### operationsFailedCount

```ts
operationsFailedCount: number;
```

Defined in: [gen/types.gen.ts:807](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L807)

The number of items which failed during execution of the batch operation. (e.g. because they are rejected by the Zeebe engine).

***

### operationsTotalCount

```ts
operationsTotalCount: number;
```

Defined in: [gen/types.gen.ts:803](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L803)

The total number of items contained in this batch operation.

***

### startDate?

```ts
optional startDate: string | null;
```

Defined in: [gen/types.gen.ts:782](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L782)

The start date of the batch operation.
This is `null` if the batch operation has not yet started.

***

### state

```ts
state: BatchOperationStateEnum;
```

Defined in: [gen/types.gen.ts:775](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L775)
