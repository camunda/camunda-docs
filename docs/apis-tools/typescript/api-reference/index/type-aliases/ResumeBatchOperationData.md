---
title: "Type Alias: ResumeBatchOperationData"
sidebar_label: "ResumeBatchOperationData"
mdx:
  format: md
---

# Type Alias: ResumeBatchOperationData

```ts
type ResumeBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:8426](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8426)

## Properties

### body?

```ts
optional body: unknown;
```

Defined in: [gen/types.gen.ts:8427](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8427)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8428](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8428)

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

Defined in: [gen/types.gen.ts:8434](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8434)

---

### url

```ts
url: "/batch-operations/{batchOperationKey}/resumption";
```

Defined in: [gen/types.gen.ts:8435](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8435)
