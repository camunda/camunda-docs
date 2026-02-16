---
title: "Type Alias: MigrateProcessInstancesBatchOperationErrors"
sidebar_label: "MigrateProcessInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: MigrateProcessInstancesBatchOperationErrors

```ts
type MigrateProcessInstancesBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:13539](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13539)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13544](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13544)

The process instance batch operation failed. More details are provided in the response body.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13548](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13548)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13552](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13552)

Forbidden. The request is not allowed.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13556](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13556)

An internal error occurred while processing the request.
