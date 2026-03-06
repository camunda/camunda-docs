---
title: "Type Alias: SearchGlobalTaskListenersErrors"
sidebar_label: "SearchGlobalTaskListenersErrors"
mdx:
  format: md
---

# Type Alias: SearchGlobalTaskListenersErrors

```ts
type SearchGlobalTaskListenersErrors = object;
```

Defined in: [gen/types.gen.ts:10638](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10638)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10642](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10642)

The provided data is not valid.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10646](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10646)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10650](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10650)

Forbidden. The request is not allowed.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10654](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10654)

An internal error occurred while processing the request.
