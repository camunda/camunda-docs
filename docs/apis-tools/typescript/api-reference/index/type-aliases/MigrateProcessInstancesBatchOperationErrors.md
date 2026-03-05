---
title: "Type Alias: MigrateProcessInstancesBatchOperationErrors"
sidebar_label: "MigrateProcessInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: MigrateProcessInstancesBatchOperationErrors

```ts
type MigrateProcessInstancesBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:12920](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12920)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12925](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12925)

The process instance batch operation failed. More details are provided in the response body.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12929](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12929)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12933](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12933)

Forbidden. The request is not allowed.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12937](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12937)

An internal error occurred while processing the request.
