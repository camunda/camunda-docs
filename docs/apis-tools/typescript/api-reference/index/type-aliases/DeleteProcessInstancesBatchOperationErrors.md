---
title: "Type Alias: DeleteProcessInstancesBatchOperationErrors"
sidebar_label: "DeleteProcessInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: DeleteProcessInstancesBatchOperationErrors

```ts
type DeleteProcessInstancesBatchOperationErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The process instance batch operation failed. More details are provided in the response body.

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
