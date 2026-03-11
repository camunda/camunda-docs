---
title: "Type Alias: AssignUserToGroupErrors"
sidebar_label: "AssignUserToGroupErrors"
mdx:
  format: md
---

# Type Alias: AssignUserToGroupErrors

```ts
type AssignUserToGroupErrors = object;
```

Defined in: [gen/types.gen.ts:11333](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11333)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11337](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11337)

The provided data is not valid.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11341](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11341)

Forbidden. The request is not allowed.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11345](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11345)

The group or user with the given ID or username was not found.

---

### 409

```ts
409: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11349](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11349)

The user with the given ID is already assigned to the group.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11353](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11353)

An internal error occurred while processing the request.

---

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11358](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11358)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
