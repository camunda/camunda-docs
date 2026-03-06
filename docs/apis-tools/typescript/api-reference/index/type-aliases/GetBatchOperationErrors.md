---
title: "Type Alias: GetBatchOperationErrors"
sidebar_label: "GetBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: GetBatchOperationErrors

```ts
type GetBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:8738](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8738)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8742](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8742)

The provided data is not valid.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8746](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8746)

The batch operation is not found.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8750](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8750)

An internal error occurred while processing the request.
