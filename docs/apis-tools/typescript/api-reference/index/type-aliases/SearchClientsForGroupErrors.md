---
title: "Type Alias: SearchClientsForGroupErrors"
sidebar_label: "SearchClientsForGroupErrors"
mdx:
  format: md
---

# Type Alias: SearchClientsForGroupErrors

```ts
type SearchClientsForGroupErrors = object;
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

The group with the given ID was not found.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
