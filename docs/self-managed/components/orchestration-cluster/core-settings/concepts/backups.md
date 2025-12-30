---
id: backups
title: "Backups"
description: "When running an orchestration cluster with secondary storage, you must configure a snapshot repository in your chosen database."
---

When running an orchestration cluster with [secondary storage](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secondary-storage), you must configure a snapshot repository in your chosen database:

- [Elasticsearch snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html)
- [OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)

The Orchestration Cluster is configured with the snapshot repository name to trigger database snapshots. This ensures coherent backups.

:::info
Learn more about the backup procedure and why it must be triggered in the [backup guide](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
:::

## Configuration parameters

| Configuration key                     | Description                      | Default value |
| ------------------------------------- | -------------------------------- | ------------- |
| `camunda.data.backup.repository-name` | ES / OS snapshot repository name | -             |
