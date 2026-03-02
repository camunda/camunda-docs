---
title: "Type Alias: EvaluateConditionalsErrors"
sidebar_label: "EvaluateConditionalsErrors"
mdx:
  format: md
---

# Type Alias: EvaluateConditionalsErrors

```ts
type EvaluateConditionalsErrors = object;
```

Defined in: [gen/types.gen.ts:9066](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9066)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9070](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9070)

The provided data is not valid.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9077](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9077)

The client is not authorized to start process instances for the specified process definition.
If a processDefinitionKey is not provided, this indicates that the client is not authorized
to start process instances for at least one of the matched process definitions.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9081](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9081)

The process definition was not found for the given processDefinitionKey.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9085](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9085)

An internal error occurred while processing the request.

---

### 503

```ts
503: ProblemDetail;
```

Defined in: [gen/types.gen.ts:9090](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9090)

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
