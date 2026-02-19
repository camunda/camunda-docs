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

Defined in: [gen/types.gen.ts:861](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L861)

## Properties

### batchOperationKey?

```ts
optional batchOperationKey: BatchOperationKey;
```

Defined in: [gen/types.gen.ts:866](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L866)

The key (or operate legacy ID) of the batch operation.

---

### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [gen/types.gen.ts:887](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L887)

the error message from the engine in case of a failed operation.

---

### itemKey?

```ts
optional itemKey: string;
```

Defined in: [gen/types.gen.ts:870](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L870)

Key of the item, e.g. a process instance key.

---

### operationType?

```ts
optional operationType: BatchOperationTypeEnum;
```

Defined in: [gen/types.gen.ts:862](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L862)

---

### processedDate?

```ts
optional processedDate: string;
```

Defined in: [gen/types.gen.ts:883](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L883)

the date this item was processed.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:874](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L874)

the process instance key of the processed item.

---

### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: RootProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:875](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L875)

---

### state?

```ts
optional state: "ACTIVE" | "COMPLETED" | "SKIPPED" | "CANCELED" | "FAILED";
```

Defined in: [gen/types.gen.ts:879](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L879)

State of the item.
