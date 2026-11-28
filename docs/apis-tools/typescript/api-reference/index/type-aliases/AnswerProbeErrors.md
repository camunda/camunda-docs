---
title: "Type Alias: AnswerProbeErrors"
sidebar_label: "AnswerProbeErrors"
mdx:
  format: md
---

# Type Alias: AnswerProbeErrors

```ts
type AnswerProbeErrors = object;
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

The probe with the given key is not found: it ended already, its deadline passed, or it belongs to a tenant the caller is not assigned to.

---

### 409

```ts
409: ProblemDetail;
```

The probe with the given key is not activated: no worker collected it, or it waits for the values of its secrets.

---

### 413

```ts
413: ProblemDetail;
```

The answer is too large to be written to the log. The title is `PAYLOAD_TOO_LARGE`.
Answer with a short `ERROR` instead, so that the client does not wait for the deadline.

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
