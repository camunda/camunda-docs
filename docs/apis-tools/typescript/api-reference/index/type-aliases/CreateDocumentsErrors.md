---
title: "Type Alias: CreateDocumentsErrors"
sidebar_label: "CreateDocumentsErrors"
mdx:
  format: md
---

# Type Alias: CreateDocumentsErrors

```ts
type CreateDocumentsErrors = object;
```

Defined in: [gen/types.gen.ts:10143](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10143)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10147](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10147)

The provided data is not valid.

***

### 415

```ts
415: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10153](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10153)

The server cannot process the request because the media type (Content-Type) of the request payload is not supported
by the server for the requested resource and method.
