---
title: "Type Alias: UnassignMappingRuleFromTenantErrors"
sidebar_label: "UnassignMappingRuleFromTenantErrors"
mdx:
  format: md
---

# Type Alias: UnassignMappingRuleFromTenantErrors

```ts
type UnassignMappingRuleFromTenantErrors = object;
```

Defined in: [gen/types.gen.ts:15150](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15150)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15154](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15154)

The provided data is not valid.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15158](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15158)

Forbidden. The request is not allowed.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15162](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15162)

Not found. The tenant or mapping rule was not found.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15166](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15166)

An internal error occurred while processing the request.

***

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:15171](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15171)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
