---
title: "Type Alias: TakeHistoryBackupAsClusterAdminErrors"
sidebar_label: "TakeHistoryBackupAsClusterAdminErrors"
mdx:
  format: md
---

# Type Alias: TakeHistoryBackupAsClusterAdminErrors

```ts
type TakeHistoryBackupAsClusterAdminErrors = object;
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

The cluster's secondary storage is neither Elasticsearch nor OpenSearch and therefore cannot serve history backups, or a targeted physical tenant's snapshot repository is absent from the store — configured under a name the store does not have, or not configured at all. Both are deployment faults the caller cannot correct by changing its request; narrow the request with `physicalTenantId` to work with the tenants whose repository is usable. Unlike the per-physical-tenant backup endpoints, the cluster-admin surface performs no fine-grained authorization, so a missing `BACKUP` permission is never the reason.

---

### 404

```ts
404: ProblemDetail;
```

The requested `physicalTenantId` does not exist in this cluster.

---

### 409

```ts
409: ProblemDetail;
```

At least one targeted physical tenant already holds a backup with this id, or already has another backup running. The check that precedes the fan-out normally rejects the request before anything is scheduled; a tenant that takes the id in between rejects it during the fan-out instead, which can leave snapshots behind on the tenants already reached, so delete this backup id before retrying.

---

### 500

```ts
500: ProblemDetail;
```

The backup could not be scheduled on every targeted physical tenant, because one of them hit an internal error. The check that precedes the fan-out rejects the request before anything is scheduled, but a failure during the fan-out itself can leave snapshots behind on the tenants already reached, so delete this backup id before retrying.

---

### 503

```ts
503: ProblemDetail;
```

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
