---
title: "Type Alias: DeleteDecisionInstancesBatchOperationErrors"
sidebar_label: "DeleteDecisionInstancesBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: DeleteDecisionInstancesBatchOperationErrors

```ts
type DeleteDecisionInstancesBatchOperationErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The decision instance batch operation failed. More details are provided in the response body.

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
