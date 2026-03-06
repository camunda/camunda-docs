---
title: "Type Alias: CreateMappingRuleErrors"
sidebar_label: "CreateMappingRuleErrors"
mdx:
  format: md
---

# Type Alias: CreateMappingRuleErrors

```ts
type CreateMappingRuleErrors = object;
```

Defined in: [gen/types.gen.ts:12099](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12099)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12103](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12103)

The provided data is not valid.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12109](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12109)

The request to create a mapping rule was denied.
More details are provided in the response body.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12113](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12113)

The request to create a mapping rule was denied.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12117](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12117)

An internal error occurred while processing the request.
