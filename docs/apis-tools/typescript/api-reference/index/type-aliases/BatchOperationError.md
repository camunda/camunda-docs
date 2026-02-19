---
title: "Type Alias: BatchOperationError"
sidebar_label: "BatchOperationError"
mdx:
  format: md
---

# Type Alias: BatchOperationError

```ts
type BatchOperationError = object;
```

Defined in: [gen/types.gen.ts:791](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L791)

## Properties

### message?

```ts
optional message: string;
```

Defined in: [gen/types.gen.ts:803](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L803)

The error message that occurred during the batch operation.

---

### partitionId?

```ts
optional partitionId: number;
```

Defined in: [gen/types.gen.ts:795](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L795)

The partition ID where the error occurred.

---

### type?

```ts
optional type: "QUERY_FAILED" | "RESULT_BUFFER_SIZE_EXCEEDED";
```

Defined in: [gen/types.gen.ts:799](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L799)

The type of the error that occurred during the batch operation.
