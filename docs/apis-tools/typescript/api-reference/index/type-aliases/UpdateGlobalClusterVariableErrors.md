---
title: "Type Alias: UpdateGlobalClusterVariableErrors"
sidebar_label: "UpdateGlobalClusterVariableErrors"
mdx:
  format: md
---

# Type Alias: UpdateGlobalClusterVariableErrors

```ts
type UpdateGlobalClusterVariableErrors = object;
```

Defined in: [gen/types.gen.ts:9105](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9105)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9109](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9109)

The provided data is not valid.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9113](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9113)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9117](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9117)

Forbidden. The request is not allowed.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9121](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9121)

Cluster variable not found

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9125](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9125)

An internal error occurred while processing the request.
