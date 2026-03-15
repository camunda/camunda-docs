---
title: "Type Alias: GetAuthenticationErrors"
sidebar_label: "GetAuthenticationErrors"
mdx:
  format: md
---

# Type Alias: GetAuthenticationErrors

```ts
type GetAuthenticationErrors = object;
```

Defined in: [gen/types.gen.ts:8545](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8545)

## Properties

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8549](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8549)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8553](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8553)

Forbidden. The request is not allowed.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8557](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8557)

An internal error occurred while processing the request.
