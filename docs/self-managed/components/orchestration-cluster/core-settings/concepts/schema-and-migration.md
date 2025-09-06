---
id: schema-and-migration
title: Schema and data migration
description: "The orchestration cluster stores data in Elasticsearch and provides tools to manage schema and migrations."
---

The orchestration cluster persists runtime and task data in Elasticsearch. On first startup, all required indices and templates are automatically created.

## Schema

Cluster data is stored in Elasticsearch indices, each governed by a schema version. Index names follow this pattern:

```
{cluster-index-prefix}-{legacy-prefix}-{datatype}-{schemaversion}_[{date}]
```

- `cluster-index-prefix` – Prefix for index names (default: ``).
- `legacy-prefix` – Legacy component prefix (e.g. `operate`, `tasklist`, `camunda`.
- `datatype` – Identifies the type of data stored (e.g., `user`, `variable`, `task`).
- `schemaversion` – Version of the index schema.
- `date` – Optional date for archived data.

> The version in the index name is specific to the schema and may differ from the cluster software version. See [data retention](/self-managed/components/orchestration-cluster/core-settings/concepts/data-retention.md).

For more information about the specific indices used by the orchestration cluster, refer to the [Index Diagrams](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter-indices.md).




From 8.8 onwards, no schema migrations are required when upgrading the orchestration cluster. For older versions, follow the migration instructions below.
