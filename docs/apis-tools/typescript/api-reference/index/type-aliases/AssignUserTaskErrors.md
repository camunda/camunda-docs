---
title: "Type Alias: AssignUserTaskErrors"
sidebar_label: "AssignUserTaskErrors"
mdx:
  format: md
---

# Type Alias: AssignUserTaskErrors

```ts
type AssignUserTaskErrors = object;
```

Defined in: [gen/types.gen.ts:15975](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15975)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15979](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15979)

The provided data is not valid.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15983](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15983)

The user task with the given key was not found.

***

### 409

```ts
409: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15988](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15988)

The user task with the given key is in the wrong state currently. More details are provided in the response body.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15992](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15992)

An internal error occurred while processing the request.

***

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15997](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15997)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
