---
title: "Type Alias: DeleteProcessInstancesBatchOperationErrors"
sidebar_label: "DeleteProcessInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: DeleteProcessInstancesBatchOperationErrors

```ts
type DeleteProcessInstancesBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:12844](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12844)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12849](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12849)

The process instance batch operation failed. More details are provided in the response body.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12853](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12853)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12857](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12857)

Forbidden. The request is not allowed.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12861](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12861)

An internal error occurred while processing the request.
