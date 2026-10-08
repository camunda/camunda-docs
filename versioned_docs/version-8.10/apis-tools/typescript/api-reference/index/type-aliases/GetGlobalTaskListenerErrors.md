---
title: "Type Alias: GetGlobalTaskListenerErrors"
sidebar_label: "GetGlobalTaskListenerErrors"
mdx:
  format: md
---

# Type Alias: GetGlobalTaskListenerErrors

```ts
type GetGlobalTaskListenerErrors = object;
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

The global user task listener with the given id was not found.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
