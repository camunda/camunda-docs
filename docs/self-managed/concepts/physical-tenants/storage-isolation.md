---
id: storage-isolation
title: Storage isolation
description: Configure separate storage backends per Physical Tenant for RDBMS, Elasticsearch/OpenSearch, and Document Store.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AoGrid from "../../../components/react-components/_ao-card";
import IconConfigImg from "../../../components/assets/icon-config.png";
import IconOperateImg from "../../../components/assets/icon-operate.png";

Learn how to configure isolated secondary storage for Physical Tenants across RDBMS, Elasticsearch/OpenSearch, and Document Store backends.

<AoGrid columns={2} ao={[
{
link: "../configuration-reference/",
title: "Configuration reference",
image: IconConfigImg,
description: "Define storage overrides and validate tenant locations at startup.",
},
{
link: "../provisioning-and-lifecycle/",
title: "Provisioning and lifecycle",
image: IconOperateImg,
description: "Apply storage changes and manage tenant availability through configuration.",
},
]} />

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

:::caution Table prefix must be uppercase
RDBMS table prefixes must use uppercase characters. A lowercase prefix causes Liquibase migration to fail at startup. For example, use `TENANTA_` not `tenanta_`. See [camunda/camunda#56093](https://github.com/camunda/camunda/issues/56093).
:::

:::note Oracle limitation in 8.10 alpha
In the 8.10 alpha release, Oracle supports isolation by table prefix only. Using separate schemas from the same Oracle instance for multiple Physical Tenants is not supported in alpha and will be fixed in a later release.
:::

## Elasticsearch/OpenSearch storage

:::note
Elasticsearch/OpenSearch storage isolation is not yet available in the current alpha release. This section documents the planned configuration.
:::

Use separate clusters or a shared cluster with per-tenant index prefixes.

### Naming and collision prevention

- **Prefix format**: `{tenantId}` (dash automatically appended by the application)
- **Collision prevention**: Use the full tenant ID and avoid prefixes that are identical to another tenant's prefix. Overlapping prefixes (for example, `eu` and `eu-west`) are not caught by startup validation. Only exact duplicates fail at startup.
- **Validation**: Cluster fails at startup if two tenants have identical index prefixes

## Document Store storage

Store documents globally with per-tenant subpaths, or use dedicated stores per tenant. Camunda validates the resulting layout at startup and refuses to start if two tenants would read and write into the same storage.

| Layout                          | Use when                                                                   | Tenant configuration                                                                   |
| ------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Shared store with sibling paths | You want lower operational overhead while preserving structural isolation. | Assign the same store and configure a distinct sibling path or prefix for each tenant. |
| Dedicated store per tenant      | You need the strongest operational separation.                             | Assign each tenant a separate bucket, container, or directory.                         |

### Configuration models

<Tabs groupId="storage" defaultValue="aws" queryString values={
[
{label: 'AWS', value: 'aws' },
{label: 'GCP', value: 'gcp' },
{label: 'Azure', value: 'azure' },
{label: 'In-memory', value: 'in-memory' },
{label: 'Local', value: 'local' },
]}>

<TabItem value='aws'>

**What Camunda compares.** Three properties. `bucket-name` and `endpoint` form the namespace, and `bucket-path` becomes the key prefix. Bucket names are compared case-insensitively, endpoints by scheme, host, port, and path only, and bucket paths case-sensitively after being coerced to end in `/`.

Every other AWS property is ignored: `region`, because S3 bucket names are globally unique across regions, and `bucket-ttl`, `force-path-style`, `chunked-encoding-enabled`, and `support-legacy-md5`, because none of them change which objects a store reads and writes.

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

**Dedicated store per tenant.** Distinct buckets are distinct namespaces, so `bucket-path` is optional here:

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

**Startup outcomes.**

| Tenant A                    | Tenant B                                          | Outcome                                                                  |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------ |
| `bucket-path: tenant-a`     | `bucket-path: tenant-b`                           | Accepted. Sibling prefixes.                                              |
| `bucket-path` unset         | `bucket-path: tenant-b`                           | Rejected. The bucket root is a prefix of every key in the bucket.        |
| `bucket-path: tenant-a`     | `bucket-path: tenant-a/nested`                    | Rejected. One prefix is nested inside the other.                         |
| `bucket-path: tenant`       | `bucket-path: tenant-b-`                          | Accepted. Both are coerced to end in `/`, so neither encloses the other. |
| `bucket-path: Tenant-A/`    | `bucket-path: tenant-a/`                          | Accepted. S3 keys are case-sensitive.                                    |
| `region: us-east-1`         | `region: eu-west-1`, rest identical               | Rejected. Region isn't part of the location.                             |
| `endpoint: https://minio-a` | `endpoint: https://minio-b`, same bucket and path | Accepted. Different endpoints are different namespaces.                  |
| `endpoint: https://MINIO/`  | `endpoint: https://minio`, same bucket and path   | Rejected. Host case and trailing slashes are ignored.                    |

</TabItem>

<TabItem value='gcp'>

**What Camunda compares.** `bucket-name` forms the namespace, and `prefix` becomes the key prefix. Bucket names are compared case-insensitively, prefixes case-sensitively.

Unlike AWS and Azure, the GCP prefix is used exactly as written. No trailing separator is appended, so a prefix is not necessarily a folder. An unset `prefix` resolves to `temp/`.

**Global store with per-tenant subpaths** (recommended):

```yaml
camunda:
  document:
    default-store-id: shared-gcs
    gcp:
      shared-gcs:
        bucket-name: "camunda-documents"
  physical-tenants:
    default:
      document:
        assigned: [shared-gcs]
        gcp:
          shared-gcs:
            prefix: "default/"
    tenanta:
      document:
        assigned: [shared-gcs]
        gcp:
          shared-gcs:
            # Sibling prefixes. Because no separator is appended, end each prefix in '/'
            # yourself so one tenant's prefix can't run into another's.
            prefix: "tenant-a/"
```

**Dedicated store per tenant.** Distinct buckets are distinct namespaces, so `prefix` is optional here:

```yaml
camunda:
  physical-tenants:
    default:
      document:
        assigned: [default-gcs]
        default-store-id: default-gcs
        gcp:
          default-gcs:
            bucket-name: "camunda-documents-default"
    tenanta:
      document:
        assigned: [tenant-a-gcs]
        default-store-id: tenant-a-gcs
        gcp:
          tenant-a-gcs:
            bucket-name: "camunda-documents-tenant-a"
```

**Startup outcomes.**

| Tenant A           | Tenant B                      | Outcome                                                                     |
| ------------------ | ----------------------------- | --------------------------------------------------------------------------- |
| `prefix: a/`       | `prefix: b/`                  | Accepted. Sibling prefixes.                                                 |
| `prefix: docs/`    | `prefix: docs/archive/`       | Rejected. One prefix is nested inside the other.                            |
| `prefix: tenant`   | `prefix: tenant-b-`           | Rejected. No separator is appended, so `tenant` is a prefix of `tenant-b-`. |
| `prefix` unset     | `prefix: temp/`               | Rejected. An unset prefix resolves to `temp/`.                              |
| `prefix` unset     | `prefix: temp`                | Rejected. Both address keys under `temp`.                                   |
| `prefix: ""`       | `prefix: tenant-b-`           | Rejected. The bucket root is a prefix of every object name in it.           |
| `prefix: TenantA/` | `prefix: tenanta/`            | Accepted. GCS object names are case-sensitive.                              |
| `bucket-name: a`   | `bucket-name: b`, same prefix | Accepted. Different buckets are different namespaces.                       |

</TabItem>

<TabItem value='azure'>

**What Camunda compares.** `container-name` and the blob endpoint the store resolves to form the namespace, and `container-path` becomes the key prefix. Container names are compared case-insensitively, container paths case-sensitively after being coerced to end in `/`.

A `connection-string` is resolved to the endpoint the store actually uses and reduced to scheme, host, port, and path. A query, fragment, or user info is dropped, so a shared access signature (SAS) token is neither part of the location nor printed in the error message.

**Global store with per-tenant subpaths** (recommended):

```yaml
camunda:
  document:
    default-store-id: shared-blob
    azure:
      shared-blob:
        container-name: "camunda-documents"
  physical-tenants:
    default:
      document:
        assigned: [shared-blob]
        azure:
          shared-blob:
            container-path: "default"
    tenanta:
      document:
        assigned: [shared-blob]
        azure:
          shared-blob:
            # Sibling paths. Neither tenant may leave the path unset to use the
            # container root, which encloses every blob name in the container.
            container-path: "tenant-a"
```

**Dedicated store per tenant.** Distinct containers are distinct namespaces, so `container-path` is optional here:

```yaml
camunda:
  physical-tenants:
    default:
      document:
        assigned: [default-blob]
        default-store-id: default-blob
        azure:
          default-blob:
            container-name: "camunda-documents-default"
    tenanta:
      document:
        assigned: [tenant-a-blob]
        default-store-id: tenant-a-blob
        azure:
          tenant-a-blob:
            container-name: "camunda-documents-tenant-a"
```

**Startup outcomes.**

| Tenant A                        | Tenant B                                                 | Outcome                                                              |
| ------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| `container-name: docs-a`        | `container-name: docs-b`                                 | Accepted. Different containers are different namespaces.             |
| `container-path: a`             | `container-path: a/nested`                               | Rejected. One prefix is nested inside the other.                     |
| Container root                  | `container-path: tenant-c`, same container               | Rejected. The container root is a prefix of every other key.         |
| `connection-string` for `accta` | `connection-string` for `acctb`, same container and path | Accepted. The two connection strings resolve to different endpoints. |
| `connection-string` for `acct`  | `endpoint: https://acct.blob.core.windows.net`           | Rejected. One account reached two ways.                              |
| `UseDevelopmentStorage=true`    | `endpoint: http://127.0.0.1:10000/devstoreaccount1`      | Rejected. The emulator shorthand resolves to that endpoint.          |
| `endpoint: …?sig=A`             | `endpoint: …?sig=B`, same account                        | Rejected. A SAS token is a credential, not a location.               |
| `container-path: Tenant-A/`     | `container-path: tenant-a/`                              | Accepted. Blob names are case-sensitive.                             |

</TabItem>

<TabItem value='in-memory'>

**What Camunda compares.** Nothing. In-memory stores are ephemeral and process-local, so they can't collide in backing storage and are excluded from the check.

Declare one store per tenant if you want documents kept apart within the process, or share one store ID across tenants if you don't. Either way there's no cross-tenant validation to satisfy.

```yaml
camunda:
  physical-tenants:
    default:
      document:
        assigned: [scratch]
        default-store-id: scratch
        in-memory:
          scratch: {}
    tenanta:
      document:
        assigned: [scratch]
        default-store-id: scratch
        in-memory:
          scratch: {}
```

:::warning
In-memory stores provide no isolation guarantee and lose every document when the process stops. Use them for local development only, never to separate tenants in production.
:::

</TabItem>

<TabItem value='local'>

**What Camunda compares.** The configured `path` forms the namespace, with separators resolved per platform. The key prefix is always empty because the directory alone decides. Paths are compared case-insensitively on every platform because a case-insensitive filesystem makes `/var/Docs` and `/var/docs` one directory.

Local stores have no subpath field, so each tenant needs its own directory:

```yaml
camunda:
  physical-tenants:
    default:
      document:
        assigned: [shared-local]
        default-store-id: shared-local
        local:
          shared-local:
            path: "/var/camunda/documents/default"
    tenanta:
      document:
        assigned: [shared-local]
        default-store-id: shared-local
        local:
          shared-local:
            # Use a sibling directory rather than one nested under another tenant's path.
            path: "/var/camunda/documents/tenant-a"
```

**Startup outcomes.**

| Tenant A          | Tenant B                   | Outcome                                                                                               |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `path: /var/docs` | `path: /var/other`         | Accepted. Different directories.                                                                      |
| `path: /var/docs` | `path: /var/docs/`         | Rejected. Trailing separators aren't part of the location.                                            |
| `path: /var/Docs` | `path: /var/docs`          | Rejected. Paths are compared case-insensitively on every platform.                                    |
| `path: \var\docs` | `path: /var/docs`          | Rejected on Windows, accepted on Linux. Separators are resolved per platform.                         |
| `path: /var/docs` | `path: /var/docs/tenant-b` | Accepted, though not recommended. Nesting isn't compared for local stores. See the limitations below. |

</TabItem>

</Tabs>

### Combine providers and per-tenant overrides

A tenant's `assigned` stores don't have to share a provider, and a global store can be combined with a tenant-specific one. Every store still has to satisfy the comparison rules for its own provider.

**Hybrid:** A global default store plus a tenant-specific store.

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

**Mixed providers:** A shared GCP store for both tenants, plus an Azure store for one of them.

```yaml
camunda:
  document:
    gcp:
      default-gcs:
        bucket-name: "camunda-documents-default"
  physical-tenants:
    default:
      document:
        assigned: [default-gcs]
        default-store-id: default-gcs
        gcp:
          default-gcs:
            prefix: "default/"
    tenanta:
      document:
        assigned: [default-gcs, tenant-a-blob]
        default-store-id: tenant-a-blob
        gcp:
          default-gcs:
            prefix: "tenant-a/"
        azure:
          tenant-a-blob:
            container-name: "camunda-documents-tenant-a"
```

Overlap is only ever reported between two different tenants. One tenant may spread its documents across several stores whose prefixes overlap, because reaching its own documents isn't a leak.

### Availability and validation

- **At startup**: Warning if bucket is missing or credentials are invalid; cluster continues
- **At runtime**: An error is returned when a tenant tries to create/retrieve a document if the store is unavailable
- **Validation**: The cluster fails to start if two Physical Tenants resolve to overlapping document store locations. See [Compare document store locations across tenants](#compare-document-store-locations-across-tenants)
- **Subpath structure**: Each tenant writes to the prefix you configure, such as `bucket-path` for AWS. Camunda doesn't insert the tenant ID into the path for you

### Compare document store locations across tenants

Camunda resolves a location for every configured document store at startup, then compares the locations of all tenants. A location is the provider, a namespace, and a key prefix:

- The **namespace** is the container no key can escape. It can be a bucket, a blob container, or a directory.
- The **key prefix** is the string every key inside that namespace starts with.

Two tenants overlap when the provider and namespace match and one key prefix is a prefix of the other. Overlap is broader than equality because a document ID is caller-supplied and appended to the key prefix as given. With the prefixes `tenant` and `tenant-b-` in one bucket, a request against the first store for the document ID `-b-invoice` resolves to the second store's `tenant-b-invoice`.

A separator changes nothing: `docs/` reaches `docs/archive/` through the document ID `archive/invoice`, because no object storage service treats `/` in a key as a path boundary. Any prefix nested inside another tenant's prefix is therefore rejected, including a bucket or container root paired with a path inside it.

Give every tenant that shares a bucket or container its own sibling prefix. No layout lets one tenant own the root while another owns a path within it, and isolation is enforced by this check at startup rather than by inspecting document IDs at runtime.

When the check fails, the cluster doesn't start, and the error names each conflict:

```
Physical tenants must not share a document store location, or they would read and write
into the same backing storage. Use a distinct bucket, container, or path per tenant, and
never nest one tenant's path inside another's. A nested path is reachable through a
caller-supplied document id, which no object store bounds at '/'. Conflicts: tenant
default's document store location [provider=aws, namespace=[camunda-documents, ],
keyPrefix=''] encloses tenant tenanta's [provider=aws, namespace=[camunda-documents, ],
keyPrefix='tenant-a/']
```

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

Example: back up Tenant A only.

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

### Secondary storage failures during startup and runtime

Camunda initializes the secondary-storage schema for each Physical Tenant independently. A tenant becomes ready only after its schema initialization succeeds. If one tenant cannot initialize, Camunda marks only that tenant as degraded and keeps other tenants independent.

#### Startup behavior

For multi-tenant initialization, Camunda starts one schema-initialization task per tenant. Retryable failures, such as temporary connectivity problems, are retried according to the schema manager retry settings. With the default settings, schema initialization continues retrying until it succeeds.

On a node with multiple Physical Tenants, startup uses the following rules:

| Node and storage type                               | Startup behavior                                                                                                                                                                                |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Elasticsearch or OpenSearch with an HTTP gateway    | Startup waits until every tenant has produced an initial result. If at least one tenant is serviceable, the node starts serving traffic. A tenant that failed keeps retrying in the background. |
| Elasticsearch or OpenSearch without an HTTP gateway | The node does not wait for schema initialization. It starts while each tenant retries in the background.                                                                                        |
| RDBMS, with or without an HTTP gateway              | Every node waits until at least one tenant is serviceable or no tenant can make further progress. One tenant's failure does not abort the node when another tenant is serviceable.              |

On nodes that wait at startup, Camunda retries temporary failures before allowing traffic. If every tenant has a failure that retrying cannot fix, startup aborts and the node exits with a non-zero status.

An RDBMS node with exactly one Physical Tenant keeps the existing synchronous, fail-fast behavior. An unreachable database or an unrepairable schema failure aborts startup instead of being retried in the background.

If you configure a finite retry limit and all attempts stop before any tenant becomes ready, startup can complete but the affected tenant remains degraded. On nodes whose readiness probe includes secondary storage, the node remains not ready. The application logs identify the tenant and report that its retry limit was exhausted.

#### Readiness and health

Readiness and health answer different questions:

| Endpoint or signal                                | Meaning                                                                                                                                                                                                               |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/actuator/health/readiness`                      | Node-level readiness where the secondary-storage readiness check is enabled. It is `UP` when at least one Physical Tenant is ready and `DOWN` when no tenant is ready. It does not mean that every tenant is healthy. |
| `/actuator/health`                                | Full node health, including live secondary-storage checks. On multi-tenant nodes, inspect the per-tenant `rdbmsStatus` or `searchEngineStatus` contributors.                                                          |
| `camunda_physical_tenant_secondary_storage_ready` | Prometheus gauge with `physicalTenant` labels. A value of `1` means that the tenant's schema is initialized; `0` means that the tenant is degraded.                                                                   |

The readiness signal is based on schema initialization and does not continuously probe storage connectivity. As a result, a storage outage after startup does not automatically make a ready node fail its readiness probe. The full health endpoint, logs, and operation-specific errors provide the live storage status. The full `/actuator/health` result can be `DOWN` for one failed tenant even when `/actuator/health/readiness` remains `UP` because another tenant is serviceable.

When a tenant is degraded because its schema has not initialized, REST query API requests, that require secondary storage for that tenant, return `HTTP 503 Service Unavailable` and a `Retry-After: 5` header. Other tenants continue to be served. After the storage problem is fixed, a retryable failure recovers in the background without restarting the node.

#### Troubleshoot startup and readiness failures

- **The node stays at startup.** Check the application logs for the Physical Tenant named in the schema-initialization messages. Verify the tenant's storage endpoint, credentials, network access, and schema permissions. For Elasticsearch or OpenSearch, also verify that the cluster is at least yellow when the startup health check is enabled.
- **Readiness is `DOWN`.** Inspect the `camunda_physical_tenant_secondary_storage_ready` gauge for each tenant. If every tenant reports `0`, no tenant can currently serve secondary-storage-dependent requests.
- **One tenant returns `503` while another works.** This is expected partial degradation. Fix the affected tenant's storage problem and wait for its background initialization retry. No restart is required for a retryable failure.
- **An RDBMS tenant fails before schema initialization starts.** If the JDBC URL uses a wrapper or a non-standard format, Camunda might not be able to determine the database vendor without connecting to the database. Set `database-vendor-id` in the tenant's RDBMS configuration. See [RDBMS database configuration](../databases/relational-db/configuration.md).
- **The logs report a terminal schema failure.** Fix the reported schema or configuration problem, then restart the node. Terminal failures are not retried because retrying cannot repair them.

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

## Known limitations in 8.10

:::note
**Cannot mix secondary storage backends across tenants.** All Physical Tenants in a cluster must use the same secondary storage type. Use either RDBMS for every tenant or Elasticsearch/OpenSearch for every tenant. A cluster where tenant A uses RDBMS and tenant B uses Elasticsearch is not supported in 8.10. This constraint exists in the Query API stack, not the exporter layer.
:::

:::caution Custom exporter configuration merge (alpha3)
In 8.10 alpha3, per-tenant and root-level custom exporter configurations are not merged. If you have a custom exporter, such as a Kafka exporter, and want each tenant to publish to a different topic, declare the full exporter configuration separately under each Physical Tenant's section. You cannot declare it once at root level and override only the topic per tenant. This will be addressed in a later alpha. See [camunda/camunda#55155](https://github.com/camunda/camunda/issues/55155).
:::

<!-- Remove custom exporter caution once camunda/camunda#55155 is resolved. -->

## Storage configuration matrix

| Aspect                   | RDBMS                                                                               | Elasticsearch/OpenSearch                                                            | Document Store                     |
| ------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------- |
| **Isolation**            | Separate schema/database OR table prefix                                            | Separate cluster OR index prefix                                                    | Separate bucket OR sibling subpath |
| **Per-tenant config**    | JDBC URL                                                                            | `url` + `index-prefix`                                                              | Bucket + prefix                    |
| **Collision detection**  | Startup error                                                                       | Startup error                                                                       | Startup error                      |
| **Unavailable behavior** | Tenant degraded ([details](#secondary-storage-failures-during-startup-and-runtime)) | Tenant degraded ([details](#secondary-storage-failures-during-startup-and-runtime)) | Runtime error (no fallback)        |
| **Mixed vendors**        | Yes                                                                                 | Yes (ES or OpenSearch)                                                              | Yes (different cloud providers)    |
