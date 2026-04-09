---
title: "Type Alias: GetUserTaskErrors"
sidebar_label: "GetUserTaskErrors"
mdx:
  format: md
---

# Type Alias: GetUserTaskErrors

```ts
type GetUserTaskErrors = object;
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

The user task with the given key was not found.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
