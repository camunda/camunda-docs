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

Defined in: [gen/types.gen.ts:753](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L753)

## Properties

### actorId?

```ts
optional actorId: string;
```

Defined in: [gen/types.gen.ts:772](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L772)

The ID of the actor who performed the operation. Available for batch operations created since 8.9.

---

### actorType?

```ts
optional actorType: AuditLogActorTypeEnum;
```

Defined in: [gen/types.gen.ts:768](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L768)

---

### batchOperationKey?

```ts
optional batchOperationKey: BatchOperationKey;
```

Defined in: [gen/types.gen.ts:757](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L757)

Key or (Operate Legacy ID = UUID) of the batch operation.

---

### batchOperationType?

```ts
optional batchOperationType: BatchOperationTypeEnum;
```

Defined in: [gen/types.gen.ts:759](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L759)

---

### endDate?

```ts
optional endDate: string;
```

Defined in: [gen/types.gen.ts:767](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L767)

The end date of the batch operation.

---

### errors?

```ts
optional errors: BatchOperationError[];
```

Defined in: [gen/types.gen.ts:788](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L788)

The errors that occurred per partition during the batch operation.

---

### operationsCompletedCount?

```ts
optional operationsCompletedCount: number;
```

Defined in: [gen/types.gen.ts:784](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L784)

The number of successfully completed tasks.

---

### operationsFailedCount?

```ts
optional operationsFailedCount: number;
```

Defined in: [gen/types.gen.ts:780](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L780)

The number of items which failed during execution of the batch operation. (e.g. because they are rejected by the Zeebe engine).

---

### operationsTotalCount?

```ts
optional operationsTotalCount: number;
```

Defined in: [gen/types.gen.ts:776](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L776)

The total number of items contained in this batch operation.

---

### startDate?

```ts
optional startDate: string;
```

Defined in: [gen/types.gen.ts:763](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L763)

The start date of the batch operation.

---

### state?

```ts
optional state: BatchOperationStateEnum;
```

Defined in: [gen/types.gen.ts:758](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L758)
