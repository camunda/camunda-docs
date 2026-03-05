---
title: "Type Alias: ModifyProcessInstancesBatchOperationErrors"
sidebar_label: "ModifyProcessInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: ModifyProcessInstancesBatchOperationErrors

```ts
type ModifyProcessInstancesBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:12958](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12958)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12963](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12963)

The process instance batch operation failed. More details are provided in the response body.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12967](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12967)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12971](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12971)

Forbidden. The request is not allowed.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12975](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12975)

An internal error occurred while processing the request.
