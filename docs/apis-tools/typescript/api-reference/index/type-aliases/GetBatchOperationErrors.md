---
title: "Type Alias: GetBatchOperationErrors"
sidebar_label: "GetBatchOperationErrors"
mdx:
  format: md
---

# Type Alias: GetBatchOperationErrors

```ts
type GetBatchOperationErrors = object;
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

The batch operation is not found.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
