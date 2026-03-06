---
title: "Type Alias: CompleteJobErrors"
sidebar_label: "CompleteJobErrors"
mdx:
  format: md
---

# Type Alias: CompleteJobErrors

```ts
type CompleteJobErrors = object;
```

Defined in: [gen/types.gen.ts:11770](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11770)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11774](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11774)

The provided data is not valid.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11778](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11778)

The job with the given key was not found.

***

### 409

```ts
409: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11783](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11783)

The job with the given key is in the wrong state currently. More details are provided in the response body.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11787](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11787)

An internal error occurred while processing the request.

***

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11792](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11792)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
