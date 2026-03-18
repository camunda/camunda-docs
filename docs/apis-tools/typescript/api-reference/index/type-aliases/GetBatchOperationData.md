---
title: "Type Alias: GetBatchOperationData"
sidebar_label: "GetBatchOperationData"
mdx:
  format: md
---

# Type Alias: GetBatchOperationData

```ts
type GetBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:8346](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8346)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:8347](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8347)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8348](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8348)

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

Defined in: [gen/types.gen.ts:8354](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8354)

---

### url

```ts
url: "/batch-operations/{batchOperationKey}";
```

Defined in: [gen/types.gen.ts:8355](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8355)
