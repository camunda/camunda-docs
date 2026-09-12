---
title: "Type Alias: DeleteHistoryBackupAsClusterAdminErrors"
sidebar_label: "DeleteHistoryBackupAsClusterAdminErrors"
mdx:
  format: md
---

# Type Alias: DeleteHistoryBackupAsClusterAdminErrors

```ts
type DeleteHistoryBackupAsClusterAdminErrors = object;
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

The cluster's secondary storage cannot serve history backups, or a targeted physical tenant's snapshot repository is absent from the store. Unlike the per-physical-tenant backup endpoints, the cluster-admin surface performs no fine-grained authorization, so a missing `BACKUP` permission is never the reason. Deletion fans out with no preceding check, so an absent repository is found only once that tenant is reached, by which time the backup may already be deleted from the others; those deletions are not undone. Narrow the request with `physicalTenantId` to work with the tenants whose repository is usable.

---

### 404

```ts
404: ProblemDetail;
```

The requested `physicalTenantId` does not exist in this cluster, or every targeted physical tenant was reached and none of them holds a backup with the given id.

---

### 500

```ts
500: ProblemDetail;
```

The backup could not be deleted from every targeted physical tenant, because one of them hit an internal error, so it may still exist on some of them. The deletions that already succeeded are not undone, so a retry has only the remaining tenants left to reach.

---

### 503

```ts
503: ProblemDetail;
```

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
