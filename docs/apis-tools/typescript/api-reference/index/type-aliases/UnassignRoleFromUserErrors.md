---
title: "Type Alias: UnassignRoleFromUserErrors"
sidebar_label: "UnassignRoleFromUserErrors"
mdx:
  format: md
---

# Type Alias: UnassignRoleFromUserErrors

```ts
type UnassignRoleFromUserErrors = object;
```

Defined in: [gen/types.gen.ts:15283](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15283)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15287](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15287)

The provided data is not valid.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15291](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15291)

Forbidden. The request is not allowed.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15295](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15295)

The role or user with the given ID or username was not found.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15299](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15299)

An internal error occurred while processing the request.

---

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15304](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15304)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
