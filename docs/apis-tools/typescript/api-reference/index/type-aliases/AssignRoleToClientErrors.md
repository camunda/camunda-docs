---
title: "Type Alias: AssignRoleToClientErrors"
sidebar_label: "AssignRoleToClientErrors"
mdx:
  format: md
---

# Type Alias: AssignRoleToClientErrors

```ts
type AssignRoleToClientErrors = object;
```

Defined in: [gen/types.gen.ts:13943](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13943)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13947](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13947)

The provided data is not valid.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13951](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13951)

Forbidden. The request is not allowed.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13955](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13955)

The role with the given ID was not found.

***

### 409

```ts
409: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13959](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13959)

The role was already assigned to the client with the given ID.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13963](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13963)

An internal error occurred while processing the request.

***

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13968](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13968)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
