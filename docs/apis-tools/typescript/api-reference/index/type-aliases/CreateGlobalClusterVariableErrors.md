---
title: "Type Alias: CreateGlobalClusterVariableErrors"
sidebar_label: "CreateGlobalClusterVariableErrors"
mdx:
  format: md
---

# Type Alias: CreateGlobalClusterVariableErrors

```ts
type CreateGlobalClusterVariableErrors = object;
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
409: ProblemDetail;
```

A cluster variable with this name already exists.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
