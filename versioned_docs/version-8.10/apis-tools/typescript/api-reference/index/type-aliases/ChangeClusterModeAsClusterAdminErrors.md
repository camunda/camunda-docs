---
title: "Type Alias: ChangeClusterModeAsClusterAdminErrors"
sidebar_label: "ChangeClusterModeAsClusterAdminErrors"
mdx:
  format: md
---

# Type Alias: ChangeClusterModeAsClusterAdminErrors

```ts
type ChangeClusterModeAsClusterAdminErrors = object;
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

The requested `physicalTenantId` does not exist in this cluster.

---

### 409

```ts
409: unknown;
```

The mode change conflicts with the cluster state, for example because another configuration change is in progress.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
