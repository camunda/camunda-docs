---
title: "Type Alias: DeleteDecisionInstancesBatchOperationErrors"
sidebar_label: "DeleteDecisionInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: DeleteDecisionInstancesBatchOperationErrors

```ts
type DeleteDecisionInstancesBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:9878](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9878)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9883](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9883)

The decision instance batch operation failed. More details are provided in the response body.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9887](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9887)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9891](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9891)

Forbidden. The request is not allowed.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9895](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9895)

An internal error occurred while processing the request.
