---
id: elasticsearch-privileges
title: "Elasticsearch privileges"
---

If you implement Camunda 8 with Elasticsearch as a service provider, the following [privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html) may be required:

## Cluster privileges

- `monitor` - Required to check the Elasticsearch cluster health. This privilege provides read-only cluster operations permissions.
- `manage_index_templates` - Creates the necessary index templates when Operate is started for the first time, or when updating to a newer version of Camunda 8. Once the index templates are created, you can stop Operate, remove this privilege, and then start Operate again.
- `manage_ilm` - _Required when index lifecycle management (ILM) is enabled._ Required to create the necessary ILM policies when Operate is started for the first time, or when updating to a newer version of Camunda 8. Once the ILM policies are created, you can stop Operate, remove this privilege, and then start Operate again.

### Backup privileges

To use the [backup feature](/self-managed/operational-guides/backup-restore/backup-and-restore.md), you must have snapshot privileges. You can provide these privileges to Operate before you create a backup, and then revoke them after the backup has been completed:

- `create_snapshot` - Creates a backup, or snapshot, of a running cluster.
- `monitor_snapshot` - Provides read-only permissions to list and view snapshot details.

### Update privileges

When [updating](/self-managed/operational-guides/update-guide/introduction.md) to a newer version of Camunda 8 which requires data migration, Operate requires the following:

- `manage_pipeline` - Allows any data transformations to occur when updating.
- `manage_index_templates` - See [cluster privileges](#cluster-privileges).
- `manage_ilm` - _Required when index lifecycle management (ILM) is enabled._ See [cluster privileges](#cluster-privileges).

These privileges can be granted temporarily during an upgrade:

- Stop Operate, and grant the required privileges
- Start Operate and perform the upgrade
- Stop Operate when the upgrade is complete, and remove any privileges
- Start Operate normally

## Indices privileges

The following permissions are required to read, write, view, and update Elasticsearch indices. More information on indices privileges can be found in the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices).

- `create_index`
- `delete_index`
- `read`
- `write`
- `manage`
- `manage_ilm` - _Required when index lifecycle management (ILM) is enabled._
