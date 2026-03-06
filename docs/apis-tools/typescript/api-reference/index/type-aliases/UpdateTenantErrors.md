---
title: "Type Alias: UpdateTenantErrors"
sidebar_label: "UpdateTenantErrors"
mdx:
  format: md
---

# Type Alias: UpdateTenantErrors

```ts
type UpdateTenantErrors = object;
```

Defined in: [gen/types.gen.ts:14806](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14806)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14810](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14810)

The provided data is not valid.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14814](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14814)

Forbidden. The request is not allowed.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14818](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14818)

Not found. The tenant was not found.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14822](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14822)

An internal error occurred while processing the request.

***

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14827](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14827)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
