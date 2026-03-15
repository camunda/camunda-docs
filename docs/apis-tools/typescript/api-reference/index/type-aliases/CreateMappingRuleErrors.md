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

Defined in: [gen/types.gen.ts:12250](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12250)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12254](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12254)

The provided data is not valid.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12260](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12260)

The request to create a mapping rule was denied.
More details are provided in the response body.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12264](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12264)

The request to create a mapping rule was denied.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12268](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12268)

An internal error occurred while processing the request.
