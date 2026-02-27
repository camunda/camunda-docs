---
title: "Type Alias: CancelProcessInstancesBatchOperationErrors"
sidebar_label: "CancelProcessInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: CancelProcessInstancesBatchOperationErrors

```ts
type CancelProcessInstancesBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:13397](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13397)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13402](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13402)

The process instance batch operation failed. More details are provided in the response body.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13406](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13406)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13410](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13410)

Forbidden. The request is not allowed.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13414](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13414)

An internal error occurred while processing the request.
