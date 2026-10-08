---
title: "Type Alias: CancelBatchOperationErrors"
sidebar_label: "CancelBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: CancelBatchOperationErrors

```ts
type CancelBatchOperationErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The provided data is not valid.

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

Not found. The batch operation was not found.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
