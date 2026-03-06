---
title: "Type Alias: SearchAuthorizationsErrors"
sidebar_label: "SearchAuthorizationsErrors"
mdx:
  format: md
---

# Type Alias: SearchAuthorizationsErrors

```ts
type SearchAuthorizationsErrors = object;
```

Defined in: [gen/types.gen.ts:8510](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8510)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8514](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8514)

The provided data is not valid.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8518](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8518)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8522](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8522)

Forbidden. The request is not allowed.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8526](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8526)

An internal error occurred while processing the request.
