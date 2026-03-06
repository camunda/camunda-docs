---
title: "Type Alias: GetTenantClusterVariableErrors"
sidebar_label: "GetTenantClusterVariableErrors"
mdx:
  format: md
---

# Type Alias: GetTenantClusterVariableErrors

```ts
type GetTenantClusterVariableErrors = object;
```

Defined in: [gen/types.gen.ts:9289](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9289)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9293](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9293)

The provided data is not valid.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9297](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9297)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9301](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9301)

Forbidden. The request is not allowed.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9305](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9305)

Cluster variable not found

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9309](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9309)

An internal error occurred while processing the request.
