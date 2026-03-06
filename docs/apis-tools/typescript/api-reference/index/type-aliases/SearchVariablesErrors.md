---
title: "Type Alias: SearchVariablesErrors"
sidebar_label: "SearchVariablesErrors"
mdx:
  format: md
---

# Type Alias: SearchVariablesErrors

```ts
type SearchVariablesErrors = object;
```

Defined in: [gen/types.gen.ts:16230](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16230)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16234](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16234)

The provided data is not valid.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16238](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16238)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16242](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16242)

Forbidden. The request is not allowed.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16246](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16246)

An internal error occurred while processing the request.
