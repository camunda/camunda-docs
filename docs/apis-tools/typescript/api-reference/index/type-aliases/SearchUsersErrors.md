---
title: "Type Alias: SearchUsersErrors"
sidebar_label: "SearchUsersErrors"
mdx:
  format: md
---

# Type Alias: SearchUsersErrors

```ts
type SearchUsersErrors = object;
```

Defined in: [gen/types.gen.ts:15587](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15587)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15591](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15591)

The provided data is not valid.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15595](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15595)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15599](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15599)

Forbidden. The request is not allowed.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15603](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15603)

An internal error occurred while processing the request.
