---
title: "Type Alias: ResolveIncidentsBatchOperationErrors"
sidebar_label: "ResolveIncidentsBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: ResolveIncidentsBatchOperationErrors

```ts
type ResolveIncidentsBatchOperationErrors = object;
```

Defined in: [gen/types.gen.ts:13081](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13081)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13086](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13086)

The process instance batch operation failed. More details are provided in the response body.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13090](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13090)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13094](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13094)

Forbidden. The request is not allowed.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13098](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13098)

An internal error occurred while processing the request.
