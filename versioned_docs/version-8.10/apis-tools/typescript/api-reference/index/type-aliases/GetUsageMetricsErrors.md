---
title: "Type Alias: GetUsageMetricsErrors"
sidebar_label: "GetUsageMetricsErrors"
mdx:
  format: md
---

# Type Alias: GetUsageMetricsErrors

```ts
type GetUsageMetricsErrors = object;
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

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
