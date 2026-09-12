---
title: "Type Alias: GetHistoryBackupAsClusterAdminErrors"
sidebar_label: "GetHistoryBackupAsClusterAdminErrors"
mdx:
  format: md
---

# Type Alias: GetHistoryBackupAsClusterAdminErrors

```ts
type GetHistoryBackupAsClusterAdminErrors = object;
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

The requested `physicalTenantId` does not exist in this cluster, or every targeted physical tenant was read and none of them holds a backup with the given id.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.

---

### 503

```ts
503: ProblemDetail;
```

The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains `RESOURCE_EXHAUSTED`. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: https://docs.camunda.io/docs/components/zeebe/technical-concepts/internal-processing/#handling-backpressure .
