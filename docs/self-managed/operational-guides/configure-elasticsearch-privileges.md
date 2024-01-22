---
id: configure-elasticsearch-privileges
title: "Configure Elasticsearch privileges"
---

If you implement Camunda 8 with ElasticSearch as a service provider, you must configure ElasticSearch with the following [privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html) in mind.

## Cluster privileges

To use the [backup feature](/self-managed/operational-guides/backup-restore/backup-and-restore.md), you need to have snapshot privileges:

- `create_snapshot`
- `monitor_snapshot`
- `manage_index_templates` to manage index templates
- `monitor`
- `manage_ilm` when ILM is enabled

When [updating](/self-managed/operational-guides/update-guide/introduction.md) to a newer version of Camunda 8 which requires data migration, Operate requires pipelines:

- `manage_pipeline`

More information on cluster privileges in Elasticsearch can be found [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-cluster).

## Indices privileges

- `create_index`
- `delete_index`
- `read`
- `write`
- `manage_ilm`
- `manage`

More information on indices privileges in Elasticsearch can be found [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices).
