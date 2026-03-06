---
title: "Type Alias: GetProcessDefinitionErrors"
sidebar_label: "GetProcessDefinitionErrors"
mdx:
  format: md
---

# Type Alias: GetProcessDefinitionErrors

```ts
type GetProcessDefinitionErrors = object;
```

Defined in: [gen/types.gen.ts:12540](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12540)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12544](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12544)

The provided data is not valid.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12548](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12548)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12552](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12552)

Forbidden. The request is not allowed.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12557](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12557)

The process definition with the given key was not found. More details are provided in the response body.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12561](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12561)

An internal error occurred while processing the request.
