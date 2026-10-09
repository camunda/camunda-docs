---
title: "Type Alias: RestoreAsClusterAdminErrors"
sidebar_label: "RestoreAsClusterAdminErrors"
mdx:
  format: md
---

# Type Alias: RestoreAsClusterAdminErrors

```ts
type RestoreAsClusterAdminErrors = object;
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

### 404

```ts
404: ProblemDetail;
```

The requested `physicalTenantId`, or a physical tenant named in `overrides`, does not exist in this cluster.

---

### 409

```ts
409: unknown;
```

A targeted physical tenant is not in recovery mode, so the restore cannot be accepted.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
