---
title: "Type Alias: ModifyProcessInstancesBatchOperationErrors"
sidebar_label: "ModifyProcessInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: ModifyProcessInstancesBatchOperationErrors

```ts
type ModifyProcessInstancesBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:13592](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13592)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13597](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13597)

The process instance batch operation failed. More details are provided in the response body.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13601](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13601)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13605](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13605)

Forbidden. The request is not allowed.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13609](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13609)

An internal error occurred while processing the request.
