---
title: "Type Alias: GetMappingRuleErrors"
sidebar_label: "GetMappingRuleErrors"
mdx:
  format: md
---

# Type Alias: GetMappingRuleErrors

```ts
type GetMappingRuleErrors = object;
```

Defined in: [gen/types.gen.ts:12228](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12228)

## Properties

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12232](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12232)

The request lacks valid authentication credentials.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12236](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12236)

The mapping rule with the mappingRuleId was not found.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12240](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12240)

An internal error occurred while processing the request.
