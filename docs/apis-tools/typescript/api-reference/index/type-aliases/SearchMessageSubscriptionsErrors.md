---
title: "Type Alias: SearchMessageSubscriptionsErrors"
sidebar_label: "SearchMessageSubscriptionsErrors"
mdx:
  format: md
---

# Type Alias: SearchMessageSubscriptionsErrors

```ts
type SearchMessageSubscriptionsErrors = object;
```

Defined in: [gen/types.gen.ts:12310](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12310)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12314](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12314)

The provided data is not valid.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12318](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12318)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12322](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12322)

Forbidden. The request is not allowed.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12326](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12326)

An internal error occurred while processing the request.
