---
title: "Type Alias: GetDecisionRequirementsErrors"
sidebar_label: "GetDecisionRequirementsErrors"
mdx:
  format: md
---

# Type Alias: GetDecisionRequirementsErrors

```ts
type GetDecisionRequirementsErrors = object;
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

The decision requirements with the given key was not found. More details are provided in the response body.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
