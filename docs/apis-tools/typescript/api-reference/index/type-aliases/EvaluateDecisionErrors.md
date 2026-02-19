---
title: "Type Alias: EvaluateDecisionErrors"
sidebar_label: "EvaluateDecisionErrors"
mdx:
  format: md
---

# Type Alias: EvaluateDecisionErrors

```ts
type EvaluateDecisionErrors = object;
```

Defined in: [gen/types.gen.ts:9203](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9203)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9207](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9207)

The provided data is not valid.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9211](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9211)

The decision is not found.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9215](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9215)

An internal error occurred while processing the request.

---

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9220](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9220)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
