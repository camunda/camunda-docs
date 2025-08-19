---
id: schema-and-migration
title: Schema and data migration
description: "The orchestration cluster stores data in Elasticsearch and provides tools to manage schema and migrations."
---

The orchestration cluster persists runtime and task data in Elasticsearch. On first startup, all required indices and templates are automatically created.

## Schema

Cluster data is stored in Elasticsearch indices, each governed by a schema version. Index names follow this pattern:

```
{cluster-index-prefix}-{datatype}-{schemaversion}_[{date}]
```

- `cluster-index-prefix` – Prefix for index names (default: `operate`).
- `datatype` – Identifies the type of data stored (e.g., `user`, `variable`, `task`).
- `schemaversion` – Version of the index schema.
- `date` – Optional date for archived data.

> The version in the index name is specific to the schema and may differ from the cluster software version. See [data retention](/self-managed/components/orchestration-cluster/core-settings/concepts/data-retention.md).

## Data migration

When updating the cluster to a new version, Elasticsearch indices may require migration to match the new schema. Each cluster version provides migration steps to reindex or transform existing data.

### Migration concept

Migrations use Elasticsearch [ingest pipelines](https://www.elastic.co/guide/en/elasticsearch/reference/7.16/ingest.html) to transform and reindex data. Ensure your Elasticsearch cluster has at least one node with the **ingest role**.

All migration steps (applied or pending) are tracked in a dedicated index:

```
operate-migration-steps-repository
```

### Performing migration

#### Standalone migration script

1. Ensure Elasticsearch contains the data for the cluster version you are running.
2. Execute the migration script located in the cluster installation folder:

```bash
<cluster_home>/bin/migrate       # Linux/macOS
<cluster_home>\bin\migrate.bat   # Windows
```

#### Migration steps performed

- New indices are created if missing.
- Older indices are detected and a migration plan is generated.
- Each older index is migrated according to the plan.
- Original indices are deleted only after successful migration.

Migration may temporarily require additional disk space. Always back up your data before performing a migration.

#### Automatic migration on startup

When running a newer cluster version against an older schema, automatic migration occurs for any index with exactly **one** older version. Migration fails if multiple older versions exist for a given index.

### Migration best practices

- Only one node should execute migrations in a multi-node cluster; stop other nodes until migration is complete.
- Failed migrations can be retried; only unapplied steps will be executed.
- Migration settings affecting performance:

| Setting                                      | Description                                            | Default |
| -------------------------------------------- | ------------------------------------------------------ | ------- |
| `camunda.operate.migration.migrationEnabled` | Enable/disable automatic migration                     | `true`  |
| `camunda.operate.migration.reindexBatchSize` | Number of documents per reindex batch (1–10,000)       | 5,000   |
| `camunda.operate.migration.slices`           | Number of slices per reindex operation (0 = automatic) | 0       |

### Kubernetes example

To ensure migration completes before starting cluster nodes, use a Kubernetes [`initContainer`](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/):

```yaml
spec:
  initContainers:
    - name: migration
      image: camunda/operate:1.0.0
      command: ['/bin/sh','/usr/local/cluster/bin/migrate']
  containers:
    - name: cluster
      image: camunda/operate:1.0.0
      env:
      ...
```

The main container only starts if the migration `initContainer` finishes successfully, ensuring data is up-to-date.
