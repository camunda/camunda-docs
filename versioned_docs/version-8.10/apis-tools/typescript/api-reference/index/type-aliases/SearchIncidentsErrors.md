---
title: "Type Alias: SearchIncidentsErrors"
sidebar_label: "SearchIncidentsErrors"
mdx:
  format: md
---

# Type Alias: SearchIncidentsErrors

```ts
type SearchIncidentsErrors = object;
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
