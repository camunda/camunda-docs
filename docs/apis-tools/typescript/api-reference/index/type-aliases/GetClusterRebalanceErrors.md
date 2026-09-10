---
title: "Type Alias: GetClusterRebalanceErrors"
sidebar_label: "GetClusterRebalanceErrors"
mdx:
  format: md
---

# Type Alias: GetClusterRebalanceErrors

```ts
type GetClusterRebalanceErrors = object;
```

## Properties

### 401

```ts
401: ProblemDetail;
```

The request lacks valid authentication credentials.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.

---

### 502

```ts
502: ProblemDetail;
```

The coordinator was reached, but its response was absent or unusable.

---

### 503

```ts
503: ProblemDetail;
```

No coordinator is currently available or reachable.

---

### 504

```ts
504: ProblemDetail;
```

The coordinator did not answer before the request timeout.
