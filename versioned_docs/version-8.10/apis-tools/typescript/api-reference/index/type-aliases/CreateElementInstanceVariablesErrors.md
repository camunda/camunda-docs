---
title: "Type Alias: CreateElementInstanceVariablesErrors"
sidebar_label: "CreateElementInstanceVariablesErrors"
mdx:
  format: md
---

# Type Alias: CreateElementInstanceVariablesErrors

```ts
type CreateElementInstanceVariablesErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The provided data is not valid.

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

---

### 504

```ts
504: ProblemDetail;
```

The request timed out between the gateway and the broker. For these endpoints, this often happens when user task listeners are configured and the corresponding listener job is not completed within the request timeout. Common causes include no available job workers for the listener type, busy or crashed job workers, or delayed job completion. As with any gateway timeout, general timeout causes (for example transient network issues) can also result in a 504 response.
Troubleshooting: - verify that job workers for the listener type are running and healthy - check worker logs for crashes, retries, and completion failures - check network connectivity between workers, gateway, and broker - retry with backoff after transient failures - fail without retries if a problem persists
