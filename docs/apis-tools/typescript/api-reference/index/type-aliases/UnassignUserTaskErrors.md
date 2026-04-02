---
title: "Type Alias: UnassignUserTaskErrors"
sidebar_label: "UnassignUserTaskErrors"
mdx:
  format: md
---

# Type Alias: UnassignUserTaskErrors

```ts
type UnassignUserTaskErrors = object;
```

Defined in: [gen/types.gen.ts:16167](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16167)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16171](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16171)

The provided data is not valid.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16175](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16175)

The user task with the given key was not found.

---

### 409

```ts
409: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16180](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16180)

The user task with the given key is in the wrong state currently. More details are provided in the response body.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16184](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16184)

An internal error occurred while processing the request.

---

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16189](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16189)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .

---

### 504

```ts
504: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16195](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16195)

The request timed out between the gateway and the broker. For these endpoints, this often happens when user task listeners are configured and the corresponding listener job is not completed within the request timeout. Common causes include no available job workers for the listener type, busy or crashed job workers, or delayed job completion. As with any gateway timeout, general timeout causes (for example transient network issues) can also result in a 504 response.
Troubleshooting: - verify that job workers for the listener type are running and healthy - check worker logs for crashes, retries, and completion failures - check network connectivity between workers, gateway, and broker - retry with backoff after transient failures - fail without retries if a problem persists
