---
title: "Type Alias: ResolveIncidentErrors"
sidebar_label: "ResolveIncidentErrors"
mdx:
  format: md
---

# Type Alias: ResolveIncidentErrors

```ts
type ResolveIncidentErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The provided data is not valid.

---

### 404

```ts
404: ProblemDetail;
```

The incident with the incidentKey is not found.

---

### 409

```ts
409: ProblemDetail;
```

The incident cannot be resolved due to an invalid state.
For example, the associated job may have no retries left.

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
