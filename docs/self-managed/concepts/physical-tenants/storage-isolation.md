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
            # Each schema must exist before startup
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

- **Per-tenant**: Snapshot only one tenant's RDBMS schema, ES/OS indices (prefix match), or document bucket
- **Full cluster**: Back up all schemas, all index prefixes, all buckets simultaneously
- **Restore options**: Individual tenant or full cluster from backup

Example — back up Tenant A only:

```bash
# RDBMS
pg_dump -h db.example.com -U user tenant_a_schema > backup.sql

# Elasticsearch (with prefix)
curl -X PUT "localhost:9200/_snapshot/repo/tenant-a-snap?indices=tenant-a-*"

# S3
aws s3 sync s3://camunda-documents/tenant-a/ ./backup/
```

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

## Storage configuration matrix

| Aspect                   | RDBMS                    | Elasticsearch/OpenSearch         | Document Store                  |
| ------------------------ | ------------------------ | -------------------------------- | ------------------------------- |
| **Isolation**            | Separate schema/database | Separate cluster OR index prefix | Separate bucket OR subpath      |
| **Per-tenant config**    | JDBC URL                 | `url` + `index-prefix`           | Bucket + prefix                 |
| **Collision detection**  | Startup error            | Startup error                    | Startup warning (logs)          |
| **Unavailable behavior** | Startup failure          | Startup failure                  | Runtime error (no fallback)     |
| **Mixed vendors**        | Yes                      | Yes (ES or OpenSearch)           | Yes (different cloud providers) |
