---
title: "Type Alias: SearchBatchOperationItemsData"
sidebar_label: "SearchBatchOperationItemsData"
mdx:
  format: md
---

# Type Alias: SearchBatchOperationItemsData

```ts
type SearchBatchOperationItemsData = object;
```

Defined in: [gen/types.gen.ts:8190](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8190)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:8194](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8194)

Batch operation item search request.

#### Type Declaration

##### filter?

```ts
optional filter: object;
```

Batch operation item filter request.

###### filter.batchOperationKey?

```ts
optional batchOperationKey: BasicStringFilterProperty;
```

The key (or operate legacy ID) of the batch operation.

###### filter.itemKey?

```ts
optional itemKey: BasicStringFilterProperty;
```

The key of the item, e.g. a process instance key.

###### filter.operationType?

```ts
optional operationType: BatchOperationTypeFilterProperty;
```

The type of the batch operation.

###### filter.processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

The process instance key of the processed item.

###### filter.state?

```ts
optional state: BatchOperationItemStateFilterProperty;
```

The state of the batch operation.

##### sort?

```ts
optional sort: BatchOperationItemSearchQuerySortRequest[];
```

Sort field criteria.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:8225](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8225)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:8226](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8226)

---

### url

```ts
url: "/batch-operation-items/search";
```

Defined in: [gen/types.gen.ts:8227](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8227)
