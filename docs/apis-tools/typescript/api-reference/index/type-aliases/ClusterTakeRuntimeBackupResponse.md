---
title: "Type Alias: ClusterTakeRuntimeBackupResponse"
sidebar_label: "ClusterTakeRuntimeBackupResponse"
mdx:
  format: md
---

# Type Alias: ClusterTakeRuntimeBackupResponse

```ts
type ClusterTakeRuntimeBackupResponse = object;
```

The outcome of triggering a runtime backup on every targeted physical tenant. Returned both when every tenant was triggered and when only some were, so a partial trigger is never silent: the status code says whether the request succeeded, the body says what is running.

## Properties

### physicalTenants

```ts
physicalTenants: ClusterRuntimeBackupTakeResult[];
```

The outcome for each targeted physical tenant, ordered by physical tenant id. Carries no cluster-level backup id: in generated-id mode each tenant generates its own.
