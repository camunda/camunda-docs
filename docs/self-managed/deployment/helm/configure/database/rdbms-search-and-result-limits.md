---
id: rdbms-search-and-result-limits
sidebar_label: Search APIs and result limits
title: RDBMS search APIs and result count behavior
description: "Understand how totalResults is computed in RDBMS-backed search APIs, result limits, and best practices for query performance."
---

When using RDBMS as secondary storage, search APIs behave similarly to Elasticsearch/OpenSearch, but with important differences in how result counts are computed and limited.

## Result count behavior

### Total results capping

In RDBMS-backed deployments, `totalResults` is capped at **10,000** to improve performance and match Elasticsearch/OpenSearch behavior.

With this cap in place, COUNT(\*) queries are no longer prohibitively expensive. However, query performance still depends on selectivity—poorly filtered queries on large datasets can still perform COUNT operations that scan millions of rows. See [Query performance guidance](#query-performance-guidance) for optimization strategies.

Example response:

```json
{
  "items": [
    /* 100 items */
  ],
  "totalResults": 10000,
  "hasMoreTotalItems": true
}
```

### hasMoreTotalItems field

When the actual result set exceeds the cap, the `hasMoreTotalItems` boolean field is set to `true`. This indicates there are more results available and that pagination is still possible—you can continue querying with `searchAfter` or `page` parameters. Use this field in UI components to display "more results available" without computing exact counts.

## Configuration

### Maximum result limit

The result count cap is configurable per deployment:

| Parameter                                                      | Type    | Default | Description                                                                                              |
| -------------------------------------------------------------- | ------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `orchestration.data.secondaryStorage.rdbms.query.maxTotalHits` | integer | `10000` | Maximum number of results to count. Set higher to count larger result sets (performance cost increases). |

Example:

```yaml
orchestration:
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        query:
          maxTotalHits: 10000
```

:::warning
Increasing `maxTotalHits` significantly improves count accuracy but increases database load, especially for queries with large result sets. Test in your environment before setting values above 10,000.
:::

## Query performance guidance

RDBMS-backed search APIs execute two separate queries:

1. **SELECT** — Fetch the result page (fast, especially with pagination)
2. **COUNT(\*)** — Compute `totalResults` (cost depends on result selectivity)

To optimize query performance:

### 1. Use selective filters

Always filter by indexed columns to reduce the result set size. Indexed columns typically include:

- **Key fields**: Process definition key, instance ID, case instance ID
- **Date properties**: Creation date, completion date, update timestamp

**Good example** (efficient):

```
Filter: processDefinitionKey = "myProcess" AND createdDate >= 2024-01-01
Result size: < 100 items, fast COUNT(*)
```

**Poor example** (expensive):

```
Filter: category = "audit"
Result size: Potentially millions of items, expensive COUNT(*)
```

### 2. Avoid sorting large result sets

When the result set is much larger than the page size, sorting requires the database to read and order all matching rows, even if only 100 are returned.

**Good pattern**:

```
Filter by date range + key field → sort by creation date → paginate
```

**Avoid**:

```
No filter → sort by arbitrary field → paginate (requires reading entire table)
```

### 3. Prefer pagination over exact counts

Rather than requesting exact counts for large result sets:

- Use page size limits (e.g., 100 items per page)
- Check `hasMoreTotalItems` to determine if more results exist
- Continue paginating as needed

This avoids unnecessary COUNT(\*) operations on queries that may scan large portions of the table.

## Comparing RDBMS and Elasticsearch/OpenSearch behavior

| Aspect                | RDBMS                                            | ES/OS                                   |
| --------------------- | ------------------------------------------------ | --------------------------------------- |
| **Result count**      | Capped at `maxTotalHits` (default 10,000)        | Capped at 10,000                        |
| **hasMoreTotalItems** | Available; indicates more results beyond the cap | Not available in ES/OS                  |
| **Count accuracy**    | Exact count up to the cap; then approximate      | Exact count up to cap; then approximate |
| **Performance**       | Separate COUNT(\*) query required                | Count included in search response       |
| **Pagination**        | Supported via page or searchAfter                | Supported via from/size or search_after |

## Database-specific tuning (PostgreSQL)

If you are using PostgreSQL as your RDBMS and experience slow search queries, consider the following configuration for load-testing scenarios (adjust based on your workload and hardware):

```yaml
global:
  postgresql:
    auth:
      database: camunda
      username: camunda
      password: camunda
      postgresPassword: camunda

postgresqlSharedPreloadLibraries: pg_stat_statements

primary:
  resources:
    requests:
      memory: 4Gi
      cpu: 3000m
    limits:
      cpu: 3000m
      memory: 6Gi

  persistence:
    size: 128Gi
    storageClass: "ssd"

  extendedConfiguration: |-
    # WAL Performance Tuning
    wal_buffers = 64MB
    max_wal_size = 4GB
    min_wal_size = 1GB
    checkpoint_timeout = 20min
    checkpoint_completion_target = 0.9
    wal_writer_delay = 200ms
    wal_writer_flush_after = 1MB

    # Memory Settings
    shared_buffers = 2GB
    effective_cache_size = 4500MB
    work_mem = 32MB
    maintenance_work_mem = 512MB

    # Autovacuum - Aggressive for high UPDATE/DELETE volume
    autovacuum_max_workers = 6
    autovacuum_naptime = 15s
    autovacuum_vacuum_scale_factor = 0.03
    autovacuum_analyze_scale_factor = 0.02
    autovacuum_vacuum_cost_limit = 5000

    # Monitoring
    pg_stat_statements.track = all
    pg_stat_statements.max = 10000
    track_io_timing = on
    track_functions = all
```

:::note
This configuration is specific to load-testing with the parameters shown. For production, start conservative and adjust based on your data volume, workload, and hardware. Camunda is a write-heavy application, so prioritize cache and vacuum settings for your environment.
:::

Database-specific tuning for MariaDB and Oracle will be documented in future updates.

## Related guides

- [Configure RDBMS in Helm charts](/self-managed/deployment/helm/configure/database/rdbms.md)
- [JDBC driver management](/self-managed/deployment/helm/configure/database/rdbms-jdbc-drivers.md)
- [RDBMS troubleshooting and operations](/self-managed/deployment/helm/configure/database/rdbms-troubleshooting.md)
