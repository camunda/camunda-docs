---
id: storage-isolation
title: Storage isolation for Physical Tenants
description: Configure separate storage backends per Physical Tenant for RDBMS, Elasticsearch/OpenSearch, and Document Store.
---

Each Physical Tenant can use isolated secondary storage, ensuring complete structural separation of process data. This page covers configuration options per backend type.

:::note Related pages

- **[Configuration reference](/self-managed/concepts/physical-tenants/configuration-reference.md)** — General tenant configuration
- **[Provisioning and lifecycle](/self-managed/concepts/physical-tenants/provisioning-and-lifecycle.md)** — Tenant operations
  :::

## RDBMS storage

Each Physical Tenant can have its own schema or database instance.

### Configuration models

**Separate schema** (recommended for cost-efficiency):

```yaml
camunda:
  physical-tenants:
    default:
      data:
        secondary-storage:
          rdbms:
            url: jdbc:postgresql://db.example.com:5432/camunda?currentSchema=default_schema
    tenanta:
      data:
        secondary-storage:
          rdbms:
            url: jdbc:postgresql://db.example.com:5432/camunda?currentSchema=tenant_a_schema
            # The 'default_schema' and 'tenant_a_schema' schemas must exist before startup
```

**Separate database instance** (maximum isolation):

```yaml
tenanta:
  data:
    secondary-storage:
      rdbms:
        url: jdbc:postgresql://db-tenant-a.example.com:5432/camunda
```

**Mixed vendors**: Different Physical Tenants can use PostgreSQL, MySQL, Oracle, etc. in the same cluster.

### Validation and operations

- **Configuration**: Misconfiguration (duplicate schema/URL) causes a startup error with a clear message. For Oracle, schema isolation uses distinct authenticated users rather than URL differences; a known false positive startup conflict may be reported for identical Oracle URLs in the current alpha release.
- **Pre-startup**: Ensure each tenant's schema exists, is empty, and has valid credentials
- **Manual DDL**: If running Liquibase scripts separately, apply to every tenant's schema before each upgrade
- **Resource scaling**: Each tenant gets its own JDBC datasource per cluster node; add memory/CPU for many tenants

<!--- **Pending benchmarks**: Specific resource consumption per tenant will be provided once performance benchmarks complete. --->

## Document Store storage

Store documents globally with per-tenant subpaths, or use dedicated stores per tenant.

### Configuration models

**Global store with per-tenant subpaths** (recommended):

```yaml
camunda:
  document:
    default-store-id: shared-s3
    aws:
      shared-s3:
        bucket-name: "camunda-documents"
  physical-tenants:
    default:
      document:
        assigned: [shared-s3]
        aws:
          shared-s3:
            bucket-path: "default"
    tenanta:
      document:
        assigned: [shared-s3]
        aws:
          shared-s3:
            # Sibling paths. Neither tenant's path may be nested inside the other's,
            # and neither tenant may leave the path unset to use the bucket root.
            bucket-path: "tenant-a"
```

**Dedicated store per tenant**:

```yaml
camunda:
  physical-tenants:
    default:
      document:
        assigned: [default-s3]
        default-store-id: default-s3
        aws:
          default-s3:
            bucket-name: "camunda-documents-default"
    tenanta:
      document:
        assigned: [tenant-a-s3]
        default-store-id: tenant-a-s3
        aws:
          tenant-a-s3:
            bucket-name: "camunda-documents-tenant-a"
```

**Hybrid** (global default + per-tenant overrides):

```yaml
camunda:
  document:
    aws:
      default-s3:
        bucket-name: "camunda-documents-default"
  physical-tenants:
    default:
      document:
        assigned: [default-s3]
        default-store-id: default-s3
        aws:
          default-s3:
            # Required. Without a path, this tenant owns the bucket root, which
            # encloses every other tenant's path in the same bucket.
            bucket-path: "default"
    tenanta:
      document:
        assigned: [default-s3, tenant-a-compliance]
        default-store-id: tenant-a-compliance
        aws:
          tenant-a-compliance:
            bucket-name: "camunda-documents-tenant-a-compliance"
          default-s3:
            bucket-path: "tenant-a"
```

### Availability and validation

- **At startup**: Warning if bucket is missing or credentials are invalid; cluster continues
- **At runtime**: An error is returned when a tenant tries to create/retrieve a document if the store is unavailable
- **Validation**: The cluster fails to start if two Physical Tenants resolve to overlapping document store locations. See [Compare document store locations across tenants](#compare-document-store-locations-across-tenants)
- **Subpath structure**: Each tenant writes to the prefix you configure, such as `bucket-path` for AWS. Camunda doesn't insert the tenant ID into the path for you

### Compare document store locations across tenants

Camunda resolves a location for every configured document store at startup, then rejects the configuration if two Physical Tenants would read and write into the same storage. A location is the provider, a namespace, and a key prefix. Two tenants overlap when their namespaces match and one key prefix is a prefix of the other.

| Provider           | Namespace                                                    | Key prefix                                                     |
| ------------------ | ------------------------------------------------------------ | -------------------------------------------------------------- |
| AWS S3             | `bucket-name` and `endpoint`                                 | `bucket-path`, coerced to end in `/`, case preserved           |
| GCP Cloud Storage  | `bucket-name`                                                | `prefix` as written, defaulting to `temp/` when unset          |
| Azure Blob Storage | `container-name` and the resolved blob endpoint              | `container-path`, coerced to end in `/`, case preserved        |
| Local filesystem   | The configured `path`, with separators resolved per platform | Always empty, so the directory alone decides                   |
| In-memory          | Not compared                                                 | Not compared. In-memory stores are ephemeral and can't collide |

Overlap is broader than equality because a document ID is caller-supplied and appended to the key prefix as given. With the prefixes `tenant` and `tenant-b-` in one bucket, a request against the first store for the document ID `-b-invoice` resolves to the second store's `tenant-b-invoice`. A separator changes nothing: `docs/` reaches `docs/archive/` through the ID `archive/invoice`, because no object storage service treats `/` in a key as a path boundary. Any prefix nested inside another tenant's prefix is therefore rejected, including a bucket or container root paired with a path inside it.

Give every tenant that shares a bucket or container its own sibling prefix. No layout lets one tenant own the root while another owns a path within it, and isolation is enforced by this check at startup rather than by inspecting document IDs at runtime.

#### Provider-specific comparison rules

- **AWS S3**: Three properties are compared. `bucket-name` and `endpoint` form the namespace, and `bucket-path` becomes the key prefix. Bucket names are compared case-insensitively, endpoints by scheme, host, port, and path only, and bucket paths case-sensitively after being coerced to end in `/`. Every other AWS property is ignored: `region`, because S3 bucket names are globally unique across regions, so two tenants that differ only in `region` are rejected, and `bucket-ttl`, `force-path-style`, `chunked-encoding-enabled`, and `support-legacy-md5`, because none of them change which objects a store reads and writes.
- **GCP Cloud Storage**: An unset `prefix` resolves to `temp/`, so leaving `prefix` unset for one tenant and setting `temp/` or `temp` for another is rejected.
- **Azure Blob Storage**: A `connection-string` is resolved to the endpoint the store actually uses, reduced to scheme, host, port, and path. Two tenants using connection strings for different storage accounts are accepted. A connection string and an explicit `endpoint` that address the same account are rejected, as is `UseDevelopmentStorage=true` alongside the emulator endpoint it resolves to. A query, fragment, or user info is dropped, so a shared access signature (SAS) token is neither part of the location nor printed in the error message.
- **Local filesystem**: Path separators are resolved per platform, so on Windows `\var\docs` and `/var/docs` are one directory. Paths are compared case-insensitively on every platform, because a case-insensitive filesystem makes `/var/Docs` and `/var/docs` one directory.

Key prefixes are compared case-sensitively, because object storage key names are case-sensitive. The prefixes `Tenant-A/` and `tenant-a/` are two distinct locations. Bucket and container names are compared case-insensitively, because every provider restricts them to lowercase. Endpoint hosts are also compared case-insensitively, and trailing slashes are ignored.

#### Limitations of location comparison

| Limitation                                                    | Effect                                                                                                                                                                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aliases aren't resolved                                       | Two endpoint URLs or DNS names fronting the same backend are treated as separate locations, so a genuine overlap isn't detected.                                                                  |
| Local paths are compared case-insensitively on every platform | On a case-sensitive filesystem, two directories differing only in case are reported as a collision even though they're isolated.                                                                  |
| Nested local directories aren't compared                      | `path: /var/docs` and `path: /var/docs/tenant-b` are two namespaces with empty prefixes. The local store rejects `/`, `\`, and `..` in a document ID, so the parent can't descend into the child. |

## Operational considerations

### Backup and restore

- **Per-tenant**: Back up one tenant's RDBMS schema or document bucket individually. A per-tenant Elasticsearch/OpenSearch backup is not yet available (see the note below).
- **Full cluster**: Back up all schemas, all index prefixes, all buckets simultaneously
- **Restore options**: Individual tenant or full cluster from backup

Example — back up Tenant A only:

```bash
# RDBMS
pg_dump -h db.example.com -U user tenant_a_schema > backup.sql

# Document store (S3)
aws s3 sync s3://camunda-documents/tenant-a/ ./backup/
```

:::note
Elasticsearch and OpenSearch backups are created through the [web applications backup endpoint](/self-managed/operational-guides/backup-restore/elasticsearch/backup.md#2-start-the-web-applications-backup-operate--tasklist), which operates at the cluster level. A per-tenant Elasticsearch/OpenSearch backup endpoint is not yet available and is planned as part of the management API.
:::

### Cross-tenant isolation

Storage isolation prevents data leakage structurally:

- RDBMS: Each schema is logically separate
- ES/OS: Index prefixes are distinct boundaries
- Document Store: Separate buckets or subpaths

Risks to avoid:

- Don't share JDBC connection URLs between tenants (for Oracle, two tenants can share the same URL while remaining isolated by distinct authenticated database users)
- Don't overlap index prefixes
- Don't point two tenants to the same bucket or container without distinct sibling subpaths. Don't nest one tenant's subpath inside another's, and don't leave one tenant on the bucket or container root

### Scaling and capacity planning

- **RDBMS**: Monitor schema size per tenant; high-traffic tenants may need dedicated instances
- **ES/OS**: Monitor index size per prefix; set retention policies independently per tenant. If ES/OS is shared across multiple Physical Tenants, also monitor overall cluster health and capacity.
- **Document Store**: Monitor bucket size per tenant; set lifecycle policies for archival

### Migration scenarios

| Scenario         | Steps                                                                         |
| ---------------- | ----------------------------------------------------------------------------- |
| **Add tenant**   | Create storage backend → Validate connectivity → Add config → Rolling restart |
| **Consolidate**  | Backup source → Create new backend → Update config → Restore → Verify         |
| **Split tenant** | Plan data distribution → Backup → Create stores → Restore to each → Restart   |

## Storage configuration matrix

| Aspect                   | RDBMS                    | Elasticsearch/OpenSearch         | Document Store                     |
| ------------------------ | ------------------------ | -------------------------------- | ---------------------------------- |
| **Isolation**            | Separate schema/database | Separate cluster OR index prefix | Separate bucket OR sibling subpath |
| **Per-tenant config**    | JDBC URL                 | `url` + `index-prefix`           | Bucket + prefix                    |
| **Collision detection**  | Startup error            | Startup error                    | Startup error                      |
| **Unavailable behavior** | Startup failure          | Startup failure                  | Runtime error (no fallback)        |
| **Mixed vendors**        | Yes                      | Yes (ES or OpenSearch)           | Yes (different cloud providers)    |
