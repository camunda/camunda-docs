---
title: "Type Alias: GetRestoreStatusErrors"
sidebar_label: "GetRestoreStatusErrors"
mdx:
  format: md
---

# Type Alias: GetRestoreStatusErrors

```ts
type GetRestoreStatusErrors = object;
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

### 404

```ts
404: unknown;
```

No restore is currently in progress.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
