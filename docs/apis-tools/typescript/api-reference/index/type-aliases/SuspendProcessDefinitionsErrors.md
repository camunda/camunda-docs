---
title: "Type Alias: SuspendProcessDefinitionsErrors"
sidebar_label: "SuspendProcessDefinitionsErrors"
mdx:
  format: md
---

# Type Alias: SuspendProcessDefinitionsErrors

```ts
type SuspendProcessDefinitionsErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The provided data is not valid.

---

### 401

```ts
401: ProblemDetail;
```

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Forbidden. The request is not allowed.

---

### 404

```ts
404: ProblemDetail;
```

No process definition matches the request.

---

### 409

```ts
409: ProblemDetail;
```

The request conflicts with the current state of the process definition, likely because
the process definition is in a state that cannot be suspended.
More details are provided in the response body.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.

---

### 503

```ts
503: ProblemDetail;
```

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
