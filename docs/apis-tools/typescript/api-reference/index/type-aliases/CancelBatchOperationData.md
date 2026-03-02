---
title: "Type Alias: CancelBatchOperationData"
sidebar_label: "CancelBatchOperationData"
mdx:
  format: md
---

# Type Alias: CancelBatchOperationData

```ts
type CancelBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:8384](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8384)

## Properties

### body?

```ts
optional body: unknown;
```

Defined in: [gen/types.gen.ts:8385](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8385)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8386](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8386)

#### batchOperationKey

```ts
batchOperationKey: BatchOperationKey;
```

The key (or operate legacy ID) of the batch operation.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:8392](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8392)

---

### url

```ts
url: "/batch-operations/{batchOperationKey}/cancellation";
```

Defined in: [gen/types.gen.ts:8393](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8393)
