---
id: schema-and-migration
title: Schema and data migration
description: "The orchestration cluster stores data with secondary storage and provides tools to manage schema and migrations."
---

The orchestration cluster persists runtime and task data in secondary storage.

This page describes schema and migration behavior for document-store secondary storage (Elasticsearch/OpenSearch), where indices and templates are created automatically on first startup. For RDBMS secondary storage guidance, see [RDBMS configuration](/self-managed/concepts/databases/relational-db/configuration.md).

## Schema

For document-store backends, cluster data is stored in indices governed by a schema version. Index names follow this pattern:

```text
{cluster-index-prefix}-{legacy-prefix}-{datatype}-{schemaversion}_[{date}]
```

- `cluster-index-prefix` – Prefix for index names (default: ``).
- `legacy-prefix` – Legacy component prefix (e.g. `operate`, `tasklist`, `camunda`).
- `datatype` – Identifies the type of data stored (e.g., `user`, `variable`, `task`).
- `schemaversion` – Version of the index schema.
- `date` – Optional date for archived data.

> The version in the index name is specific to the schema and may differ from the cluster software version. See [data retention](/self-managed/components/orchestration-cluster/core-settings/concepts/data-retention.md).

For configuration details related to document-store secondary storage, see [Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md).

From 8.8 onwards, no schema migrations are required when upgrading the orchestration cluster.

> See also: [Version compatibility checks](./version-compatibility.md) for the rules governing supported upgrade paths and how schema version metadata is validated.
