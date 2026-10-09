---
title: "Type Alias: SyncRuntimeBackupStateErrors"
sidebar_label: "SyncRuntimeBackupStateErrors"
mdx:
  format: md
---

# Type Alias: SyncRuntimeBackupStateErrors

```ts
type SyncRuntimeBackupStateErrors = object;
```

## Properties

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

The request from gateway to broker timed out.
