---
title: "Type Alias: SuspendBatchOperationData"
sidebar_label: "SuspendBatchOperationData"
mdx:
  format: md
---

# Type Alias: SuspendBatchOperationData

```ts
type SuspendBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:8473](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8473)

## Properties

### body?

```ts
optional body: unknown;
```

Defined in: [gen/types.gen.ts:8474](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8474)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8475](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8475)

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

Defined in: [gen/types.gen.ts:8481](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8481)

---

### url

```ts
url: "/batch-operations/{batchOperationKey}/suspension";
```

Defined in: [gen/types.gen.ts:8482](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8482)
