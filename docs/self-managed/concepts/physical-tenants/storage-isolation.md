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

:::caution Table prefix must be uppercase
RDBMS table prefixes must use uppercase characters. A lowercase prefix causes Liquibase migration to fail at startup. For example, use `TENANTA_` not `tenanta_`. See [camunda/camunda#56093](https://github.com/camunda/camunda/issues/56093).
:::

:::note Oracle limitation in 8.10 alpha
In the 8.10 alpha release, Oracle supports isolation by table prefix only. Using separate schemas from the same Oracle instance for multiple Physical Tenants is not supported in alpha and will be fixed in a later release.
:::

<!-- @christinaausley — review with @houssain-barouni and @EuroLew before final release -->

<!--- **Pending benchmarks**: Specific resource consumption per tenant will be provided once performance benchmarks complete. @christinaausley --->

## Elasticsearch/OpenSearch storage

:::note
Elasticsearch/OpenSearch storage isolation is not yet available in the current alpha release. This section documents the planned configuration.
:::

Use separate clusters or a shared cluster with per-tenant index prefixes.

### Configuration models

**Separate cluster (maximum isolation)**:

```yaml
camunda:
  physical-tenants:
    default:
      data:
        secondary-storage:
          elasticsearch:
            url: https://es-default.example.com:9200
    tenanta:
      data:
        secondary-storage:
          elasticsearch:
            url: https://es-tenant-a.example.com:9200
```

**Shared cluster with index prefix (cost-effective)**:

```yaml
camunda:
  physical-tenants:
    default:
      data:
        secondary-storage:
          elasticsearch:
            url: https://es.example.com:9200
    tenanta:
      data:
        secondary-storage:
          elasticsearch:
            url: https://es.example.com:9200
            index-prefix: "tenant-a"
            # Indices: tenant-a-process-instances, tenant-a-incidents, etc.
```

### Naming and collision prevention

- **Prefix format**: `{tenantId}` (dash automatically appended by the application)
- **Collision prevention**: Use the full tenant ID; avoid overlapping prefixes (for example, `eu` and `eu-west`)
- **Validation**: Cluster fails at startup if two tenants have overlapping index names

<!-- TODO: Confirm whether collision detection catches overlapping prefixes (for example, `eu` vs `eu-west`) or only identical prefixes. Pending eng verification. @christinaausley -->

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
    tenanta:
      document:
        assigned: [default-s3, tenant-a-compliance]
        default-store-id: tenant-a-compliance
        aws:
          tenant-a-compliance:
            bucket-name: "camunda-documents-tenant-a-compliance"
          default-s3:
            bucket-prefix: "tenant-a"
```

### Availability and validation

- **At startup**: Warning if bucket is missing or credentials are invalid; cluster continues
- **At runtime**: An error is returned when a tenant tries to create/retrieve a document if the store is unavailable
- **Validation**: Startup warning logged if two tenants share the same storage location
- **Subpath structure**: `s3://bucket/{physicalTenantId}/documents/`

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
- Don't point two tenants to the same bucket without distinct subpaths

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
**Cannot mix secondary storage backends across tenants.** All Physical Tenants in a cluster must use the same secondary storage type — either all RDBMS or all Elasticsearch/OpenSearch. A cluster where tenant A uses RDBMS and tenant B uses Elasticsearch is not supported in 8.10. This constraint exists in the Query API stack, not the exporter layer.
:::

:::caution Custom exporter configuration merge (alpha3)
In 8.10 alpha3, per-tenant and root-level custom exporter configurations are not merged. If you have a custom exporter (for example, a Kafka exporter) and want each tenant to publish to a different topic, you must declare the full exporter configuration separately under each Physical Tenant's section — you cannot declare it once at root level and override only the topic per tenant. This will be addressed in a later alpha. See [camunda/camunda#55155](https://github.com/camunda/camunda/issues/55155).
:::

<!-- @christinaausley — review with @deepthidevaki and @houssain-barouni; remove custom exporter note once #55155 is resolved -->

## Storage configuration matrix

| Aspect                   | RDBMS                    | Elasticsearch/OpenSearch         | Document Store                  |
| ------------------------ | ------------------------ | -------------------------------- | ------------------------------- |
| **Isolation**            | Separate schema/database | Separate cluster OR index prefix | Separate bucket OR subpath      |
| **Per-tenant config**    | JDBC URL                 | `url` + `index-prefix`           | Bucket + prefix                 |
| **Collision detection**  | Startup error            | Startup error                    | Startup warning (logs)          |
| **Unavailable behavior** | Startup failure          | Startup failure                  | Runtime error (no fallback)     |
| **Mixed vendors**        | Yes                      | Yes (ES or OpenSearch)           | Yes (different cloud providers) |
