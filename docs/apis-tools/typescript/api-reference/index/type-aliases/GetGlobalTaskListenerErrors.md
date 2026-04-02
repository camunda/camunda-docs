---
title: "Type Alias: GetGlobalTaskListenerErrors"
sidebar_label: "GetGlobalTaskListenerErrors"
mdx:
  format: md
---

# Type Alias: GetGlobalTaskListenerErrors

```ts
type GetGlobalTaskListenerErrors = object;
```

Defined in: [gen/types.gen.ts:10699](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10699)

## Properties

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10703](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10703)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10707](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10707)

Forbidden. The request is not allowed.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10711](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10711)

The global user task listener with the given id was not found.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10715](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10715)

An internal error occurred while processing the request.
