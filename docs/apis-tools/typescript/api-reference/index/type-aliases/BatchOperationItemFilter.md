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

Defined in: [gen/types.gen.ts:831](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L831)

Batch operation item filter request.

## Properties

### batchOperationKey?

```ts
optional batchOperationKey: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:835](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L835)

The key (or operate legacy ID) of the batch operation.

---

### itemKey?

```ts
optional itemKey: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:839](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L839)

The key of the item, e.g. a process instance key.

---

### operationType?

```ts
optional operationType: BatchOperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:851](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L851)

The type of the batch operation.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:843](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L843)

The process instance key of the processed item.

---

### state?

```ts
optional state: BatchOperationItemStateFilterProperty;
```

Defined in: [gen/types.gen.ts:847](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L847)

The state of the batch operation.
