---
title: "Type Alias: CancelProcessInstancesBatchOperationErrors"
sidebar_label: "CancelProcessInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: CancelProcessInstancesBatchOperationErrors

```ts
type CancelProcessInstancesBatchOperationErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The process instance batch operation failed, for example because the filter requests a top-level `state` other than ACTIVE or SUSPENDED through `$eq` or `$in`. States inside `$or` branches are not validated. More details are provided in the response body.

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

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
