---
title: "Type Alias: MigrateProcessInstanceErrors"
sidebar_label: "MigrateProcessInstanceErrors"
mdx:
  format: md
---

# Type Alias: MigrateProcessInstanceErrors

```ts
type MigrateProcessInstanceErrors = object;
```

Defined in: [gen/types.gen.ts:14189](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14189)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14193](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14193)

The provided data is not valid.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14197](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14197)

The process instance is not found.

---

### 409

```ts
409: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14202](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14202)

The process instance migration failed. More details are provided in the response body.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14206](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14206)

An internal error occurred while processing the request.

---

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14211](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14211)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
