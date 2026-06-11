---
title: "Type Alias: CreateTenantClusterVariableErrors"
sidebar_label: "CreateTenantClusterVariableErrors"
mdx:
  format: md
---

# Type Alias: CreateTenantClusterVariableErrors

```ts
type CreateTenantClusterVariableErrors = object;
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

The tenant with the given ID was not found.

---

### 409

```ts
409: ProblemDetail;
```

A cluster variable with this name already exists for the given tenant.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
