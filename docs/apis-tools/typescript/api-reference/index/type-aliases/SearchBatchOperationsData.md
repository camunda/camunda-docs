---
title: "Type Alias: SearchBatchOperationsData"
sidebar_label: "SearchBatchOperationsData"
mdx:
  format: md
---

# Type Alias: SearchBatchOperationsData

```ts
type SearchBatchOperationsData = object;
```

Defined in: [gen/types.gen.ts:8284](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8284)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:8288](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8288)

Batch operation search request.

#### Type Declaration

##### filter?

```ts
optional filter: object;
```

Batch operation filter request.

###### filter.actorId?

```ts
optional actorId: StringFilterProperty;
```

The ID of the actor who performed the operation.

###### filter.actorType?

```ts
optional actorType: AuditLogActorTypeEnum;
```

The type of the actor who performed the operation.

###### filter.batchOperationKey?

```ts
optional batchOperationKey: BasicStringFilterProperty;
```

The key (or operate legacy ID) of the batch operation.

###### filter.operationType?

```ts
optional operationType: BatchOperationTypeFilterProperty;
```

The type of the batch operation.

###### filter.state?

```ts
optional state: BatchOperationStateFilterProperty;
```

The state of the batch operation.

##### sort?

```ts
optional sort: BatchOperationSearchQuerySortRequest[];
```

Sort field criteria.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:8319](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8319)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:8320](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8320)

---

### url

```ts
url: "/batch-operations/search";
```

Defined in: [gen/types.gen.ts:8321](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8321)
