---
title: "Type Alias: TakeRuntimeBackupAsClusterAdminErrors"
sidebar_label: "TakeRuntimeBackupAsClusterAdminErrors"
mdx:
  format: md
---

# Type Alias: TakeRuntimeBackupAsClusterAdminErrors

```ts
type TakeRuntimeBackupAsClusterAdminErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The request names a `backupId` while at least one targeted physical tenant generates its own ids, or omits it while at least one does not, or the id is not a positive number. No tenant was triggered. A targeted tenant that rejects the request as invalid during the fan-out answers with the same status but the cluster body, listing the tenants that were triggered.

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

The requested `physicalTenantId` does not exist in this cluster, so no tenant was triggered.

---

### 409

```ts
409: ClusterTakeRuntimeBackupResponse;
```

At least one targeted physical tenant already holds a backup with this id or a higher one. Backups are triggered without a preceding check, so the tenants that accepted the id are listed in the body and keep running; delete them before retrying.

---

### 500

```ts
500: ClusterTakeRuntimeBackupResponse;
```

At least one targeted physical tenant could not be triggered, and the failures do not agree on a single status. The body lists the tenants that were triggered and keep running.

---

### 502

```ts
502: ClusterTakeRuntimeBackupResponse;
```

The connection to the broker was cut mid-flight on at least one targeted physical tenant, which may or may not have accepted the request. Those tenants are reported as `UNKNOWN` with the id to check them under, and the tenants that were triggered keep running.

---

### 503

```ts
503: ClusterTakeRuntimeBackupResponse;
```

At least one targeted physical tenant could not be reached. The body lists the tenants that were triggered and keep running.

---

### 504

```ts
504: ClusterTakeRuntimeBackupResponse;
```

The request from gateway to broker timed out on at least one targeted physical tenant, which may or may not have accepted it. Those tenants are reported as `UNKNOWN` with the id to check them under, and the tenants that were triggered keep running.
