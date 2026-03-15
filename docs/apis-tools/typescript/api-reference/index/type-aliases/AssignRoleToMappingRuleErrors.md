---
title: "Type Alias: AssignRoleToMappingRuleErrors"
sidebar_label: "AssignRoleToMappingRuleErrors"
mdx:
  format: md
---

# Type Alias: AssignRoleToMappingRuleErrors

```ts
type AssignRoleToMappingRuleErrors = object;
```

Defined in: [gen/types.gen.ts:14403](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14403)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14407](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14407)

The provided data is not valid.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14411](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14411)

Forbidden. The request is not allowed.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14415](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14415)

The role or mapping rule with the given ID was not found.

***

### 409

```ts
409: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14419](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14419)

The role is already assigned to the mapping rule with the given ID.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14423](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14423)

An internal error occurred while processing the request.

***

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14428](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14428)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
