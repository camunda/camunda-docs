---
title: "Type Alias: DeleteHistoryBackupErrors"
sidebar_label: "DeleteHistoryBackupErrors"
mdx:
  format: md
---

# Type Alias: DeleteHistoryBackupErrors

```ts
type DeleteHistoryBackupErrors = object;
```

## Properties

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

The request is forbidden for one of three reasons: the authenticated caller lacks the
required `BACKUP` permission; the cluster's secondary storage is neither Elasticsearch nor
OpenSearch and therefore cannot serve history backups; or the physical tenant's snapshot
repository is absent from the store — configured under a name the store does not have, or
not configured at all. The problem detail says which applies. The latter two are deployment
faults the caller cannot correct by changing its request.

---

### 404

```ts
404: ProblemDetail;
```

A backup with the given id does not exist.

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
