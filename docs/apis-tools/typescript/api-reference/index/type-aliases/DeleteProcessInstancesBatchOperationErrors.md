---
title: "Type Alias: DeleteProcessInstancesBatchOperationErrors"
sidebar_label: "DeleteProcessInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: DeleteProcessInstancesBatchOperationErrors

```ts
type DeleteProcessInstancesBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:13444](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13444)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13449](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13449)

The process instance batch operation failed. More details are provided in the response body.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13453](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13453)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13457](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13457)

Forbidden. The request is not allowed.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13461](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13461)

An internal error occurred while processing the request.
