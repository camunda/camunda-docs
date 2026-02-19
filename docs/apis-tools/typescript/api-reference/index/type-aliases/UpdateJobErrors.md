---
title: "Type Alias: UpdateJobErrors"
sidebar_label: "UpdateJobErrors"
mdx:
  format: md
---

# Type Alias: UpdateJobErrors

```ts
type UpdateJobErrors = object;
```

Defined in: [gen/types.gen.ts:11950](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11950)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11954](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11954)

The provided data is not valid.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11958](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11958)

The job with the jobKey is not found.

---

### 409

```ts
409: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11963](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11963)

The job with the given key is in the wrong state currently. More details are provided in the response body.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11967](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11967)

An internal error occurred while processing the request.

---

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11972](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11972)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
