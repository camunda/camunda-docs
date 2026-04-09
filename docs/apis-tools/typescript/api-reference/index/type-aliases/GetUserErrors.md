---
title: "Type Alias: GetUserErrors"
sidebar_label: "GetUserErrors"
mdx:
  format: md
---

# Type Alias: GetUserErrors

```ts
type GetUserErrors = object;
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
404: ProblemDetail;
```

The user with the given username was not found.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
