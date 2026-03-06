---
title: "Type Alias: GetProcessInstanceCallHierarchyErrors"
sidebar_label: "GetProcessInstanceCallHierarchyErrors"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceCallHierarchyErrors

```ts
type GetProcessInstanceCallHierarchyErrors = object;
```

Defined in: [gen/types.gen.ts:13084](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13084)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13088](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13088)

The provided data is not valid.

***

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13092](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13092)

The request lacks valid authentication credentials.

***

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13096](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13096)

Forbidden. The request is not allowed.

***

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13100](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13100)

The process instance is not found.

***

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13104](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13104)

An internal error occurred while processing the request.
