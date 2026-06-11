---
title: "Type Alias: GetJobErrorStatisticsErrors"
sidebar_label: "GetJobErrorStatisticsErrors"
mdx:
  format: md
---

# Type Alias: GetJobErrorStatisticsErrors

```ts
type GetJobErrorStatisticsErrors = object;
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
