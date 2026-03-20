---
title: "Type Alias: CreateProcessInstanceErrors"
sidebar_label: "CreateProcessInstanceErrors"
mdx:
  format: md
---

# Type Alias: CreateProcessInstanceErrors

```ts
type CreateProcessInstanceErrors = object;
```

Defined in: [gen/types.gen.ts:13346](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13346)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13350](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13350)

The provided data is not valid.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13354](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13354)

An internal error occurred while processing the request.

---

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13359](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13359)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .

---

### 504

```ts
504: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13367](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13367)

The process instance creation request timed out in the gateway.
This can happen if the `awaitCompletion` request parameter is set to `true`
and the created process instance did not complete within the defined request timeout.
This often happens when the created instance is not fully automated or contains wait states.
