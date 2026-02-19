---
title: "Type Alias: GetBatchOperationErrors"
sidebar_label: "GetBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: GetBatchOperationErrors

```ts
type GetBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:8358](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8358)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8362](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8362)

The provided data is not valid.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8366](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8366)

The batch operation is not found.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8370](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8370)

An internal error occurred while processing the request.
