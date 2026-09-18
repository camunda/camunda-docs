---
title: "Type Alias: DeleteGlobalClusterVariableErrors"
sidebar_label: "DeleteGlobalClusterVariableErrors"
mdx:
  format: md
---

# Type Alias: DeleteGlobalClusterVariableErrors

```ts
type DeleteGlobalClusterVariableErrors = object;
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

Cluster variable not found

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
