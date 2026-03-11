---
title: "Type Alias: CancelBatchOperationErrors"
sidebar_label: "CancelBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: CancelBatchOperationErrors

```ts
type CancelBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:8396](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8396)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8400](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8400)

The provided data is not valid.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8404](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8404)

Forbidden. The request is not allowed.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8408](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8408)

Not found. The batch operation was not found.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8412](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8412)

An internal error occurred while processing the request.
