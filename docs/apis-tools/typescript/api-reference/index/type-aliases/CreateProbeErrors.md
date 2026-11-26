---
title: "Type Alias: CreateProbeErrors"
sidebar_label: "CreateProbeErrors"
mdx:
  format: md
---

# Type Alias: CreateProbeErrors

```ts
type CreateProbeErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The request is invalid, or the probe ended because of its secrets.

The title of the problem tells the two apart:

- `INVALID_ARGUMENT`: the body is invalid, for example a blank input, a probe ID that is
  not valid, a `requestTimeout` out of range, or an input that is not a valid
  expression or does not evaluate to a context.
- `SECRET_RESOLUTION_ERROR`: a secret that the input references could not be resolved,
  or its value could not be injected into the input.

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

No worker collected the probe before its deadline: no worker polls this probe ID, or
the workers that poll it lack the `ANSWER` permission on it. The title is `NO_WORKER`.

---

### 413

```ts
413: ProblemDetail;
```

The request is too large to be written to the log. The title is `PAYLOAD_TOO_LARGE`.

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

The probe got no answer in time.

The title of the problem tells why:

- `WORKER_DID_NOT_ANSWER`: a worker collected the probe but did not answer before its
  deadline.
- `SECRET_RESOLUTION_TIMEOUT`: the probe still waited for the values of its secrets at
  its deadline.
- `DEADLINE_EXCEEDED`: the gateway timed out before the engine answered, for example
  after a leader change.
