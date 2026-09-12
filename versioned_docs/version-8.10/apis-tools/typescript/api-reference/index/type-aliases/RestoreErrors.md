---
title: "Type Alias: RestoreErrors"
sidebar_label: "RestoreErrors"
mdx:
  format: md
---

# Type Alias: RestoreErrors

```ts
type RestoreErrors = object;
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

### 409

```ts
409: unknown;
```

The cluster is not in recovery mode, so the restore cannot be accepted.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
