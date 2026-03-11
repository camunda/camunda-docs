---
title: "Type Alias: ResumeBatchOperationErrors"
sidebar_label: "ResumeBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: ResumeBatchOperationErrors

```ts
type ResumeBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:8438](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8438)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8442](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8442)

The provided data is not valid.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8446](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8446)

Forbidden. The request is not allowed.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8450](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8450)

Not found. The batch operation was not found.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8454](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8454)

An internal error occurred while processing the request.

---

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8459](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8459)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
