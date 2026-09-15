---
title: "Type Alias: DeleteRuntimeBackupStateAsClusterAdminErrors"
sidebar_label: "DeleteRuntimeBackupStateAsClusterAdminErrors"
mdx:
  format: md
---

# Type Alias: DeleteRuntimeBackupStateAsClusterAdminErrors

```ts
type DeleteRuntimeBackupStateAsClusterAdminErrors = object;
```

## Properties

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

### 500

```ts
500: ProblemDetail;
```

The state could not be reset on every targeted physical tenant, so it may still be set on some of them. The resets that already succeeded are not undone, so a retry has only the remaining tenants left to reach.

---

### 503

```ts
503: ProblemDetail;
```

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
