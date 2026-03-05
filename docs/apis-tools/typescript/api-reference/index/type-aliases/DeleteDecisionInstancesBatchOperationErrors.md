---
title: "Type Alias: DeleteDecisionInstancesBatchOperationErrors"
sidebar_label: "DeleteDecisionInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: DeleteDecisionInstancesBatchOperationErrors

```ts
type DeleteDecisionInstancesBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:9764](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9764)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9769](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9769)

The decision instance batch operation failed. More details are provided in the response body.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9773](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9773)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9777](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9777)

Forbidden. The request is not allowed.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9781](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9781)

An internal error occurred while processing the request.
