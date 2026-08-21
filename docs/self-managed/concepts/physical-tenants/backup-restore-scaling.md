---
id: backup-restore-scaling
title: "Backup, restore, and scaling"
sidebar_label: "Backup, restore, and scaling"
description: "Back up, restore, scale, and inspect Physical Tenants in a Camunda 8 Self-Managed cluster."
---

Learn how to back up, restore, scale, and inspect Physical Tenants after deployment.

## Choose the operation scope

Use a tenant-scoped endpoint when you need to affect one Physical Tenant. Use a cluster-wide endpoint when you need to affect every Physical Tenant or inspect the complete cluster.

| Operation                         | Tenant-scoped surface                                     | Cluster-wide surface   |
| --------------------------------- | --------------------------------------------------------- | ---------------------- |
| Runtime backup                    | `/physical-tenants/{physicalTenantId}/v2/backups/runtime` | Per tenant only        |
| History backup                    | `/physical-tenants/{physicalTenantId}/v2/backups/history` | Per tenant only        |
| Exporting control                 | `/physical-tenants/{physicalTenantId}/v2/exporting`       | Per tenant only        |
| Restore                           | `/physical-tenants/{physicalTenantId}/v2/restore`         | `/cluster/v2/restore`  |
| Topology                          | `/physical-tenants/{physicalTenantId}/v2/topology`        | `/cluster/v2/topology` |
| Cluster mode                      | `/physical-tenants/{physicalTenantId}/v2/mode`            | `/cluster/v2/mode`     |
| Scaling and configuration changes | `/actuator/cluster?physicalTenant={physicalTenantId}`     | `/actuator/cluster`    |

Tenant-scoped routes address the selected tenant's partition group and storage. In 8.10, backup and exporting control are per tenant only: there is no cluster-wide backup endpoint. Cluster-wide restore, topology, and mode operations use the `/cluster/v2/...` prefix and require cluster-admin access.

## Authorize operational access

Tenant-scoped backup and restore requests use the addressed tenant's authorization context. Grant the operator the tenant-local permissions required by the operation.

Cluster-wide restore and topology requests use the cluster-admin security chain. Configure cluster-admin access through the default cluster-level identity provider. A tenant-specific identity provider does not grant access to `/cluster/v2/...` endpoints.

For backup and exporting permissions, use these resource permissions where your authorization setup exposes them:

| Resource   | Permissions                           | Used for                                                    |
| ---------- | ------------------------------------- | ----------------------------------------------------------- |
| `BACKUP`   | `CREATE`, `READ`, `DELETE`, `RESTORE` | Creating, viewing, deleting, and restoring backups          |
| `EXPORTER` | `PAUSE`                               | Pausing, soft-pausing, and resuming exporting during backup |

Cluster-admin access is coarse-grained. It is not restricted to a single backup ID or Physical Tenant.

To configure cluster-admin credentials, see [cluster admin](/components/admin/cluster-admin.md). To obtain a token, see [Orchestration Cluster API authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

## Back up a Physical Tenant

Use this procedure for a tenant-scoped backup:

1. Confirm the target `physicalTenantId` and the operator permissions.
2. Confirm the tenant's backup store and storage backend are available.
3. For a history backup, query exporting state and pause exporting before creating the backup.
4. Trigger the runtime or history backup through the tenant-scoped endpoint.
5. Poll the backup status until it reaches a terminal state.
6. Resume exporting after a history backup completes.

The backup store can be shared by multiple Physical Tenants, but each tenant must use a separate backup key space. Runtime backup locations are configured per tenant. History snapshot names include the tenant identifier. See [storage isolation](./storage-isolation.md) for location and collision rules.

### Back up runtime data

Runtime backups cover Zeebe primary storage for the addressed Physical Tenant. These endpoints are relative to the base path `/physical-tenants/{physicalTenantId}/v2/backups/runtime`:

| Method   | Path                | Purpose                 |
| -------- | ------------------- | ----------------------- |
| `POST`   | `/`                 | Create a runtime backup |
| `GET`    | `/?prefix={prefix}` | List runtime backups    |
| `GET`    | `/{backupId}`       | Check backup status     |
| `DELETE` | `/{backupId}`       | Delete a runtime backup |

A backup ID is unique within a Physical Tenant. Reusing an existing ID for the same tenant returns a conflict. The same ID can be used by another Physical Tenant because each tenant has its own backup namespace.

When a tenant has scheduled backups enabled, backup IDs are generated and an explicit ID is rejected. Because backup configuration is per tenant, tenants in the same cluster can be in different modes. A cluster-wide request with an explicit ID fails if any tenant uses scheduled backups, and a request without an explicit ID fails if any tenant does not. Mixed configurations must use the tenant-scoped endpoints.

<!-- TODO(physical-tenants-day-2): Add concrete per-tenant backup-store configuration properties and artifact examples for runtime and history backups. Owner/reviewer: Houssain Barouni. -->

### Back up history data

History backups snapshot secondary storage for a Physical Tenant. History backup endpoints are available for Elasticsearch and OpenSearch configurations. They are not available when the cluster uses RDBMS secondary storage.

These endpoints are relative to the base path `/physical-tenants/{physicalTenantId}/v2/backups/history`:

| Method   | Path                                  | Purpose                 |
| -------- | ------------------------------------- | ----------------------- |
| `POST`   | `/`                                   | Create a history backup |
| `GET`    | `/?prefix={prefix}&verbose={verbose}` | List history backups    |
| `GET`    | `/{backupId}`                         | Check backup status     |
| `DELETE` | `/{backupId}`                         | Delete a history backup |

History backup names include the Physical Tenant so that tenants using a shared repository retain separate snapshot namespaces. Configure non-overlapping backup locations and prefixes before starting the cluster.

To protect every tenant, repeat this procedure for each Physical Tenant. Each backup is independent, so the tenants do not share a single coordinated snapshot.

### Pause exporting for a consistent history backup

History backup is part of the exporting control workflow. Query the exporting state, pause exporting, create the backup, and resume exporting when the operation completes.

These endpoints are relative to the base path `/physical-tenants/{physicalTenantId}/v2/exporting`:

| Method | Path                 | Purpose                       |
| ------ | -------------------- | ----------------------------- |
| `GET`  | `/`                  | Check exporting state         |
| `POST` | `/pause?soft={soft}` | Pause or soft-pause exporting |
| `POST` | `/resume`            | Resume exporting              |

Use soft pause when you need Zeebe to continue accepting records while preventing log compaction during the backup process.

### Back up customer-managed storage

RDBMS and document-store backups are not triggered by Orchestration Cluster endpoints. Back up these stores with the tools provided by the storage system, using the tenant-specific schema, database, bucket, container, or path documented in [storage isolation](./storage-isolation.md).

## Back up every Physical Tenant

All backups are per tenant. Backing up a cluster means taking one independent backup for each Physical Tenant, using the tenant-scoped endpoints. There is no cluster-wide backup endpoint in 8.10.

1. Confirm that every tenant has a valid backup store and compatible storage configuration.
2. Repeat the tenant-scoped backup procedure for each Physical Tenant.
3. Poll each tenant's backup status until it reaches a terminal state.
4. Retain the per-tenant backup identifiers together with the cluster recovery record.

Because the backups are independent, they are not a single consistent cluster-wide snapshot. Each tenant reaches its terminal state on its own, and a failure in one tenant leaves the others unaffected.

## Restore a Physical Tenant

A tenant-scoped restore replaces the selected tenant's current runtime or history state with data from the selected backup. It does not target another tenant's partition group.

Use the tenant-scoped restore endpoint:

```http
POST /physical-tenants/{physicalTenantId}/v2/restore
```

Use the cluster-wide restore endpoint when you need to restore all tenants or coordinate different backup selections in one operation:

```http
POST /cluster/v2/restore
```

A cluster-wide restore can target every configured Physical Tenant, or a named tenant. When no `physicalTenantId` is supplied, the operation targets all tenants. A named tenant targets only that tenant.

Supply per-tenant restore arguments through the request's `overrides` field. Naming a single tenant and supplying overrides in the same request is rejected, because the two express conflicting targets.

Both restore endpoints accept `?dryRun=true`, which validates the request and reports the resulting plan without changing any data. Use a dry run before every production restore.

### Enter recovery mode first

Restore is only accepted while the cluster is in recovery mode. A restore request sent to a cluster in processing mode is rejected with `409`.

1. Switch the cluster to recovery mode with `PATCH /cluster/v2/mode?mode=RECOVERING`. This deactivates all partitions and leaves only a restricted set of read-only operations available.
2. Submit the restore request and monitor it with `GET /cluster/v2/restore`, which reports progress per broker and per partition. It returns `404` once no restore is in flight.
3. Return the cluster to `PROCESSING` with `PATCH /cluster/v2/mode?mode=PROCESSING` after the restore completes.

Mode changes are non-blocking. The request is acknowledged once the change is accepted, before the transition finishes, so verify the transition through topology before continuing. Only one restore runs at a time.

Cross-tenant restore is prevented by configuration rather than by a runtime check: each Physical Tenant must be configured with a different backup store path, so a backup belonging to one tenant is not reachable from another tenant's restore.

Before restoring:

- Confirm the backup belongs to the addressed Physical Tenant and is available in that tenant's backup namespace.
- Confirm the selected backup matches the storage backend and data you intend to recover.
- Confirm that no conflicting configuration change is running.
- Inform users that the restored tenant may be unavailable while the restore runs.

After restoring:

- Query tenant-scoped topology and confirm that the tenant's partitions are healthy.
- Verify that expected process definitions, instances, variables, and history are available.
- Check exporting and secondary storage state before resuming normal traffic.

:::warning
Restore is a destructive operation for the selected tenant. Preserve a current backup and validate the target tenant before starting a restore.
:::

### Recover from tenant data loss

Use a tenant-scoped restore when one Physical Tenant has corrupted or missing runtime or history data and other tenants should remain available. Validate the restored tenant through topology, process data, history, and exporting checks before returning it to normal operation.

If the tenant's primary storage is unavailable, use the configured backup store and the restore procedure for the affected storage backend. A fallback restore does not change the scope of the operation: restore the affected tenant through its tenant-scoped endpoint unless you intentionally need a cluster-wide recovery.

### Recover the full cluster

Use cluster-wide restore when multiple tenants require recovery or when the cluster must be restored to a coordinated state. A cluster-wide request can restore every configured tenant or select a named tenant with tenant-specific restore arguments. Validate every tenant's terminal state and topology before resuming normal traffic.

<!-- TODO(physical-tenants-day-2): Add backend-specific restore fallback steps for primary-storage loss, including the supported RDBMS, Elasticsearch/OpenSearch, and document-store boundaries. Owner/reviewer: Houssain Barouni. -->

## Scale a Physical Tenant

Use the cluster actuator to change the partition count for one Physical Tenant:

```http
PATCH /actuator/cluster?physicalTenant={physicalTenantId}
```

Partition count can be increased for the selected tenant. The scaling plan adds and distributes partitions across the cluster's brokers. Partition count cannot be reduced through this operation.

An unscoped partition-count change targets the default Physical Tenant. Use the `physicalTenant` query parameter whenever you intend to scale a non-default tenant.

## Scale the cluster

Use the cluster actuator for broker-count and replication-factor changes. These changes apply across the configured Physical Tenants because brokers and their capacity are shared:

- Add or remove brokers through the broker scaling operation.
- Change the replication factor with the cluster-wide scaling operation.
- Do not combine a tenant-scoped partition-count change with a broker-count or replication-factor change.

See [cluster scaling](../../components/orchestration-cluster/zeebe/operations/cluster-scaling.md) for the broker scaling request, partition redistribution, dry-run behavior, and detailed progress response.

Gateway replicas are scaled separately from broker and partition configuration. In Helm deployments, adjust `zeebe-gateway.replicas` as described in [gateway configuration](../../components/orchestration-cluster/zeebe/configuration/gateway.md#zeebegatewaythreads). Gateway scaling changes shared request capacity but does not change tenant partition placement.

Scaling operations are planned changes. The cluster rejects a new configuration change while another change is still running.

## Monitor changes and verify readiness

Use the configuration changes endpoint to monitor scaling, restore, and other asynchronous cluster changes:

```http
GET /actuator/cluster/changes
```

For request and response schemas, status codes, and terminal states, see the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) reference.

Use topology to verify the result:

```http
GET /physical-tenants/{physicalTenantId}/v2/topology
GET /cluster/v2/topology
```

Verify that:

- The change reaches its completed state.
- Every expected partition has a leader.
- The targeted tenant's partition count matches the requested value.
- Other tenants retain their expected partition counts after a tenant-scoped scale operation.
- Broker membership and partition placement match the intended cluster capacity.
- The cluster and affected tenants return to a healthy, ready state.

A rolling restart is not required for a dynamic scaling operation. Configuration-based tenant provisioning and static tenant configuration changes continue to use the lifecycle described in [provisioning and lifecycle](./provisioning-and-lifecycle.md).

## Understand shared-capacity effects

Physical Tenants isolate data and partition groups, but brokers and gateways remain shared infrastructure. A tenant with high traffic can consume shared CPU, memory, gateway, or storage capacity and affect other tenants.

Before scaling:

- Compare tenant-scoped partition, latency, and storage metrics with cluster-wide metrics.
- Check broker capacity and replication factor.
- Check secondary storage and document-store capacity for the affected tenant.

After scaling:

- Compare the same metrics against the pre-scaling baseline.
- Confirm that process execution and exports continue normally.
- Review configuration changes and topology before closing the operational task.
